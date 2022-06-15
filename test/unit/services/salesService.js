const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const { getAll, getById } = require('../../../services/salesService');

describe('Ao chamar getAll do salesModel', () => {
  describe('quando não há vendas cadastradas', () => {
    const resultModel = [];

    before(() => {
      sinon.stub(salesModel, 'getAll')
        .resolves(resultModel);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await getAll();
      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await getAll();
      expect(result).to.be.empty;
    });
  });

  describe('quando há vendas cadastradas', () => {
    const resultModel = [
      {
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      },
      {
        saleId: 1,
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2
      },
    ];

    before(() => {
      sinon.stub(salesModel, 'getAll')
        .resolves(resultModel);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await getAll();
      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await getAll();
      expect(result).to.not.be.empty;
    });

    it('o array contém objetos', async () => {
      // result = array[0]
      const [result] = await getAll();
      expect(result).to.be.an('object');
    });

    it('cada objeto possui as propriedades "saleId", "date", "productId" e "quantity"', async () => {
      // result = array[0]
      const [result] = await getAll();
      expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
});

describe('Ao chamar getById do salesService', () => {
  describe('quando não há venda com determinado id', () => {
    const resultModel = null;
    const invalidID = 5;
    const notFoundError = {
      code: 'notFound',
      message: 'Sale not found',
    };

    before(() => {
      sinon.stub(salesModel, 'getById')
        .resolves(resultModel);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await getById(invalidID);
      expect(result).to.be.an('object');
    });

    it('o objeto possui a propriedade "error"', async () => {
      const result = await getById(invalidID);
      expect(result).to.include.property('error');
    });

    it('a propriedade "error" do objeto contém um objeto com chave "code" e "message"', async () => {
      const result = await getById(invalidID);
      expect(result).to.have.deep.property('error', notFoundError);
    });

    it('o objeto não possui as propriedades "date", "productId" e "quantity"', async () => {
      const result = await getById(invalidID);
      expect(result).to.not.have.any.keys('date', 'productId', 'quantity');
    });
  });

  describe('quando há venda com determinado id', () => {
    const validId = 1;
    const resultModel = [
      {
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        productId: 2,
        quantity: 2
      },
    ];

    before(() => {
      sinon.stub(salesModel, 'getById')
        .resolves(resultModel);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um array', async () => {
      const result = await getById(validId);
      expect(result).to.be.an('array');
    });

    it('o array contém objetos', async () => {
      // result = array[0]
      const [result] = await getById(validId);
      expect(result).to.be.an('object');
    });

    it('cada objeto possui as propriedades "date", "productId" e "quantity"', async () => {
      // result = array[0]
      const [result] = await getById(validId);
      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    });
  });
});
