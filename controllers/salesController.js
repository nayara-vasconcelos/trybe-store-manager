const salesService = require('../services/salesService');

const {
  statusCodes: { OK, NOT_FOUND },
  msgStatus: { saleNotFound },
} = require('../constants/status');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();
  return res.status(OK).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getById(id);

  if (!sale) {
    return res.status(NOT_FOUND).json(saleNotFound);
  }

  return res.status(OK).json(sale);
};

module.exports = {
  getAll,
  getById,
};
