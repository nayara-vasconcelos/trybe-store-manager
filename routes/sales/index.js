const express = require('express');
const { getAll, getById } = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', getAll);
salesRouter.get('/:id', getById);

module.exports = salesRouter;