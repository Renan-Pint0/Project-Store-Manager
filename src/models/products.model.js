const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
 
  return result;
};

const getById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return (result);
};

const registerProduct = async ({ name }) => {
  const products = JSON.parse(JSON.stringify(await getAll()));
  const resultId = products[products.length - 1].id;
  const id = resultId + 1;

  await connection.execute(
    'INSERT INTO StoreManager.products (id, name) VALUES (?, ?)',
    [id, name],
  );
  return id;
};
const updateProducts = async (productName, productId) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [productName, productId],
  );
  return productId;
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProducts,
};