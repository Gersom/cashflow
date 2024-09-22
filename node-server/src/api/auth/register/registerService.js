const { auth, jwt } = require('@config/env')
const { client } = require('@config/env')
const { sendVerificationEmail } = require('./registerUtils')
const { UserModel, AccountModel, CategoryModel } = require('@models')
const { ValidationError } = require('@utils/apiErrors')
const bcrypt = require('bcrypt')
const defaultCategories = require('@data/defaultCategories.json')
const jwtoken = require('jsonwebtoken')
const mongoose = require('mongoose')

const RegisterService = {
  register: async (data) => {
    data.password = await bcrypt.hash(data.password, auth.saltRounds)
    !data.whatsapp && delete data.whatsapp
    await UserModel.create(data)

    const token = jwtoken.sign({ email: data.email }, jwt.emailSecret, { expiresIn: jwt.emailExpiration })
    const link = `${client.url}/verify-email?token=${token}`

    await sendVerificationEmail({ email: data.email, link })
    return true
  },

  verify: async (data) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const { email } = jwtoken.verify(data.token, jwt.emailSecret)

      const user = await UserModel.findOne({ email })
        .select(['_id', 'isEmailVerified'])
        .session(session)

      if (!user) throw new ValidationError('Invalid email')
      if (user.isEmailVerified) throw new ValidationError('Email already verified')

      // const currency = await CurrencyModel.findOne({ countryCode: 'US' })
      //   .select('_id')
      //   .session(session);

      // if (!currency) throw new NotFoundError('Currency "US" not found');

      const account = await AccountModel.create([{
        userId: user._id,
        name: 'Principal'
      }], { session })

      const categories = defaultCategories.map(category => ({
        ...category,
        accountId: account[0]._id
      }))

      await CategoryModel.insertMany(categories, { session })

      await UserModel.findOneAndUpdate(
        { _id: user._id },
        { selectedAccountId: account[0]._id },
        { session }
      )

      await UserModel.updateOne(
        { _id: user._id },
        { isEmailVerified: true },
        { session }
      )

      await session.commitTransaction()
      return true
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
}

module.exports = RegisterService