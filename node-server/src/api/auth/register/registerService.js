const { UserModel } = require("@models");
const { sendVerificationEmail } = require("./registerUtils");
const { ValidationError } = require("@utils/apiErrors");
const { client } = require("@config/env");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const { auth, jwt } = require("@config/env");


const RegisterService = {
  register: async (data) => {
    if (!data.email || !data.password || !data.name) {
      return new ValidationError('Missing required fields');
    }
    data.password = await bcrypt.hash(data.password, auth.saltRounds);
    await UserModel.create(data);

    const token = jwtoken.sign({ email: data.email }, jwt.emailSecret, { expiresIn: jwt.emailExpiration });

    const link = `${client.url}/verify-email?token=${ token }`;
  
    await sendVerificationEmail({ email: data.email, link: link });

    return true;
  },

  verify: async (data) => {
    const {email} = jwtoken.verify(data.token, jwt.emailSecret);
    
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new ValidationError('Invalid email');
    if (user.verified) throw new ValidationError('Email already verified');
    user.verified = true;
    await user.save();
    return true;
  }
};

  

module.exports = RegisterService;