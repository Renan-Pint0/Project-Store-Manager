const productsModel = require('../models/products.model');

const getAll = async () => {
  const allPrducts = await productsModel.getAll();

  return { type: null, message: allPrducts };
};

const getById = async (productId) => {
  const productsWithId = await productsModel.getById(productId);

  return productsWithId;
};

module.exports = {
  getAll,
  getById,
};