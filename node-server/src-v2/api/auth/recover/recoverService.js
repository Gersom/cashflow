const { UserModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/apiErrors");
const { generateCode } = require("@utils/generateCode");

const RecoverService = {
  async requestCode(data) {
    if (!data.email) {
      throw new ValidationError("Email is required");
    }
    const user = await UserModel.findOneData({ email: data.email });
    if (!user) {
      throw new NotFoundError(`User with email ${data.email} not found`);
    }
    const code = await generateCode();
    return {
      data: {
        code
      },
      success: 'Code generated successfully'
    };
  },
  
  async verifyCode(data) {
    if (!data.code) {
      throw new ValidationError("Code is required");
    }
    const user = await UserModel.findDataByCode(data.code);
    if (!user) {
      throw new NotFoundError(`Code ${data.code} not found`);
    }
    const updatedUser = await user.verifyCode();
    return {
      data: {
        updatedUser
      },
      success: 'Code verified successfully'
    };
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