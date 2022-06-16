const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

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

const create = async (products) => {
  const [newSale] = await salesModel.create();
  await Promise.all(products
    .map((product) => salesProductsModel
    .create(newSale.id, product.productId, product.quantity)));

  const createdSale = {
    id: newSale.id,
    itemsSold: products,
  };
  return createdSale;
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