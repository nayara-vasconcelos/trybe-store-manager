const connection = require('./connection');

const DECIMAL = 10;

const format = (obj) => ({
  date: obj.date,
  productId: obj.product_id,
  quantity: obj.quantity,
});

const getAll = async () => {
  const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa
  ON sp.sale_id = sa.id
  ORDER BY sale_id ASC, product_id ASC`;

  // execResult = [[result], [buffer]]
  const [sales] = await connection.execute(query);
  const formattedSales = sales.map((item) => ({
      saleId: item.sale_id,
      ...format(item),
  }));

  return formattedSales;
};

const getById = async (id) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa
  ON sp.sale_id = sa.id
  WHERE sp.sale_id = ?`;

  // execResult = [[result], [buffer]]
  const [sale] = await connection.execute(query, [parseInt(id, DECIMAL)]);
  if (sale.length === 0) { return null; }
  const formattedSale = sale.map((item) => format(item));

  return formattedSale;
};

const create = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';

  const [sale] = await connection.execute(query);
  const saleId = [{ id: sale.insertId }];

  return saleId;
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  await connection.execute(query, [parseInt(id, DECIMAL)]);

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
};
