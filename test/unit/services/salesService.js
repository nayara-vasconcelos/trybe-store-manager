const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesProductsModel = require('../../../models/salesProductsModel');
const { getAll, getById, create, update, deleteById } = require('../../../services/salesService');

const notFoundError = {
  code: 'notFound',
  message: 'Sale not found',
};

// const notPermittedError = {
//   code: 'notPermitted',
//   message: 'Such amount is not permitted to sell',
// };

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

describe('Ao chamar create do salesService', () => {
  // describe('quando o id de algum produto não existe', () => {
  //   const resultModelId = null;
  //   const invalidID = 5;
  //   const notFoundError = {
  //     code: 'notFound',
  //     message: 'Sale not found',
  //   };

  //   before(() => {
  //     sinon.stub(salesModel, 'getById')
  //       .resolves(resultModelId);
  //   });

  //   after(() => {
  //     salesModel.getById.restore();
  //   });
  // });

  describe('quando o body da requisição é preenchido corretamente', () => {
    const validRequest = [
      {
        productId: 1,
        quantity: 2
      },
      {
        productId: 2,
        quantity: 5
      },
    ];
    const resultSalesModel = [{ id: 1 }];
    const resultSalesProductsModel = true;

    before(() => {
      sinon.stub(salesModel, 'create')
        .resolves(resultSalesModel);

      sinon.stub(salesProductsModel, 'create')
        .resolves(resultSalesProductsModel)
    });

    after(() => {
      salesModel.create.restore();
      salesProductsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const result = await create(validRequest);
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "itemsSold"', async () => {
      const result = await create(validRequest);
      expect(result).to.include.all.keys('id', 'itemsSold');
    });

    it('a propriedade "itemsSold" do objeto é um array', async () => {
      const result = await create(validRequest);
      expect(result).to.have.property('itemsSold').that.is.an('array');
    });

    it('a propriedade "itemsSold" do objeto tem as propriedade "productId"', async () => {
      const result = await create(validRequest);
      expect(result).to.nested.include({'itemsSold[0].productId': validRequest[0].productId});
    });

    it('a propriedade "itemsSold" do objeto tem as propriedade "quantity"', async () => {
      const result = await create(validRequest);
      expect(result).to.nested.include({'itemsSold[0].quantity': validRequest[0].quantity});
    });
  });
});

describe('Ao chamar update do salesService', () => {
  describe('quando o body da requisição é preenchido corretamente', () => {
    const validRequest = [
      {
        productId: 1,
        quantity: 6
      },
    ];
    const resultModel = true;

    before(() => {
      sinon.stub(salesModel, 'update')
        .resolves(resultModel);
    });

    after(() => {
      salesModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const result = await update(validRequest);
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "itemUpdated"', async () => {
      const result = await update(validRequest);
      expect(result).to.include.all.keys('id', 'itemUpdated');
    });

    it('a propriedade "itemUpdated" do objeto é um array', async () => {
      const result = await update(validRequest);
      expect(result).to.have.property('itemUpdated').that.is.an('array');
    });

    it('a propriedade "itemUpdated" do objeto tem as propriedade "productId"', async () => {
      const [result] = await update(validRequest);
      expect(result).to.nested.include({'itemUpdated[0].productId': validRequest[0].productId});
    });

    it('a propriedade "itemUpdated" do objeto tem as propriedade "quantity"', async () => {
      const [result] = await update(validRequest);
      expect(result).to.nested.include({'itemUpdated[0].quantity': validRequest[0].quantity});
    });
  });
});

describe('Ao chamar deleteById do salesService', () => {
  describe('quando não há venda cadastrada com determinado id', () => {
    const resultModelId = null;
    const invalidID = '5';
    const invalidRequest = [
      {
        productId: 1,
        quantity: 6
      },
    ];
   
    before(() => {
      sinon.stub(salesModel, 'getById')
        .resolves(resultModelId);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await deleteById(invalidID, invalidRequest);
      expect(result).to.be.an('object');
    });

    it('o objeto possui a propriedade "error"', async () => {
      const result = await deleteById(invalidID, invalidRequest);
      expect(result).to.include.property('error');
    });

    it('a propriedade "error" do objeto contém um objeto com chave "code" e "message"', async () => {
      const result = await deleteById(invalidID, invalidRequest);
      expect(result).to.have.deep.property('error', notFoundError);
    });

    it('o objeto não possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await deleteById(invalidID, invalidRequest);
      expect(result).to.not.have.any.keys('id', 'name', 'quantity');
    });
  });

  describe('quando há um produto cadastrado com determinado id', () => {
    const resultModelDelete = true;
    const resultModelId = [{ id: 1, name: 'produto', quantity: 100 }];
    const validID = '1';
    const validRequest = [
      {
        productId: 1,
        quantity: 6
      },
    ];
  
    before(() => {
      sinon.stub(salesModel, 'getById')
        .resolves(resultModelId);

      sinon.stub(salesModel, 'deleteById')
        .resolves(resultModelDelete);
    });

    after(() => {
      salesModel.getById.restore();
      salesModel.deleteById.restore();
    });

    it('retorna um boolean', async () => {
      const result = await deleteById(validID, validRequest);
      expect(result).to.be.a('boolean');
    });
  
    it('o boolean é "true"', async () => {
      const result = await deleteById(validID, validRequest);
      expect(result).to.be.true;
    });
  });
});
