const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const allProducts = require('../models/mocks/products.mock');
const productsModel = require('../../../src/models/products.model');
// importado para fazer o dublê
const productsService = require('../../../src/services/products.service');
const { execute } = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test the products service', () => {

  describe('Test the getAll in "/products"', () => {
    before(async () => {
      sinon.stub(productsModel, 'getAll').resolves(allProducts);
    });

    after(async () => {
      sinon.restore()
    })
    it('getAll with sucess', async () => {
      const response = await productsService.getAll();
      expect(response).to.be.deep.equal({ type: null, message: allProducts });
    });
  });
  describe('Test the getById in "/products"', () => {
    before(async () => {
      sinon.stub(productsModel, 'getById').resolves([allProducts[0]]);
    });

    after(async () => {
      sinon.restore()
    })
    it('getBYId with sucess', async () => {
      const response = await productsService.getById(1);
      expect(response).to.be.deep.equal([allProducts[0]]);
    });
  });
});