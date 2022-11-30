const productsModel = require('../models/products.model');

const validate = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { type: 'Not_Found', message: 'Product not found' };

    return { type: null, message: '' };
};

module.exports = {
  validate,
};