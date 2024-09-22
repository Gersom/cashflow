const ERROR_CODES = {
  AUTH: {
    UNAUTHORIZED: {
      code: 'AUTH_001',
      description: 'No autorizado',
      status: 401
    },
    FORBIDDEN: {
      code: 'AUTH_002',
      description: 'Acceso prohibido',
      status: 403
    }
  },

  EXPIRATION: {
    EXPIRED: {
      code: 'EXP_001',
      description: 'Recurso expirado',
      status: 410
    },
    TOKEN_EXPIRED: {
      code: 'EXP_002',
      description: 'Token expirado',
      status: 401
    },
    REFRESH_TOKEN_EXPIRED: {
      code: 'EXP_003',
      description: 'Token de refresco expirado',
      status: 401
    },
    CODE_EXPIRED: {
      code: 'EXP_004',
      description: 'Código expirado',
      status: 401
    }
  },

  EMAIL: {
    SEND_ERROR: {
      code: 'EMAIL_001',
      description: 'Error al enviar email',
      status: 500
    }
  },

  DATA: {
    NOT_FOUND: {
      code: 'DATA_001',
      description: 'Recurso no encontrado',
      status: 404
    },
    CONFLICT: {
      code: 'DATA_002',
      description: 'Conflicto de datos',
      status: 409
    }
  },

  VALIDATION: {
    INVALID_INPUT: {
      code: 'VALID_001',
      description: 'Entrada inválida',
      status: 400
    },
    INVALID_TOKEN: {
      code: 'VALID_002',
      description: 'Token inválido',
      status: 401
    },
    REFRESH_TOKEN_INVALID: {
      code: 'VALID_003',
      description: 'Token de refresco inválido',
      status: 401
    }
  },

  SERVER: {
    INTERNAL_ERROR: {
      code: 'SRV_001',
      description: 'Error interno del servidor',
      status: 500
    }
  }
}

module.exports = ERROR_CODES