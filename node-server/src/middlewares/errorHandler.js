// Custom error array
const customErrors = require('@utils/apiErrors');

const errorHandler = (err, req, res, next) => {
  
  const isCustomError = Object.values(customErrors).some(ErrorType => err instanceof ErrorType);
  
  if (process.env.NODE_ENV === 'development') {
    console.error('MESSAGE =>', err.message); 
    console.error('STACK =>', err.stack);

    if (isCustomError) {
      return res.status(isCustomError ? err.status : 500).json({
        status: err.status,
        success: false,
        error: {
          message: isCustomError ? err.message : 'An unexpected error occurred',
          stack: isCustomError ? err.stack : ''
        }
      });
    }

    else {
      return res.status(500).json({
        status: err.status,
        success: false,
        error: {
          message: err.message || 'An unexpected error occurred',
          stack: err.stack || ''
        }
      });
    }
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
    status: 500,
    success: false,
    error: err.message
  });
};

module.exports = errorHandler;