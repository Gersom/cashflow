const { UserModel, AccountModel, CategoryModel, CurrencyModel } = require("@models");
const { sendVerificationEmail } = require("./registerUtils");
const { ValidationError, NotFoundError } = require("@utils/apiErrors");
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
  
  // TODO: pasar a transaction para evitar problemas de concurrencia

  verify: async (data) => {
    const { email } = jwtoken.verify(data.token, jwt.emailSecret);
    const user = await UserModel.findOne({ email: email }).select(['id', 'verified']);
    
    if (!user) throw new ValidationError('Invalid email');
    if (user.verified) throw new ValidationError('Email already verified');
  
    const currency = await CurrencyModel.findOne({ countryCode: 'US' }).select('_id');
    
    if (!currency) throw new NotFoundError('Currency "US" not found');
    
    const account = await AccountModel.create({ 
      userId: user.id, 
      currencyId: currency._id,
      name: 'Principal'
    });
    
    const categories = defaultCategories.map(category => ({
      ...category, accountId: account._id
    }));
    await CategoryModel.createMany(categories);

    await UserModel.updateData(user.id, { verified: true });
    
    return true;
  }
};

module.exports = RegisterService;