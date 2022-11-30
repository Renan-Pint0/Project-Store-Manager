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

const registerSaleProducts = async (saleId, productId, quantity) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return result;
};

module.exports = {
  getAll,
  getById,
  registerSale,
  registerSaleProducts,
  getSalesProductsById,
};