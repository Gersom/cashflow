const { UserModel, RecoveryCodeModel } = require("@models");
const { 
  NotFoundError, ValidationError, EmailSendError, ExpirationError
} = require("@utils/apiErrors");
const { generateCode } = require("@utils/generateCode");
const { generateHTML } = require("@utils/generateHTML");
const { responseSuccess } = require("@utils/apiSuccess");
const { sendEmail } = require("@utils/emailSender");

const RecoverService = {
  async requestCode(data) {
    const user = await UserModel.findOneData({ email: data.email });
    if (!user) {
      throw new NotFoundError(`The email ${data.email} does not correspond to any registered user`);
    }

    // Create recovery code
    const code = await generateCode();

    // Delete previous codes
    await RecoveryCodeModel.deleteMany({ userId: user.id });

    const expirationTime = 30; // minutes to expiration
    const expiresAt = new Date(Date.now() + (expirationTime * 60 * 1000));
    const recoveryCodeData = { userId: user.id, code, expiresAt }

    // Save recovery code
    await RecoveryCodeModel.create(recoveryCodeData);
    
    const html = await generateHTML('emails/recoveryCode', { code });
    const options = {
      to: data.email,
      subject: 'CashFlow - Recuperación de contraseña',
      text: `Tu código de recuperación es: ${code}`,
      html
    };

    const emailResponse = await sendEmail(options);
    if (emailResponse.error) {
      throw new EmailSendError(`Error sending email: ${emailResponse.error?.message}`);
    }

    return responseSuccess('Code generated successfully', { 
      emailFrom: emailResponse?.info?.from,
      emailTo: emailResponse?.info?.to[0]
    });
  },
  
  async verifyCode(data) {
    const user = await UserModel.findOneData({ email: data.email });
    if (!user) {
      throw new ValidationError(`The email ${data.email} does not correspond to any registered user`);
    }

    const recoveryCode = await RecoveryCodeModel.findOneData({ code: data.code, userId: user.id }).populate('userId');

    if (!recoveryCode) {
      throw new ValidationError(`Code ${data.code} not found, please generate a new one`);
    }
    if (recoveryCode.expiresAt < new Date()) {
      throw new ExpirationError(`Code ${data.code} has expired, please generate a new one`);
    }

    return responseSuccess('Code verified successfully');
  },
  
  async resendCode(data) {
    if (!data.email) {
      throw new ValidationError("Email is required");
    }
    const user = await UserModel.findDataByEmail(data.email);
    if (!user) {
      throw new NotFoundError(`User with email ${data.email} not found`);
    }
    const code = await user.generateCode();
    return {
      data: {
        code
      },
      success: 'Code generated successfully'
    };
  },
  
  async resetPassword(data) {
    if (!data.code) {
      throw new ValidationError("Code is required");
    }
    if (!data.password) {
      throw new ValidationError("Password is required");
    }
    const user = await UserModel.findDataByCode(data.code);
    if (!user) {
      throw new NotFoundError(`Code ${data.code} not found`);
    }
    const updatedUser = await user.resetPassword(data.password);
    return {
      data: {
        updatedUser
      },
      success: 'Password reset successfully'
    };
  }
}

module.exports = RecoverService;