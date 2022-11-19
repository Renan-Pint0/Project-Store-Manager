const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const products = require('../../product.mock.json');
// importado para fazer o dublê
const connection = require('../../../src/models/connection');
const { execute } = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test the products model', () => {

  describe('Test the get /products', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([]);
    });

    after(async () => {
      sinon.restore()
    })
    it('get with sucess', async () => {
      const response = await chai
        .request(app)
        .get('/products');
      
      expect(response.status).to.be.equal(200);
      expect(response).to.equal(products);
    });
  });
});