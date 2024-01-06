const express = require('express');
const app = express();
const veiculosRoutes = require('./routes/veiculos');
const entregasRoutes = require('./routes/entregas');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', veiculosRoutes);
app.use('/', entregasRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});