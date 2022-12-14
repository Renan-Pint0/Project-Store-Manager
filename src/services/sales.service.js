const salesModel = require('../models/sales.model');
const validateId = require('../middlewares/validateSaleId');

const validateSales = require('../middlewares/validateSaleProductsQuantity');

const registerSales = async (sales) => {
  const isValidList = await validateSales.validateProductsForSale(sales);
  if (!isValidList) return { type: 404, message: 'Product not found' }; 

  const newSaleId = await salesModel.registerSale();

  await Promise.all(sales.map(async (sale) => {
    await salesModel.registerSaleProducts(newSaleId.insertId, sale);
  }));

  return { type: null, message: { id: newSaleId.insertId, itemsSold: sales } };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};
const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  return sale;
};
const updateSale = async (saleId, productSale) => {
  const verifyId = await validateId.validate(saleId);
  if (verifyId.type) return verifyId;
  // await Promise.all(productSale.map(async (product) => {
  //   await salesModel.updateSale(saleId, product.productId, product.quantity);
  // }));
  return { type: null, message: { saleId: Number(saleId), itemsUpdated: productSale } };
};

const deleteSale = async (saleId) => {
  const verifyId = await validateId.validate(saleId);
  if (verifyId.type) return verifyId;

  await salesModel.deleteSale(saleId);
  return { type: null, message: '' };
};

module.exports = {
  registerSales,
  getAll,
  getById,
  deleteSale,
  updateSale,
};