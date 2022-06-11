const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const { getAll, getById } = require('../../../models/salesModel');

describe('Ao chamar getAll do salesModel', () => {
  describe('quando não há vendas cadastradas', () => {
    const resultExecute = [[],[]];

    before(async () => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    after(async () => {
      connection.execute.restore();
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
    const resultExecute = [
      [
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
        }
      ],
      []
    ];

    before(async () => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    after(async () => {
      connection.execute.restore();
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

describe('Ao chamar getById do salesModel', () => {
  describe('quando não há venda com determinado id', () => {
    const resultExecute = [[],[]];
    const invalidID = 5;

    before(async () => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const result = await getById(invalidID);
      expect(result).to.be.null;
    });
  });

  describe('quando há venda com determinado id', () => {
    const validId = 1;
    const resultExecute = [
      [
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
      ],
      [],
    ];

    before(async () => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    after(async () => {
      connection.execute.restore();
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

    it('o objeto possui as propriedades "date", "productId" e "quantity"', async () => {
      // result = array[0]
      const [result] = await getById(validId);
      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    });
  });
});
