const express = require('express');
const router = express.Router();
const Entrega = require('../controllers/entregas'); 

router.get('/entregas/all', Entrega.getAllEntregas);
router.get('/entregas/allusuario', Entrega.getAllEntregasFilterUser);
router.get('/entregas/alloperador', Entrega.getAllEntregasFilterOperador);
router.get('/entregas/entregue', Entrega.getLeastEntregues);
router.get('/entregas/byveiculo/:id_veiculo', Entrega.getEntregaByIdVeiculo);
router.post('/entregas', Entrega.createEntrega);
router.get('/entregas/:id_entrega', Entrega.getEntregaById);
router.delete('/entregas/:id_entrega', Entrega.deleteEntrega);
router.put('/entregas/:id_entrega', Entrega.updateEntrega);
router.put('/entregas/veiculo/:id_entrega', Entrega.updateVeiculoEntrega);

module.exports = router;