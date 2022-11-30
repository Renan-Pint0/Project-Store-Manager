const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const allSales = require('../models/mocks/sales.mock');
const salesController = require('../../../src/controllers/sales.controller');
// importado para fazer o dublê
const salesService = require('../../../src/services/sales.service');
const { execute } = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test the sales controller', () => {

  describe('Test the getAll in "/sales"', () => {
    const res = {};
    const req = {};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves({ type: null, message: allSales });
    });

    after(async () => {
      sinon.restore()
    })
    it('getAll with sucess', async () => {
      await salesController.getAll(req, res);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(allSales);
    });
  });
  describe('Test the getById in "/sales"', () => {
    const res = {};
    const req = {};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves({ type: null, message: allSales.saleById });
    });

    after(async () => {
      sinon.restore()
    })
    it('getBYId with sucess', async () => {
      await salesService.getById(1);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(allSales.saleById);
    });
  });
});