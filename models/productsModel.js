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

module.exports = {
  getAll,
  getById,
  getByName,
};
