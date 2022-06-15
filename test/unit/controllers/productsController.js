// Retornar todos os produtos em GET /products
// Se não houver produtos cadastrados:
// retorná um json com array vazio no body da res.
// retornar status 200
// Se houver produtos cadastrados:
// retornará um json com array de objetos no body da res.
// o array será ordenado pelo id
// retornar status 200

// Retornar um produto em GET /products/:id
// Se não houver produto cadastrado com id:
// retornar um json com mensagem de erro com: { "message": "Product not found" }
// retornar status 404
// Se houver:
// Retornar um objeto
// Objeto com as propriedades id, name, quantity
// status 200

const { expect } = require('chai');
const sinon = require('sinon');

const { getAll, getById, create, update, deleteById } = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');
const { OK, CREATED, NO_CONTENT } = require('./status');

describe('Ao chamar getAll do productsController', () => {
  describe('quando não existem produtos cadastrados', () => {
    const response = {};
    const request = {};
    const resultService = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(resultService);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o método "status" passando o código http 200', async () => {
      await getAll(request, response);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um array', async () => {
      await getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('quando existem produtos cadastrados', async () => {
    const response = {};
    const request = {};

    const resultService = [
      {
        id: 1,
        name: 'produto A',
        quantity: 10
      },
      {
        id: 2,
        name: 'produto B',
        quantity: 20
      }
    ];

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'getAll')
        .resolves(resultService);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o método "status" passando o código http 200', async () => {
      await getAll(request, response);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um array', async () => {
      await getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um array de objetos específicos', async () => {
      await getAll(request, response);

      expect(response.json.calledWith(sinon.match.array.deepEquals(resultService))).to.be.equal(true);
    });
  });
});

describe('Ao chamar getById do productsController', () => {
  // describe('quando não há produto com determinada id', () => {
  //   const response = {};
  //   const request = {};
  //   const next = () => {};
  //   const resultService = { error: {
  //     code: 'notFound',
  //     message: 'Product not found',
  //   }};
  //   const invalidId = 5;

  //   before(() => {
  //     request.params = { id: invalidId };
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
     
  //     sinon.stub(productsService, 'getById').resolves(resultService);
  //   });

  //   after(() => {
  //     productsService.getById.restore();
  //   })

  //   it('é chamado o método "status" passando o código http 404', async () => {
  //     await getById(request, response);

  //     expect(response.status.calledWith(NOT_FOUND)).to.be.equal(true);
  //   });

  //   it('é chamado um método "json" passando um objeto', async () => {
  //     await getById(request, response);

  //     expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  //   });

  //   it('é chamado o método "json" com um objeto com mensagem código 404', async () => {
  //     await getById(request, response);

  //     expect(response.json.calledWith(productNotFound)).to.be.equal(true);
  //   });
  // });

  describe('quando há produto com determinada id', async () => {
    const response = {};
    const request = {};
    const resultService = {
      id: 1,
      name: 'produto A',
      quantity: 10
    };
    const validId = 1;

    before(() => {
      request.params = { id: validId };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(resultService);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o método "status" passando o código http 200', async () => {
      await getById(request, response);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um objeto', async () => {
      await getById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um objeto com a id do parâmetro', async () => {
      await getById(request, response);

      expect(response.json.calledWith(sinon.match.has("id", validId))).to.be.equal(true);
      expect(response.json.calledWith(resultService)).to.be.equal(true);
    });
  });
});

describe('Ao chamar create do productsController', () => {
  describe('quando não há produto cadastrado com mesmo nome', async () => {
    const response = {};
    const request = {};
    const resultService = {
      id: 1,
      name: 'produto',
      quantity: 10
    };

    before(() => {
      request.body = { name: 'produto', quantity: 10 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(resultService);
    });

    after(() => {
      productsService.create.restore();
    });

    it('é chamado o método "status" passando o código http 201', async () => {
      await create(request, response);

      expect(response.status.calledWith(CREATED)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um objeto', async () => {
      await create(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um objeto específico', async () => {
      await create(request, response);

      expect(response.json.calledWith(resultService)).to.be.equal(true);
    });
  });
});

describe('Ao chamar update do productsController', () => {
  describe('quando há produto cadastrado com determinado id', async () => {
    const response = {};
    const request = {};
    const resultService = {
      id: 1,
      name: 'produto',
      quantity: 15
    };
    const validId = 1;

    before(() => {
      request.params = { id: validId };
      request.body = { name: 'produto', quantity: 15 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'update').resolves(resultService);
    });

    after(() => {
      productsService.update.restore();
    });

    it('é chamado o método "status" passando o código http 200', async () => {
      await update(request, response);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um objeto', async () => {
      await update(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um objeto específico', async () => {
      await update(request, response);

      expect(response.json.calledWith(resultService)).to.be.equal(true);
    });
  });
});

describe('Ao chamar deleteById do productsController', () => {
  describe('quando há produto cadastrado com determinado id', async () => {
    const response = {};
    const request = {};
    const resultService = true;
    const validId = 1;

    before(() => {
      request.params = { id: validId };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub();

      sinon.stub(productsService, 'deleteById').resolves(resultService);
    });

    after(() => {
      productsService.deleteById.restore();
    });

    it('é chamado o método "status" passando o código http 204', async () => {
      await deleteById(request, response);

      expect(response.status.calledWith(NO_CONTENT)).to.be.equal(true);
    });

    it('é chamado um método "end" sem parâmetro', async () => {
      await deleteById(request, response);

      expect(response.end.called).to.be.equal(true);
    });
  });
});
