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

module.exports = {
  getAll,
  getById,
};