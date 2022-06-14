const { saleSchema } = require('../schemas/saleSchema');

const validateSale = (req, _res, next) => {
  const { productId, quantity } = req.body;

  const { error } = saleSchema.validate({ productId, quantity });
  if (error) { return next({ message: error.details[0].message }); }
  next();
};

module.exports = {
  validateSale,
};
