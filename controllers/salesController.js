const salesService = require('../services/salesService');

const { OK } = require('../constants/status');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(OK).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);

  if (sale.error) { return next(sale.error); }

  return res.status(OK).json(sale);
};

module.exports = {
  getAll,
  getById,
};
