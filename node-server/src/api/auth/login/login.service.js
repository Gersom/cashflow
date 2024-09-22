const ILoginService = require('./login.types')

class LoginService extends ILoginService {
  constructor (dependencies) {
    super()
    this.UserModel = dependencies.UserModel
    this.AccountModel = dependencies.AccountModel
    this.bcrypt = dependencies.bcrypt
    this.jwt = dependencies.jwt
    this.AuthorizationError = dependencies.AuthorizationError
    this.UnauthorizedError = dependencies.UnauthorizedError
    this.envJwt = dependencies.envJwt
  }

  async login (email, password) {
    const user = await this.UserModel.findOne({ email })
    if (!user || !(await this.bcrypt.compare(password, user.password))) {
      throw new this.AuthorizationError('Invalid email or password')
    }

    if (!user.isEmailVerified) {
      throw new this.UnauthorizedError('Email not verified')
    }

    const userForToken = { id: user._id }
    const accessToken = this.jwt.sign(userForToken, this.envJwt.secret, { expiresIn: this.envJwt.expiration })
    const refreshToken = this.jwt.sign(userForToken, this.envJwt.refreshSecret, { expiresIn: this.envJwt.refreshExpiration })

    const account = await this.AccountModel.findOneData({ _id: user.selectedAccountId })
    const isNewUser = !account.selectedCurrencyId

    return {
      accessToken,
      refreshToken,
      data: { isNewUser }
    }
  }
}

module.exports = LoginService