const salesModel = require('../models/sales.model');

const registerSales = async (sales) => {
  const saleId = await salesModel.registerSale();
  await Promise.all(sales.map(async (sale) => {
    await salesModel.registerSaleProducts(saleId.insertId, sale.productId, sale.quantity);
  }));
  return { type: null, message: { id: saleId.insertId, itemsSold: sales } };
};
const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};
const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  return sale;
};

module.exports = {
  registerSales,
  getAll,
  getById,
};