const productsModel = require('../models/productsModel');

// Regras de negócio:
// Produto deve ter nome único:
const alreadyExistsError = {
  code: 'alreadyExists',
  message: 'Product already exists',
};

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

const create = async (name, quantity) => {
  const productExists = await productsModel.getByName(name);
  if (productExists) { return ({ error: alreadyExistsError }); }

  const [{ id }] = await productsModel.create(name, quantity);
  const newProduct = { id, name, quantity };
  return newProduct;
};

const update = async (id, name, quantity) => {
  const productExists = await productsModel.getById(id);
  if (!productExists) { return ({ error: notFoundError }); }

  await productsModel.update(id, name, quantity);
  const updatedProduct = { id, name, quantity };
  return updatedProduct;
};

const deleteById = async (id) => {
  const productExists = await productsModel.getById(id);
  if (!productExists) { return ({ error: notFoundError }); }
  await productsModel.deleteById(id);

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
