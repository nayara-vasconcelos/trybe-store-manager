const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const { getAll, getById, getByName, create, update, deleteById } = require('../../../models/productsModel');

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
  });
});

describe('Ao chamar getById do productsModel', () => {
  describe('quando não há produto com determinada id', () => {
    const resultExecute = [[],[]];
    const invalidID = '5';

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

  describe('quando há um produto com determinada id', () => {
    const validId = '1';
    const resultExecute = [
      [
        {
          id: 1,
          name: 'produto A',
          quantity: 10,
        },
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
      const result = await getById(validId);
      expect(result).to.be.an('array');
    });

    it('o array contém apenas um item', async () => {
      const result = await getById(validId);
      expect(result).to.have.lengthOf(1);
    });

    it('o item é um objeto', async () => {
      // result = array[0]
      const [result] = await getById(validId);
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
      // result = array[0]
      const [result] = await getById(validId);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Ao chamar getByName do productsModel', () => {
  describe('quando não há produto com determinado nome', () => {
    const resultExecute = [[],[]];
    const invalidName = 'Batatinha123';

    before(async () => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const result = await getByName(invalidName);
      expect(result).to.be.null;
    });
  });

  describe('quando há um produto com determinado nome', () => {
    const validName = 'produto A';
    const resultExecute = [
      [
        {
          id: 1,
          name: 'produto A',
          quantity: 10,
        },
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
      const result = await getByName(validName);
      expect(result).to.be.an('array');
    });

    it('o array contém apenas um item', async () => {
      const result = await getByName(validName);
      expect(result).to.have.lengthOf(1);
    });

    it('o item é um objeto', async () => {
      // result = array[0]
      const [result] = await getByName(validName);
      expect(result).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "name" e "quantity"', async () => {
      // result = array[0]
      const [result] = await getByName(validName);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Ao chamar create do productsModel', () => {
  const newProduct = { name: 'produto', quantity: 100 };
  const resultExecute = [
    [
      {
        insertId: 1,
      },
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
    const result = await create(newProduct.name, newProduct.quantity);
    expect(result).to.be.an('array');
  });

  it('o array contém apenas um item', async () => {
    const result = await create(newProduct.name, newProduct.quantity);
    expect(result).to.have.lengthOf(1);
  });

  it('o item é um objeto', async () => {
    // result = array[0]
    const [result] = await create(newProduct.name, newProduct.quantity);
    expect(result).to.be.an('object');
  });

  it('o objeto possui as propriedades "id"', async () => {
    // result = array[0]
    const [result] = await create(newProduct.name, newProduct.quantity);
    expect(result).to.have.property('id');
  });
});

describe('Ao chamar update do productsModel', () => {
  const updatedProduct = { id: '1', name: 'produto', quantity: 15 };
  const resultExecute = [[{}], []];

  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(resultExecute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('retorna um boolean', async () => {
    const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
    expect(result).to.be.a('boolean');
  });

  it('o boolean é "true"', async () => {
    const result = await update(updatedProduct.id, updatedProduct.name, updatedProduct.quantity);
    expect(result).to.be.true;
  });
});

describe('Ao chamar deleteById do productsModel', () => {
  const productId = '1';
  const resultExecute = [[{}], []];

  before(async () => {
    sinon.stub(connection, 'execute')
      .resolves(resultExecute);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('retorna um boolean', async () => {
    const result = await deleteById(productId);
    expect(result).to.be.a('boolean');
  });

  it('o boolean é "true"', async () => {
    const result = await deleteById(productId);
    expect(result).to.be.true;
  });
});
