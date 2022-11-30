const express = require('express');
const productsController = require('../controllers/products.controller');
const vaalidateName = require('../middlewares/vaalidateName');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductsById);
productsRouter.post('/', vaalidateName, productsController.registerProduct);
productsRouter.put('/:id', vaalidateName, productsController.updateProducts);

module.exports = productsRouter;