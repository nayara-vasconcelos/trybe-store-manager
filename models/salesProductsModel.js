const connection = require('./connection');

const DECIMAL = 10;

const create = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;

  await connection.execute(query, [
    parseInt(saleId, DECIMAL),
    parseInt(productId, DECIMAL),
    parseInt(quantity, DECIMAL),
  ]);

  return true;
};

const update = async (saleId, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products SET quantity = ?
  WHERE (sale_id = ? AND product_id = ?)`;

  await connection.execute(query, [
    parseInt(quantity, DECIMAL),
    parseInt(saleId, DECIMAL),
    parseInt(productId, DECIMAL)]);

  return true;
};

module.exports = {
  create,
  update,
};
