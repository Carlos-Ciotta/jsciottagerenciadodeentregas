const express = require('express');
const app = express();
const entregasRoutes = require('../src/routes/entregas');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', entregasRoutes); 

app.listen(process.env.PORT || 3000, () => {
console.log(`Servidor rodando na porta http://${HOST}:${PORT}`);});