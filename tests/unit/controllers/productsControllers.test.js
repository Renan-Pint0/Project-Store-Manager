const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const allProducts = require('../models/mocks/products.mock');
const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');

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
  describe('Test the deleteProduct in "/products"', () => {
    const res = {};
    const req = { params: { id: 1 } };
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'deleteProduct').resolves('');
    });

    after(async () => {
      sinon.restore()
    })
    it('deleteProduct with sucess', async () => {
      await productsController.deleteProduct(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });
  });
});