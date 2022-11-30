const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSaleProduct = require('../middlewares/validateSaleProductsProductId');
const validateSaleProductsQuantity = require('../middlewares/validateSaleProductsQuantity');

const salesRouter = express.Router();

salesRouter.post('/',
  validateSaleProduct,
  validateSaleProductsQuantity,
  salesController.registerSale);
salesRouter.get('/', salesController.getAll);
salesRouter.get('/:id', salesController.getById);

module.exports = salesRouter;