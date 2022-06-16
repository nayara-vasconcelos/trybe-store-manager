const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const { create, update } = require('../../../models/salesProductsModel');

describe('Ao chamar create do salesProductsModel', () => {
  const newSale = { saleId: 1, productId: 1, quantity: 6 };
  const resultExecute = [[{}], []];

  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(resultExecute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('retorna um boolean', async () => {
    const result = await create(newSale.saleId, newSale.productId, newSale.quantity);
    expect(result).to.be.a('boolean');
  });

  it('o boolean é "true"', async () => {
    const result = await create(newSale.saleId, newSale.productId, newSale.quantity);
    expect(result).to.be.true;
  });
});

describe('Ao chamar update do salesProductsModel', () => {
  const updatedProduct = { saleId: '1', productId: 1, quantity: 6 };
  const resultExecute = [[{}], []];

  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(resultExecute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('retorna um boolean', async () => {
    const result = await update(updatedProduct.saleId, updatedProduct.productId, updatedProduct.quantity);
    expect(result).to.be.a('boolean');
  });

  it('o boolean é "true"', async () => {
    const result = await update(updatedProduct.saleId, updatedProduct.productId, updatedProduct.quantity);
    expect(result).to.be.true;
  });
});
