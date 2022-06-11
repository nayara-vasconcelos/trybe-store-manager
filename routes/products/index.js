const express = require('express');
const { getAll, getById } = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', getAll);
productsRouter.get('/:id', getById);

module.exports = productsRouter;