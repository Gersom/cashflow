const { UserModel, AccountModel, CategoryModel, CurrencyModel } = require("@models");
const { sendVerificationEmail } = require("./registerUtils");
const { ValidationError, NotFoundError } = require("@utils/apiErrors");
const { client } = require("@config/env");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const { auth, jwt } = require("@config/env");
const mongoose = require("mongoose");
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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { email } = jwtoken.verify(data.token, jwt.emailSecret);

      const user = await UserModel.findOne({ email: email })
        .select(['_id', 'verified'])
        .session(session);

      if (!user) throw new ValidationError('Invalid email');
      if (user.verified) throw new ValidationError('Email already verified');

      const currency = await CurrencyModel.findOne({ countryCode: 'US' })
        .select('_id')
        .session(session);

      if (!currency) throw new NotFoundError('Currency "US" not found');

      const account = await AccountModel.create([{
        userId: user._id,
        selectedCurrencyId: currency._id,
        name: 'Principal'
      }], { session });

      const categories = defaultCategories.map(category => ({
        ...category,
        accountId: account[0]._id
      }));

      await CategoryModel.insertMany(categories, { session });

      await UserModel.updateOne(
        { _id: user._id },
        { verified: true },
        { session }
      );

      await session.commitTransaction();
      return true;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

module.exports = RegisterService;