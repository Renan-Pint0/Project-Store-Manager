const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const allSales = require('./mocks/sales.mock');
const salesModel = require('../../../src/models/sales.model');
// importado para fazer o dublê
const connection = require('../../../src/models/connection');
const { execute } = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test the sales model', () => {

  describe('Test the getAll in "/sales"', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([allSales]);
    });

    after(async () => {
      sinon.restore()
    })
    it('getAll with sucess', async () => {
      const response = await salesModel.getAll();
      expect(response).to.equal(allSales);
    });
  });
  describe('Test the getById in "/sales"', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([allSales[2]]);
    });

    after(async () => {
      sinon.restore()
    })
    it('getById with sucess', async () => {
      const response = await salesModel.getById(2);
      expect(response).to.equal(allSales[2]);
    });
  });
});