const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
// importado para fazer o dublê
const fs = require('fs').promises;

const { expect } = chai;

chai.use(chaiHttp);