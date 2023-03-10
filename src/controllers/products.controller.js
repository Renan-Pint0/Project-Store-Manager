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

const registerProduct = async (req, res) => {
  const product = req.body;

  const result = await productsService.registerProduct(product);

  return res.status(201).json(result);
};
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProducts(name, id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json(message);
};
const querySearch = async (req, res) => {
  const { q } = req.query;
  const result = await productsService.querySearch(q);
  res.status(200).json(result);
};

module.exports = {
  getAllProducts,
  getProductsById,
  registerProduct,
  updateProducts,
  deleteProduct,
  querySearch,
};