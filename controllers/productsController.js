const productsService = require('../services/productsService');

const { OK } = require('../constants/status');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(OK).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (product.error) { return next(product.error); }
  return res.status(OK).json(product);
};

module.exports = {
  getAll,
  getById,
};
