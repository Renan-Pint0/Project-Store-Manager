const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const sinonChai = require('sinon-chai');
const allProducts = require('../models/mocks/products.mock');
const productsController = require('../../../src/controllers/products.controller');
// importado para fazer o dublê
const productsService = require('../../../src/services/products.service');
const { execute } = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Test the products controller', () => {

  describe('Test the getAllProducts in "/products"', () => {
    const res = {};
    const req = {};
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves({ type: null, message: allProducts });
    });

    after(async () => {
      sinon.restore()
    })
    it('getAllProducts with sucess', async () => {
      await productsController.getAllProducts(req, res);
      expect(res.status).to.have.be.calledWith(200);
      expect(res.json).to.have.be.calledWith(allProducts);
    });
  });
  describe('Test the getById in "/products"', () => {
    const res = {};
    const req = { params: { id: 1 } };
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves([allProducts[0]]);
    });

    after(async () => {
      sinon.restore()
    })
    it('getBYId with sucess', async () => {
      const response = await productsController.getProductsById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([allProducts[0]]);
    });
  });
});