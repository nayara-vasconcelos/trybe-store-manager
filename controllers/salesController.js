const salesService = require('../services/salesService');

const { OK, CREATED, NO_CONTENT } = require('../constants/status');

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

const update = async (req, res, next) => {
  const { id } = req.params;
  const [{ productId, quantity }] = req.body;
  const updatedSale = await salesService.update(id, productId, quantity);

  if (updatedSale.error) { return next(updatedSale.error); }
  return res.status(OK).json(updatedSale);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await salesService.deleteById(id);

  if (result.error) { return next(result.error); }
  return res.status(NO_CONTENT).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
