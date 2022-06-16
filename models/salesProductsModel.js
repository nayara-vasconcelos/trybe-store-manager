const connection = require('./connection');

const DECIMAL = 10;

const create = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
  VALUES (?, ?, ?)`;

  const [result] = await connection.execute(query, [
    parseInt(saleId, DECIMAL),
    parseInt(productId, DECIMAL),
    parseInt(quantity, DECIMAL),
  ]);
  console.log(result);

  return true;
};

const update = async () => {};

module.exports = {
  create,
  update,
};
