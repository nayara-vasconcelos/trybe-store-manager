const salesService = require('../services/salesService');

const { OK, CREATED } = require('../constants/status');

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

const create = async (req, res) => {
  const newSale = req.body;
  const createdSale = await salesService.create(newSale);

  return res.status(CREATED).json(createdSale);
};

const update = async () => {};

const deleteById = async () => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
