const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async () => {
};

module.exports = {
  getAll,
  getById,
};