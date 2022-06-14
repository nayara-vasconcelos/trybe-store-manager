const express = require('express');
const rescue = require('express-rescue');

const { getAll, getById, create } = require('../../controllers/productsController');
const { handleValidationErrors } = require('../../middlewares/errorMiddlewares');
const { validateProduct } = require('../../middlewares/productsMiddlewares');

const productsRouter = express.Router();

productsRouter.get('/', rescue(getAll));
productsRouter.get('/:id', rescue(getById));
productsRouter.post('/', validateProduct, [rescue(create), handleValidationErrors]);

module.exports = productsRouter;
