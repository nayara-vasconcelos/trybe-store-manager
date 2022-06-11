const express = require('express');
const productsRouter = require('./products');
const salesRouter = require('./sales');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;