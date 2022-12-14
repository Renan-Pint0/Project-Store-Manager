const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `
    SELECT p.sale_id AS saleId, s.date, p.product_id AS productId, p.quantity
    FROM StoreManager.sales AS s 
    INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id
    ORDER BY sale_id, product_id
    `,
  );
  return result;
};

const getById = async (saleId) => {
  const [result] = await connection.execute(
    `
    SELECT s.date, p.product_id AS productId, p.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS p
    ON s.id = p.sale_id
    WHERE sale_id = ?
    ORDER BY sale_id, product_id
    `,
    [saleId],
    );
    return (result);
};
const getSalesById = async (saleId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [saleId],
  );
  return (result);
};

const getSalesProductsById = async (saleId) => {
  const [result] = await connection.execute(
    'SELECT * FROM sales_products WHERE sale_id = ?',
    [saleId],
  );
  return (result);
};

const registerSale = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return sale;
};

const registerSaleProducts = async (saleId, sale) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, ...Object.values(sale)],
  );
  return result;
};
const updateSale = async (productId, quantity, saleId) => {
  const [{ affectRows }] = await connection.execute(
    'UPDATE StoreManager.products SET product_id = ? quantity = ? WHERE id = ?',
    [productId, quantity, saleId],
  );
  return affectRows;
};

const deleteSale = async (saleId) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  registerSale,
  registerSaleProducts,
  getSalesProductsById,
  deleteSale,
  getSalesById,
  updateSale,
};