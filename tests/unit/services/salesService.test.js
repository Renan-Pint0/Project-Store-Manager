const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { allSales,saleById }= require('../models/mocks/sales.mock');
const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test the sales service', () => {

  describe('Test the getAll in "/sales"', () => {
    before(async () => {
      sinon.stub(salesModel, 'getAll').resolves(allSales);
    });

    after(async () => {
      sinon.restore()
    })
    it('getAll with sucess', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.deep.equal(allSales);
    });
  });
  describe('Test the getById in "/sales"', () => {
    before(async () => {
      sinon.stub(salesModel, 'getById').resolves(saleById);
    });

    after(async () => {
      sinon.restore()
    })
    it('getById with sucess', async () => {
      const response = await salesService.getById(2);
      expect(response).to.be.deep.equal(saleById);
    });
  });
  
  describe('Test the deleteSales in "/sales"', () => {
    before(async () => {
      sinon.stub(salesModel, 'deleteSale').resolves([]);
    });

    after(async () => {
      sinon.restore()
    })
    it('deleteSales with sucess', async () => {
      const response = await salesService.deleteSale(1);
      expect(response.message).to.be.deep.equal('');
    });
  });
});