// Custom error array
const customErrors = require('@utils/apiErrors');

const errorHandler = (err, req, res, next) => {
  const isCustomError = Object.values(customErrors).some(ErrorType => err instanceof ErrorType);

  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
    return res.status(isCustomError ? err.status : 500).json({
      status: err.status,
      success: false,
      error: isCustomError ? err.message : 'An unexpected error occurred',
      stack: err.stack
    });
  }

  console.error(err.message);

  if (isCustomError) {
    return res.status(err.status).json({
      status: err.status,
      success: false,
      error: err.message
    });
  }

  // In production, send a generic message for non-custom errors
  res.status(500).json({
    error: 'An unexpected error occurred'
  });
};

module.exports = errorHandler;