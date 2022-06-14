const connection = require('./connection');

const DECIMAL = 10;

const getAll = async () => {
  const query = `SELECT * FROM StoreManager.products
  ORDER BY id ASC`;

  // execResult = [[result], [buffer]]
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [parseInt(id, DECIMAL)]);

  if (product.length === 0) { return null; }
  return product;
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [product] = await connection.execute(query, [name]);

  if (product.length === 0) { return null; }
  return product;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [product] = await connection.execute(query, [name, quantity]);
  const newProduct = [{ 
    id: product.insertId,
    name,
    quantity,
  }];

  return newProduct;
};

// Refatorar para padronizar
const update = async (id, name, quantity) => {
  console.log('Update :', id, name, quantity);
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, parseInt(id, DECIMAL)]);
  const updatedProduct = [{ id, name, quantity }];

  return updatedProduct;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [parseInt(id, DECIMAL)]);

  return true;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteById,
};
