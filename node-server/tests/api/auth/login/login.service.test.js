/* eslint-disable no-undef */
const { requireAliases } = require('../../../utils/aliases')

const LoginService = requireAliases('@api/auth/login/login.service')
const { AuthorizationError, UnauthorizedError } = requireAliases('@src/utils/apiErrors')

describe('LoginService', () => {
  // Mock de las dependencias
  const mockUserModel = {
    findOne: jest.fn()
  }
  const mockAccountModel = {
    findOneData: jest.fn()
  }
  const mockBcrypt = {
    compare: jest.fn()
  }
  const mockJwt = {
    sign: jest.fn()
  }

  const mockEnvJwt = {
    secret: 'test_secret',
    expiration: '1h',
    refreshSecret: 'test_refresh_secret',
    refreshExpiration: '7d'
  }

  // Instancia del servicio con dependencias mock
  const loginService = new LoginService({
    UserModel: mockUserModel,
    AccountModel: mockAccountModel,
    bcrypt: mockBcrypt,
    jwt: mockJwt,
    AuthorizationError,
    UnauthorizedError,
    envJwt: mockEnvJwt
  })

  // Reiniciar los mocks antes de cada test
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('login method', () => {
    it('should throw AuthorizationError if user is not found', async () => {
      // Configurar el mock para simular que no se encuentra el usuario
      mockUserModel.findOne.mockResolvedValue(null)

      // Verificar que se lanza la excepción correcta
      await expect(loginService.login('test@example.com', 'password'))
        .rejects.toThrow(AuthorizationError)

      // Verificar que se llamó a findOne con los parámetros correctos
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
    })

    it('should throw AuthorizationError if password is incorrect', async () => {
      // Configurar los mocks para simular un usuario encontrado pero contraseña incorrecta
      mockUserModel.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' })
      mockBcrypt.compare.mockResolvedValue(false)

      // Verificar que se lanza la excepción correcta
      await expect(loginService.login('test@example.com', 'wrongpassword'))
        .rejects.toThrow(AuthorizationError)

      // Verificar que se llamaron los métodos correctos
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(mockBcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedPassword')
    })

    it('should throw UnauthorizedError if email is not verified', async () => {
      // Configurar los mocks para simular un usuario encontrado con contraseña correcta pero email no verificado
      mockUserModel.findOne.mockResolvedValue({
        email: 'test@example.com',
        password: 'hashedPassword',
        isEmailVerified: false
      })
      mockBcrypt.compare.mockResolvedValue(true)

      // Verificar que se lanza la excepción correcta
      await expect(loginService.login('test@example.com', 'password'))
        .rejects.toThrow(UnauthorizedError)
    })

    it('should return tokens and user data on successful login', async () => {
      // Configurar los mocks para simular un login exitoso
      mockUserModel.findOne.mockResolvedValue({
        _id: 'user_id',
        email: 'test@example.com',
        password: 'hashedPassword',
        isEmailVerified: true,
        selectedAccountId: 'account_id'
      })
      mockBcrypt.compare.mockResolvedValue(true)
      mockJwt.sign.mockReturnValueOnce('access_token').mockReturnValueOnce('refresh_token')
      mockAccountModel.findOneData.mockResolvedValue({ selectedCurrencyId: 'currency_id' })

      // Ejecutar el método de login
      const result = await loginService.login('test@example.com', 'password')

      // Verificar el resultado
      expect(result).toEqual({
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
        data: { isNewUser: false }
      })

      // Verificar que se llamaron los métodos correctos
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(mockBcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword')
      expect(mockJwt.sign).toHaveBeenCalledTimes(2)
      expect(mockAccountModel.findOneData).toHaveBeenCalledWith({ _id: 'account_id' })
    })
  })
})