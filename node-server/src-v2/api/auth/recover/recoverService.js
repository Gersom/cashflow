const { UserModel, RecoveryCodeModel } = require("@models");
const { 
  NotFoundError, ValidationError, ExpirationError
} = require("@utils/apiErrors");
const { generateCode } = require("@utils/generateCode");
const { responseSuccess } = require("@utils/apiSuccess");
const { sendEmailCode, expirationTime, createAndSaveCode } = require("./recoverUtils");

const RecoverService = {
  async requestCode(data) {
    const user = await UserModel.findOneData({ email: data.email });
    if (!user) {
      throw new NotFoundError(`The email ${data.email} does not correspond to any registered user`);
    }

    // Delete previous codes
    await RecoveryCodeModel.deleteMany({ userId: user.id });

    const code = await createAndSaveCode(user.id);
    
    const emailResponse = await sendEmailCode({ code, email: data.email });

    return responseSuccess('Code generated successfully', { 
      emailFrom: emailResponse.from,
      emailTo: emailResponse.to
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
    const user = await UserModel.findOneData({ email: data.email });
    if (!user) {
      throw new ValidationError(`The email ${data.email} does not correspond to any registered user`);
    }

    const recoveryCode = await RecoveryCodeModel.findOneData({ userId: user.id });

    if (recoveryCode) {
      await RecoveryCodeModel.updateData(recoveryCode.id, { expiresAt: expirationTime() })
      const emailResponse = await sendEmailCode({
        code: recoveryCode.code, email: data.email
      });
      return responseSuccess('Code resend successfully', { 
        emailFrom: emailResponse.from,
        emailTo: emailResponse.to
      });
    }

    else {
      const code = await createAndSaveCode(user.id);
      const emailResponse = await sendEmailCode({
        code, email: data.email
      });
      return responseSuccess('Code generated and send successfully', { 
        emailFrom: emailResponse.from,
        emailTo: emailResponse.to
      });
    }
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