const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const allSales = require('../models/mocks/sales.mock');
const saleById = require('../models/mocks/sales.mock');
const salesModel = require('../../../src/models/sales.model');
// importado para fazer o dublê
const salesService = require('../../../src/services/sales.service');
const { execute } = require('../../../src/models/connection');

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
      const response = await salesModel.getById(2);
      expect(response).to.be.deep.equal(saleById);
    });
  });
});