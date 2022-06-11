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

const connection = require('../../../models/connection');
const { getAll } = require('../../../models/productsModel');

// Função para auxiliar a verificação da ordem do array de produtos;
// const getIdValues = (arrayOfObjs) => {
//   const ids = arrayOfObjs.map((obj) => obj.id);
//   return ids;
// };

// numbers.sort((a, b) => a - b);

// items.sort(function (a, b) {
//   return a.value - b.value;
// });

describe('Ao chamar getAll do productsModel', () => {
  describe('quando não há produtos cadastrados', () => {
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

  describe('quando há produtos cadastrados', () => {
    const resultExecute = [
      [
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

    it('cada objeto possui as propriedades "id", "name" e "quantity"', async () => {
      // result = array[0]
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
