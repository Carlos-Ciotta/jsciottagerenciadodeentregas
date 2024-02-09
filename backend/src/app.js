const express = require('express');
const app = express();
const entregasRoutes = require('../src/routes/entregas');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', entregasRoutes); 
mongoose.connect('mongodb+srv://ndstr:<password>@cluster0.pfyukxj.mongodb.net/?retryWrites=true&w=majority')
app.listen(process.env.PORT || 3000, () => {
console.log(`Servidor rodando na porta 3000`);});