const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const sinonChai = require('sinon-chai');
const allSales = require('../models/mocks/sales.mock');
const salesController = require('../../../src/controllers/sales.controller');
// importado para fazer o dublê
const salesService = require('../../../src/services/sales.service');
const { execute } = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Test the sales controller', () => {

  describe('Test the getAll in "/sales"', () => {
    const res = {};
    const req = {};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves(allSales);
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
    const req = { params: { id: 1 } };
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves(allSales.saleById);
    });

    after(async () => {
      sinon.restore()
    })
    it('getBYId with sucess', async () => {
      await salesController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales.saleById);
    });
  });
});