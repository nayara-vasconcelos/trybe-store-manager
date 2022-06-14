const { 
  statusCode: { 
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    UNPROCESSABLE_ENTITY,
  },
} = require('../constants/status');

const handleErrors = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

const handleValidationErrors = (err, _req, _res, next) => {
  console.log('ValidationError - Message: ', err.message, 'Erro: ', err);

  if (err.message.match(/required/i)) {
    next({ status: BAD_REQUEST, message: err.message });
  }

  if (err.message.match(/must be/i)) {
    next({ status: UNPROCESSABLE_ENTITY, message: err.message });
  }

  next(err);
};

module.exports = {
  handleErrors,
  handleValidationErrors,
};
