const express = require('express');
const rescue = require('express-rescue');

const {
  getAll, getById, create, update, deleteById,
} = require('../../controllers/salesController');
const { handleValidationErrors } = require('../../middlewares/errorMiddlewares');
const { validateSale } = require('../../middlewares/salesMiddlewares');

const salesRouter = express.Router();

salesRouter.get('/', rescue(getAll));
salesRouter.get('/:id', rescue(getById));
salesRouter.post('/', validateSale, [rescue(create), handleValidationErrors]);
salesRouter.put('/:id', validateSale, [rescue(update), handleValidationErrors]);
salesRouter.delete('/:id', rescue(deleteById));

module.exports = salesRouter;
