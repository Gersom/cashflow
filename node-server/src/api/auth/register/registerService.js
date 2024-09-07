const { UserModel, AccountModel, CategoryModel } = require("@models");
const { sendVerificationEmail } = require("./registerUtils");
const { ValidationError } = require("@utils/apiErrors");
const { client } = require("@config/env");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const { auth, jwt } = require("@config/env");
const defaultCategories = require("@data/defaultCategories.json");

const RegisterService = {
  register: async (data) => {
    if (!data.email || !data.password || !data.name) {
      throw new ValidationError('Missing required fields');
    }
    
    data.password = await bcrypt.hash(data.password, auth.saltRounds);
    await UserModel.create(data);
    
    const token = jwtoken.sign({ email: data.email }, jwt.emailSecret, { expiresIn: jwt.emailExpiration });
    const link = `${client.url}/verify-email?token=${token}`;
    
    await sendVerificationEmail({ email: data.email, link: link });
    return true;
  },
  
  verify: async (data) => {
    const { email } = jwtoken.verify(data.token, jwt.emailSecret);
    const user = await UserModel.findOne({ email: email });
    
    if (!user) throw new ValidationError('Invalid email');
    if (user.verified) throw new ValidationError('Email already verified');
    
    user.verified = true;
    await user.save();
    
    const currency = await CurrencyModel.findOne({ countryCode: 'US' }).select('+_id');
    const account = await AccountModel.create({ 
      userId: user._id, 
      currencyId: currency._id,
      name: 'Principal' });
      
    await account.save();
    
    for (const category of defaultCategories) {
      await CategoryModel.create({
        name: category.name,
        icon: category.icon,
        color: category.color,
        accountId: account._id
      });
    }
    
    return true;
  }
};

module.exports = RegisterService;