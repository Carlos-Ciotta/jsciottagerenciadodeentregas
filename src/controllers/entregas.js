const Entrega = require('./models/entregas');

const getAllEntregas = async(req,res, next)=>{
    try{
        const entregas = await Cliente.findAll();
        if (entregas){
            res.status(200).json({
                'status': 'Sucesso',
                'entregas': entregas
            });
        }
        else{
            const erro = new Error("Entregas não encontradas");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
};

const getEntregaById = async(req,res, next)=>{
    const id = req.params.id;
    try{
        const entrega = await Entrega.findByPk(id);
        if (entrega){
            res.status(200).json({
                'status': 'Sucesso',
                'entrega':entrega
            });
        }
        else{
            const erro = new Error("Entrega não encontrada");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entrega', error);
    }
};

const getEntregaBySituacao = async(req,res, next)=>{
    const s = req.params.situacao;
    try{
        const entregas = await Entrega.findByPk(s);
        if (entregas){
            res.status(200).json({
                'status': 'Sucesso',
                'entregas':entregas
            });
        }
        else{
            const erro = new Error("Entregas não encontrada");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
};

const getEntregaByData_entrega = async(req,res, next)=>{
    const de = req.params.data_entrega;
    try{
        const entrega = await Entrega.findByPk(de);
        if (entrega){
            res.status(200).json({
                'status': 'Sucesso',
                'entrega':entrega
            });
        }
        else{
            const erro = new Error("Entrega não encontrada");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entrega', error);
    }
};

const getEntregaByHora_entrega = async(req,res, next)=>{
    const he = req.params.hora_entrega;
    try{
        const entrega = await Entrega.findByPk(he);
        if (entrega){
            res.status(200).json({
                'status': 'Sucesso',
                'entrega':entrega
            });
        }
        else{
            const erro = new Error("Entrega não encontrada");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entrega', error);
    }
};

const getEntregaByVendedor = async(req,res, next)=>{
    const v = req.params.vendedor;
    try{
        const entrega = await Entrega.findByPk(v);
        if (entrega){
            res.status(200).json({
                'status': 'Sucesso',
                'entrega':entrega
            });
        }
        else{
            const erro = new Error("Entrega não encontrada");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entrega', error);
    }
};

const createEntrega = async(req, res)=>{
    try {
    const entrega = await Entrega.create(req.body);
    res.status(201).json(Entrega);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar entrega.' });
  }
};

const deleteEntrega = async(req, res, next)=>{
    const id = req.params.id;
    try{
        const entrega = await Entrega.findByPk(id);
        if(entrega){
            Entrega.destroy({ where: { id } })
            res.status(200).json({
                'status':'Entrega excluida'
            });
        }
        else{
            const erro = new Error("Entrega não encontrada");
            erro.status(404);
            return next(erro);
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir entrega.' });
    }
};

const updateEntrega = async(req, res, next)=>{
     const { id } = req.params;
    try {
    const [updatedRows] = await Entrega.update(req.body, { where: { id } });
    if (updatedRows > 0) {
      const updatedEntrega = await Entrega.findByPk(id);
      res.status(200).json(updatedEntrega);
    } else {
      res.status(404).json({ error: 'Entrega não encontrada ou sem alterações.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
  }
};

module.exports = {
  getAllEntregas,
  getEntregaByData_entrega,
  getEntregaByHora_entrega,
  getEntregaById,
  getEntregaByVendedor,
  getEntregaBySituacao,
  getAllEntregas,
  createEntrega,
  deleteEntrega,
  updateEntrega
};