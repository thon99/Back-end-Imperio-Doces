const express = require('express');
const routes = require('./routes');
const cors = require('cors')

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
