/* eslint-disable no-undef */
const { createLoginService } = require('./login.service')

describe('LoginService', () => {
  let mockUserModel
  let mockAccountModel
  let mockBcrypt
  let mockJwt
  let mockAuthorizationError
  let mockUnauthorizedError
  let mockEnvJwt

  beforeEach(() => {
    mockUserModel = {
      findOne: jest.fn()
    }
    mockAccountModel = {
      findOneData: jest.fn()
    }
    mockBcrypt = {
      compare: jest.fn()
    }
    mockJwt = {
      sign: jest.fn()
    }
    mockAuthorizationError = jest.fn()
    mockUnauthorizedError = jest.fn()
    mockEnvJwt = {
      secret: 'test-secret',
      expiration: '1h',
      refreshSecret: 'test-refresh-secret',
      refreshExpiration: '7d'
    }
  })

  it('should throw AuthorizationError if user not found', async () => {
    mockUserModel.findOne.mockResolvedValue(null)

    const loginService = createLoginService({
      UserModel: mockUserModel,
      AccountModel: mockAccountModel,
      bcrypt: mockBcrypt,
      jwt: mockJwt,
      AuthorizationError: mockAuthorizationError,
      UnauthorizedError: mockUnauthorizedError,
      envJwt: mockEnvJwt
    })

    await expect(loginService({ email: 'test@example.com', password: 'password' }))
      .rejects.toThrow(mockAuthorizationError)

    expect(mockAuthorizationError).toHaveBeenCalledWith('Invalid email or password')
  })
})