const express = require('express');
const app = express();
const entregasRoutes = require('../src/routes/entregas');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/operador", express.static("/frontend/operador"));
app.use("/usuario", express.static("/frontend/usuario"));
app.use("/index", express.static("/frontend/index"));
app.use('/', entregasRoutes); 

/*app.get("/index", function(req,res){
    res.sendFile(__dirname + "/frontend/index.html")
})
app.get("/operador", function(req,res){
    res.sendFile(__dirname + "/frontend/operador.html")
})
app.get("/usuario", function(req,res){
    res.sendFile(__dirname + "/frontend/usuario.html")
})*/

mongoose.connect('mongodb+srv://carloseduardociotta:mongodb159753@ciotta.am99pad.mongodb.net/?retryWrites=true&w=majority')
app.listen(process.env.PORT, () => {
console.log(`Servidor rodando na porta 3000`);});
