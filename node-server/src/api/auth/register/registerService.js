const { UserModel } = require("@models");
const { sendVerificationEmail } = require("./registerUtils");
const { ValidationError } = require("@utils/apiErrors");
const { client } = require("@config/env");
const bcrypt = require("bcrypt");
const { auth } = require("@config/env");


const RegisterService = {
  register: async (data) => {
    if (!data.email || !data.password || !data.name) {
      return new ValidationError('Missing required fields');
    }
    data.password = await bcrypt.hash(data.password, auth.saltRounds);
    await UserModel.create(data);

    const token = bcrypt.hashSync(data.email, auth.saltRounds);

    const link = `${client.url}/verify-email?token=${ token }`;
  
    await sendVerificationEmail({ email: data.email, link: link });

    return true;
  },

  verify: async (data) => {
  
  }
};

  

module.exports = RegisterService;