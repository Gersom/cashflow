const customErrors = require('@utils/apiErrors')

const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err)

  const isCustomError = Object.values(customErrors).some(
    (ErrorType) => err instanceof ErrorType
  )

  const errorResponse = {
    status: isCustomError ? err.status : 500,
    success: false,
    error: {
      message: isCustomError ? err.message : 'An unexpected error occurred',
      code: isCustomError ? err.code : 'UNKNOWN_ERROR'
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('NAME =>', err.name)
    console.error('MESSAGE =>', err.message)
    console.error('STACK =>', err.stack)
    console.error('TYPE =>', err.code)
    errorResponse.error.stack = err.stack
  }

  res.status(errorResponse.status).json(errorResponse)
}

module.exports = errorHandler
