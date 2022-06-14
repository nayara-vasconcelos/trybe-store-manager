const { saleSchema } = require('../schemas/saleSchema');

const validateSale = (req, _res, next) => {
  const { productId, quantity } = req.body;

  const { error } = saleSchema.validate({ productId, quantity });
  if (error) { next(error); }
  next();
};

module.exports = {
  validateSale,
};
