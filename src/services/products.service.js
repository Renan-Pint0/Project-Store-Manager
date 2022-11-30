const productsModel = require('../models/products.model');
const validateId = require('../middlewares/validateId');

const getAll = async () => {
  const allPrducts = await productsModel.getAll();

  return { type: null, message: allPrducts };
};

const getById = async (productId) => {
  const productsWithId = await productsModel.getById(productId);

  return productsWithId;
};

const registerProduct = async (product) => {
  const id = await productsModel.registerProduct(product);

  return getById(id);
};
const updateProducts = async (name, productId) => {
  const verifyId = await validateId.validate(productId);
  if (verifyId.type) return verifyId;

  const id = await productsModel.updateProducts(name, productId);
  return { type: null, message: { id, name } };
};

module.exports = {
  getAll,
  getById,
  registerProduct,
  updateProducts,
};