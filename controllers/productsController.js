const productsService = require('../services/productsService');

const { OK, CREATED, NO_CONTENT } = require('../constants/status');

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

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsService.create(name, quantity);

  if (product.error) { return next(product.error); }
  return res.status(CREATED).json(product);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.update(id, name, quantity);

  if (product.error) { return next(product.error); }
  return res.status(OK).json(product);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await productsService.deleteById(id);

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
