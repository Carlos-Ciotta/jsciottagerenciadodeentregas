const express = require('express');
const app = express();
const entregasRoutes = require('../src/routes/entregas');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/index", express.static(__dirname + '/frontend'));
app.use('/', entregasRoutes); 

mongoose.connect('mongodb+srv://carloseduardociotta:mongodb159753@ciotta.am99pad.mongodb.net/?retryWrites=true&w=majority')
app.listen(/*process.env.PORT*/3000, () => {
console.log(`Servidor rodando`);});
