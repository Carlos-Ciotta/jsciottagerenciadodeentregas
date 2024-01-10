const express = require('express');
const router = express.Router();
const Entrega = require('../controllers/entregas'); 

router.get('/entregas/all', Entrega.getAllEntregas);
router.get('/entregas/allusuario', Entrega.getAllEntregasFilterUser);
router.get('/entregas/entregue', Entrega.getLeastEntregues);
router.post('/entregas', Entrega.createEntrega);
router.get('/entregas/:id', Entrega.getEntregaById);
router.delete('/entregas/:id', Entrega.deleteEntrega);
router.put('/entregas/:id', Entrega.updateEntrega);

module.exports = router;