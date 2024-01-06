const express = require('express');
const router = express.Router();
const Veiculo = require('../controllers/veiculos'); 

router.get('/veiculos', Veiculo.getAllVeiculos);
router.post('/veiculos', Veiculo.createVeiculo);
router.get('/veiculos/:id', Veiculo.getVeiculoById);
router.delete('/veiculos/:id', Veiculo.deleteVeiculo);
router.put('/veiculos/:id', Veiculo.updateVeiculo);

module.exports = router;