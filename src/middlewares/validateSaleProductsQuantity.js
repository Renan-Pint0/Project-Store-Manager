const Joi = require('joi');
const productModel = require('../models/products.model');

const productValidation = Joi.object({
  name: Joi.string().min(5).required(),
});

const validateProduct = (req, res, next) => {
  const { name } = req.body;
  const { error } = productValidation.validate({ name });
  if (error) {
    if (error.details[0].type === 'string.min') {
      return res.status(422).json({ message: error.details[0].message });
    }
    if (error.details[0].type === 'any.required') {
      return res.status(400).json({ message: error.details[0].message });
    }
  }

  return next();
};

const validateProductsForSale = async (sales) => {
  const result = (await Promise
    .all(Object
      .values(sales)
      .map(async (sale) => productModel.getById(sale.productId)))); 
  return result.every((product) => product !== undefined);
};

module.exports = {
  validateProduct,
  validateProductsForSale,
};