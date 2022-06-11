const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT * FROM StoreManager.products
  ORDER BY id ASC`;

  // execResult = [[result], [buffer]]
  const [products] = await connection.execute(query);
  return products;
};

module.exports = {
  getAll,
};
