const salesModel = require('../models/salesModel');

// Outros erros
const notFoundError = {
  code: 'notFound',
  message: 'Sale not found',
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) { return ({ error: notFoundError }); }
  return sale;
};

module.exports = {
  getAll,
  getById,
};