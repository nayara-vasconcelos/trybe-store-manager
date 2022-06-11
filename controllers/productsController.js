const productsService = require('../services/productsService');

const {
  statusCodes: { OK, NOT_FOUND },
  msgStatus: { productNotFound },
} = require('../constants/status');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(OK).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);

  if (!product) {
    return res.status(NOT_FOUND).json(productNotFound);
  }

  return res.status(OK).json(product);
};

module.exports = {
  getAll,
  getById,
};
