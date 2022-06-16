const express = require('express');
const rescue = require('express-rescue');

const { getAll, getById, create } = require('../../controllers/salesController');
const { handleValidationErrors } = require('../../middlewares/errorMiddlewares');
const { validateSale } = require('../../middlewares/salesMiddlewares');

const salesRouter = express.Router();

salesRouter.get('/', getAll);
salesRouter.get('/:id', getById);
salesRouter.post('/', validateSale, [rescue(create), handleValidationErrors]);

module.exports = salesRouter;