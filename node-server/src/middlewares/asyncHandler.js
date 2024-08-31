// const asyncHandler = (fn) => (req, res, next) =>
//   Promise.resolve(fn(req, res, next)).catch(next);

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      if (fn.length > 3) {
        // Si la función tiene más de 3 parámetros, asumimos que es un error handler
        await fn(err, req, res, next);
      } else {
        await fn(req, res, next);
      }
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { asyncHandler };
