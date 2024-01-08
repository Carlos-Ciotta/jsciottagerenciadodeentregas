const express = require('express');
const router = express.Router();
const Entrega = require('../controllers/entregas'); 

router.get('/entregas', Entrega.getAllEntregas);
router.post('/entregas', Entrega.createEntrega);
router.get('/entregas/:id', Entrega.getEntregaById);
router.delete('/entregas/:id', Entrega.deleteEntrega);
router.put('/entregas/:id', Entrega.updateEntrega);
router.get('/index', (req,res)=>{
    return res.json({
        message: "AAA"
    });
});
module.exports = router;