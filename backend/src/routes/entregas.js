const express = require('express');
const router = express.Router();
const Entrega = require('../controllers/entregas'); 

/*router.get('/entregas/allusuario', Entrega.getAllEntregasFilterUser);
router.get('/entregas/info/:id_veiculo/:situacao', Entrega.getAllEntregasFilterOperador);
router.get('/entregas/info1/:id_veiculo/:situacao', Entrega.getAllEntregasFilterOperador1);*/
router.get('/entregas/getoperador/:tipo/:id_veiculo/:situacao', Entrega.getAllEntregas);
router.get('/entregas/getusuario/:tipo', Entrega.getAllEntregas);

router.get('/entregas/entregue', Entrega.getLeastEntregues);
router.post('/entregas', Entrega.createEntrega);
router.get('/entregas/:id_entrega', Entrega.getEntregaById);
router.delete('/entregas/:id_entrega', Entrega.deleteEntrega);
router.put('/entregas/:id_entrega', Entrega.updateEntrega);
router.put('/entregas/veiculo/:id_entrega/:id_veiculo/:situacao', Entrega.updateVeiculoEntrega);



module.exports = router;