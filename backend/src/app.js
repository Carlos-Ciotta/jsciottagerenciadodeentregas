const express = require('express');
const app = express();
const veiculosRoutes = require('../src/routes/veiculos');
const entregasRoutes = require('../src/routes/entregas');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', veiculosRoutes);
app.use('/', entregasRoutes); 

const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3000;

app.listen(PORT,HOST, () => {
console.log(`Servidor rodando na porta http://${HOST}:${PORT}`);});