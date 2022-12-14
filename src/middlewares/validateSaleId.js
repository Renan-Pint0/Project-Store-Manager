const saleModel = require('../models/sales.model');

const validate = async (id) => {
  const result = await saleModel.getSalesById(id);
  if (!result) return { type: 'Not_Found', message: 'Sale not found' };

    return { type: null, message: '' };
};

module.exports = {
  validate,
};