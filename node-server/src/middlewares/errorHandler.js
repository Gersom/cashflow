const customErrors = require('@utils/apiErrors')

const errorHandler = (err, req, res, next) => {
  const isCustomError = Object.values(customErrors).some(
    (ErrorType) => err instanceof ErrorType
  )

  const errorResponse = {
    status: isCustomError ? err.status : 500,
    success: false,
    error: {
      message: isCustomError ? err.message : 'An unexpected error occurred',
      code: isCustomError ? err.code.id : 'UNKNOWN_ERROR'
    }
  }

  console.error('ERROR:')
  console.error('> NAME =>', err.name)
  console.error('> MESSAGE =>', err.message)

  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.description = isCustomError ? err.code.description : 'UNKNOWN_ERROR'
    errorResponse.error.stack = err.stack

    console.error('> CODE =>', `${err.code.id} (${err.code.description})`)
    console.error('> STACK :\n', err.stack)
  } else {
    console.error('> CODE =>', err.code.id)
  }

  res.status(errorResponse.status).json(errorResponse)
}

module.exports = errorHandler
