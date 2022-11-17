const productsService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAll();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(Number(id));

  if (result === undefined) return res.status(404).json({ message: 'Product not found' });

  return res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductsById,
};