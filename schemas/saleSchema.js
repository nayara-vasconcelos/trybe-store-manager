const Joi = require('joi');

const saleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
}));

module.exports = {
  saleSchema,
};
