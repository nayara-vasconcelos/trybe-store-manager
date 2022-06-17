const { 
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  UNPROCESSABLE_ENTITY,
  NOT_FOUND,
  CONFLICT,
} = require('../constants/status');

const statusByErrorCode = {
  notFound: NOT_FOUND,
  alreadyExists: CONFLICT,
  notPermitted: UNPROCESSABLE_ENTITY,
};

const handleErrors = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // Necessário corrigir!!! - mostrou um erro que não deveria ao digitar query errada
  // O erro tinha uma key code
  if (err.code) {
    const status = statusByErrorCode[err.code] || INTERNAL_SERVER_ERROR;
    return res.status(status).json({ message: err.message });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

const handleValidationErrors = (err, _req, _res, next) => {
  if (err.message.match(/required/i)) {
    return next({ status: BAD_REQUEST, message: err.message });
  }

  if (err.message.match(/must be/i)) {
    return next({ status: UNPROCESSABLE_ENTITY, message: err.message });
  }

  return next(err);
};

module.exports = {
  handleErrors,
  handleValidationErrors,
};
