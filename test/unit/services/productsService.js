// Retornar todos os produtos em GET /products
// Se não houver produtos cadastrados:
// retorná um array vazio.
// Se houver produtos cadastrados:
// retornará um array de objetos.
// o array será ordenado pelo id

// Retornar um produto em GET /products/:id
// Se não houver produto cadastrado com id:
// retornar null
// Se houver:
// Retornar um objeto
// Objeto com as propriedades id, name, quantity

const { expect } = require('chai');
const sinon = require('sinon');

const { getAll, getById } = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

// Função para auxiliar a verificação da ordem do array de produtos;
// const getIdValues = (arrayOfObjs) => {
//   const ids = arrayOfObjs.map((obj) => obj.id);
//   return ids;
// };

// numbers.sort((a, b) => a - b);

// items.sort(function (a, b) {
//   return a.value - b.value;
// });

describe('Ao chamar o getAll do productsService', () => {
  describe('quando não há produtos cadastrados', () => {
    const resultModel = [];

    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(resultModel);
    });

    after(() => {
      productsModel.getAll.restore();
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

  describe('quando há produtos cadastrados', () => {
    const resultModel = [
      {
        id: 1,
        name: 'produto A',
        quantity: 10,
      },
      {
        id: 2,
        name: 'produto B',
        quantity: 20,
      }
    ];

    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(resultModel);
    });

    after(() => {
      productsModel.getAll.restore();
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
      const [result] = await getAll();
      expect(result).to.be.an('object');
    });

    it('cada objeto possui as propriedades "id", "name" e "quantity"', async () => {
      const [result] = await getAll();
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });

    // it('o array está ordenado pela propriedade "id" dos objetos em ordem crescente', async () => {
    //   // result = array[0]
    //   const [result] = await getAll();
    //   expect(getIdValues(result)).to.have.ordered.members([1, 2])
    //     .but.not.have.ordered.members([2, 1]);
    // });
  });
});

describe('Ao chamar getById do productsService', () => {
  describe('quando não há produto com determinada id', () => {
    const resultModel = null;
    const invalidID = 5;

    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModel);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna null', async () => {
      const result = await getById(invalidID);
      expect(result).to.be.null;
    });
  });

  describe('quando há um produto com determinada', () => {
    const resultModel = [{
      id: 1,
      name: 'produto A',
      quantity: 10,
    }];

    const validId = 1;

    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModel);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await getById(validId);
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await getById(validId);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});
