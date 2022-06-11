const express = require('express');
const { getAll } = require('../../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/', getAll);

module.exports = salesRouter;