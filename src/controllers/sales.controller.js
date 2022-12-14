const salesService = require('../services/sales.service');

const registerSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.registerSales(sale);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
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
const updateSale = async (req, res) => {
  const { id } = req.params;
  const { prductSale } = req.body;
  const { type, message } = await salesService.updateSale(id, prductSale);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};
const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json(message);
};
module.exports = {
  registerSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};