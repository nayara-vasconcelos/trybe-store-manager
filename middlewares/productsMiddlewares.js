const { productSchema } = require('../schemas/productSchema');

const validateProduct = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = productSchema.validate({ name, quantity });
  if (error) { next(error); }
  next();
};

module.exports = {
  validateProduct,
};
