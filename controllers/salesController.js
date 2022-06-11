const salesService = require('../services/salesService');

const {
  statusCodes: { OK },
} = require('../constants/status');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(OK).json(sales);
};

const getById = async (_req, _res) => {
};

module.exports = {
  getAll,
  getById,
};