const salesService = require('../services/sales.service');

const registerSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await salesService.registerSales(sale);

  return res.status(type).json(message);
};
const getAll = async (req, res) => {
  const sales = await salesService.getAll();
  return res.status(200).json(sales);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const saleId = await salesService.getById(id);
  if (saleId.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(saleId);
};

module.exports = {
  registerSale,
  getAll,
  getById,
};