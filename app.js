// Código desenvolvido pela Trybe e modificado por Nayara V.

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes');
const { handleErrors } = require('./middlewares/errorMiddlewares');

const app = express();
app.use(bodyParser.json());

app.use('/', router);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(handleErrors);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
