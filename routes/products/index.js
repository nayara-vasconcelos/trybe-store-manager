const express = require('express');
const { getAll } = require('../../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', getAll);

module.exports = productsRouter;