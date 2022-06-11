const productsService = require('../services/productsService');
const { statusCodes: { OK } } = require('../constants/status');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(OK).json(products);
};

module.exports = {
  getAll,
};
