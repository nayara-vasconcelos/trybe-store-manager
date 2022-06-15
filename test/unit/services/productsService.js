const { expect } = require('chai');
const sinon = require('sinon');

const { getAll, getById, create, update, deleteById } = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

const notFoundError = {
  code: 'notFound',
  message: 'Product not found',
};

const alreadyExistsError = {
  code: 'alreadyExists',
  message: 'Product already exists',
};

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
  });
});

describe('Ao chamar getById do productsService', () => {
  describe('quando não há produto com determinada id', () => {
    const resultModel = null;
    const invalidID = '5';
  
    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModel);
    });

    after(() => {
      productsModel.getById.restore();
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

    it('o objeto não possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await getById(invalidID);
      expect(result).to.not.have.any.keys('id', 'name', 'quantity');
    });
  });

  describe('quando há um produto com determinada id', () => {
    const resultModel = [{
      id: 1,
      name: 'produto A',
      quantity: 10,
    }];

    const validId = '1';

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

describe('Ao chamar create do productsService', () => {
  describe('quando há produto cadastrado com o mesmo nome', () => {
    const newProduct = { name: 'produto', quantity: 100 };
    const resultModelName = [{ id: 1, name: 'produto', quantity: 100 }];

    before(() => {
      sinon.stub(productsModel, 'getByName')
        .resolves(resultModelName);
    });

    after(() => {
      productsModel.getByName.restore();
    });

    it('retorna um objeto', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.be.an('object');
    });

    it('o objeto possui a propriedade "error"', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.include.property('error');
    });

    it('a propriedade "error" do objeto contém um objeto com chave "code" e "message"', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.have.deep.property('error', alreadyExistsError);
    });

    it('o objeto não possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.not.have.any.keys('id', 'name', 'quantity');
    });
  });

  describe('quando não há um produto cadastrado com o mesmo nome', () => {
    const resultModelName = null;
    const resultModelCreate = [{ id: 1, name: 'produto', quantity: 10 }];
    const newProduct = { name: 'produto', quantity: 10 }
  
    before(() => {
      sinon.stub(productsModel, 'getByName')
        .resolves(resultModelName);

      sinon.stub(productsModel, 'create')
        .resolves(resultModelCreate);
    });

    after(() => {
      productsModel.getByName.restore();
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.be.an('object');
    });

    it('o objeto não possui a propriedade "error" com um objeto', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.not.have.property('error', alreadyExistsError);
    });

    it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await create(newProduct.name, newProduct.quantity);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Ao chamar update do productsService', () => {
  describe('quando não há produto cadastrado com determinado id', () => {
    const updatedProduct = { id: 10, name: 'produto', quantity: 15 };
    const resultModelId = null;
    // const resultModelName = [{ id: 1, name: 'produto', quantity: 15 }];

    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModelId);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.be.an('object');
    });

    it('o objeto possui a propriedade "error"', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.include.property('error');
    });

    it('a propriedade "error" do objeto contém um objeto com chave "code" e "message"', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.have.deep.property('error', notFoundError);
    });

    it('o objeto não possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.not.have.any.keys('id', 'name', 'quantity');
    });
  });

  describe('quando há um produto cadastrado com determinado id', () => {
    const resultModelId = [{ id: 1, name: 'produto', quantity: 100 }];
    const resultModelUpdate = true;
    const updatedProduct = { id: 1, name: 'produto', quantity: 15 }
  
    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModelId);

      sinon.stub(productsModel, 'update')
        .resolves(resultModelUpdate);
    });

    after(() => {
      productsModel.getById.restore();
      productsModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.be.an('object');
    });

    it('o objeto não possui a propriedade "error" com um objeto', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.not.have.property('error', alreadyExistsError);
    });

    it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Ao chamar deleteById do productsService', () => {
  describe('quando não há produto cadastrado com determinado id', () => {
    const invalidID = 5;
    const resultModelId = null;
   
    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModelId);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await deleteById(invalidID);
      expect(result).to.be.an('object');
    });

    it('o objeto possui a propriedade "error"', async () => {
      const result = await deleteById(invalidID);
      expect(result).to.include.property('error');
    });

    it('a propriedade "error" do objeto contém um objeto com chave "code" e "message"', async () => {
      const result = await deleteById(invalidID);
      expect(result).to.have.deep.property('error', notFoundError);
    });

    it('o objeto não possui as propriedades "id", "name" e "quantity"', async () => {
      const result = await deleteById(invalidID);
      expect(result).to.not.have.any.keys('id', 'name', 'quantity');
    });
  });

  describe('quando há um produto cadastrado com determinado id', () => {
    const resultModelId = [{ id: 1, name: 'produto', quantity: 100 }];
    const resultModelDelete = true;
    const validID = 1;
  
    before(() => {
      sinon.stub(productsModel, 'getById')
        .resolves(resultModelId);

      sinon.stub(productsModel, 'deleteById')
        .resolves(resultModelDelete);
    });

    after(() => {
      productsModel.getById.restore();
      productsModel.deleteById.restore();
    });

    it('retorna um boolean', async () => {
      const result = await deleteById(validID);
      expect(result).to.be.a('boolean');
    });
  
    it('o boolean é "true"', async () => {
      const result = await deleteById(validID);
      expect(result).to.be.true;
    });
  });
});
