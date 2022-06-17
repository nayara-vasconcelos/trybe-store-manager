const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');
const productsService = require('./productsService');

// Erros:
const notFoundError = {
  code: 'notFound',
  message: 'Sale not found',
};

const notPermittedError = {
  code: 'notPermitted',
  message: 'Such amount is not permitted to sell',
};

// Atualizar a quantidade do produto ao fazer uma venda

// Validar a quantidade do produto:
// 1) para cada venda, promise.all para criar um array de objetos de produto
// 2) Verificar se um produto não tem a quantidade necessária
// 3) Se tiver, prosseguir com a venda
// 4) Se não tiver, enviar error not permitted.

const verifyProductsQuantity = async (products) => {
  const productsBD = await Promise.all(products
    .map((product) => productsService.getById(product.productId)));

  // Falta verificar se produto existe
  // Se for null, retorna o erro id not Found
  // Se for invalido, retorna o erro not Permitted
  // Se estiver tudo ok, retorna true
  const isValid = productsBD
    .every((productBD, i) => productBD.quantity > products[i].quantity);

  return isValid;
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
  const isValid = await verifyProductsQuantity(products);
  if (!isValid) { return ({ error: notPermittedError }); }

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

const update = async (saleId, productId, quantity) => {
  const saleExists = await salesModel.getById(saleId);
  if (!saleExists) { return ({ error: notFoundError }); }

  await salesProductsModel.update(saleId, productId, quantity);
  const updatedSale = {
    saleId,
    itemUpdated: [{ productId, quantity }],
  };

  return updatedSale;
};

const deleteById = async (id) => {
  const saleExists = await salesModel.getById(id);
  if (!saleExists) { return ({ error: notFoundError }); }
  await salesModel.deleteById(id);

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  verifyProductsQuantity,
};