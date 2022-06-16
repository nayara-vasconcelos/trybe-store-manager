const { expect } = require('chai');
const sinon = require('sinon');

const { getAll, getById, create, update, deleteById } = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const { OK, CREATED, NO_CONTENT } = require('./status');

describe('Ao chamar getAll do salesController', () => {
  describe('quando não existem produtos cadastrados', () => {
    const response = {};
    const request = {};
    const resultService = [];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(resultService);
    });

    after(() => {
      salesService.getAll.restore();
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
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(salesService, 'getAll')
        .resolves(resultService);
    });

    after(() => {
      salesService.getAll.restore();
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

describe('Ao chamar getById do salesController', () => {
  // describe('quando não há produto com determinada id', () => {
  //   const response = {};
  //   const request = {};
  //   const notFoundError = {
  //     code: 'notFound',
  //     message: 'Sale not found',
  //   };
  //   const resultService = { error: notFoundError };
  //   const invalidId = 5;

  //   before(() => {
  //     request.params = { id: invalidId };
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(salesService, 'getById').resolves(resultService);
  //   });

  //   after(() => {
  //     salesService.getById.restore();
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

  //     expect(response.json.calledWith(saleNotFound)).to.be.equal(true);
  //   });
  // });

  describe('quando há produto com determinada id', async () => {
    const response = {};
    const request = {};
    const resultService = [
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
    const validId = 1;

    before(() => {
      request.params = { id: validId };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(resultService);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('é chamado o método "status" passando o código http 200', async () => {
      await getById(request, response);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um array', async () => {
      await getById(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado um método "json" passando um array de objetos de uma venda', async () => {
      await getById(request, response);

      expect(response.json.calledWith(resultService)).to.be.equal(true);
    });
  });
});

describe('Ao chamar create do salesController', () => {
  describe('quando o body da requisição possui o formato correto', async () => {
    const response = {};
    const request = {};
    const resultService = {
      id: 1,
      itemsSold: [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    before(() => {
      request.body = [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'create').resolves(resultService);
    });

    after(() => {
      salesService.create.restore();
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

describe('Ao chamar update do salesController', () => {
  describe('quando o body da requisição possui o formato correto', async () => {
    const response = {};
    const request = {};
    const resultService = {
      saleId: 1,
      itemUpdated: [
        {
          productId: 1,
          quantity: 6,
        }
      ],
    };

    before(() => {
      request.body = [{ productId: 1, quantity: 6 }];
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'update').resolves(resultService);
    });

    after(() => {
      salesService.update.restore();
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

describe('Ao chamar deleteById do salesController', () => {
  describe('quando há produto cadastrado com determinado id', async () => {
    const response = {};
    const request = {};
    const resultService = true;
    const validId = '1';

    before(() => {
      request.params = { id: validId };
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub();

      sinon.stub(salesService, 'deleteById').resolves(resultService);
    });

    after(() => {
      salesService.deleteById.restore();
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
