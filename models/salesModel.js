const connection = require('./connection');

const format = (obj) => ({
  saleId: obj.sale_id,
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
  const formattedSales = sales.map((sale) => format(sale));
  return formattedSales;
};

const getById = async () => {
};

module.exports = {
  getAll,
  getById,
};
