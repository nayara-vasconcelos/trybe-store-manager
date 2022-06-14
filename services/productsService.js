const productsModel = require('../models/productsModel');

// Outros erros:
const notFoundError = {
  code: 'notFound',
  message: 'Product not found',
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) { return ({ error: notFoundError }); }
  return product[0];
};

module.exports = {
  getAll,
  getById,
};
