const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { allProducts, deleteProducts } = require('./mocks/products.mock');
const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test the products model', () => {

  describe('Test the getAll in "/products"', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([allProducts]);
    });

    after(async () => {
      sinon.restore()
    })
    it('getAll with sucess', async () => {
      const response = await productsModel.getAll();
      expect(response).to.equal(allProducts);
    });
  });
  describe('Test the getById in "/products"', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    });

    after(async () => {
      sinon.restore()
    })
    it('getBYId with sucess', async () => {
      const response = await productsModel.getById(1);
      expect(response).to.equal(allProducts[0]);
    });
  });
  describe('Test the deleteProduct in "/products"', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(deleteProducts);
    });

    after(async () => {
      sinon.restore()
    })
    it('deleteProduct with sucess', async () => {
      const response = await productsModel.deleteProduct(1);
      expect(response).to.be.deep.equal(deleteProducts);
    });
  });
});