const { productSchema } = require('../schemas/productSchema');

const validateProduct = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = productSchema.validate({ name, quantity });
  if (error) { return next({ message: error.details[0].message }); }
  next();
};

module.exports = {
  validateProduct,
};
