const Veiculo = require('../models/veiculos');

const Entrega = require('../models/entregas');

const getAllVeiculos = async(req,res, next)=>{
    try{
        const veiculos = await Veiculo.findAll();
        if (veiculos){
            res.status(200).json({
                'status': 'Sucesso',
                'veiculos': veiculos
            });
        }
        else{
            const erro = new Error("Veiculos não encontrados");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter veiculos', error);
    }
};

const getVeiculoById = async(req,res, next)=>{
    const id = req.params.id;
    try{
        const veiculo = await Veiculo.findByPk(id);
        if (veiculo){
            res.status(200).json({
                'status': 'Sucesso',
                'veiculo':veiculo
            });
        }
        else{
            const erro = new Error("Veiculo não encontrado");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter veiculo', error);
    }
};

const createVeiculo = async(req, res)=>{
    try {
    const veiculo = await Veiculo.create(req.body);
    res.status(201).json(Veiculo);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar veiculo.' });
  }
};

const deleteVeiculo = async(req, res, next)=>{
    const id = req.params.id;
    try{
        const veiculo = await Entrega.findByPk(id);
        if(veiculo){
            Veiculo.destroy({ where: { id } })
            res.status(200).json({
                'status':'Veiculo excluido'
            });
        }
        else{
            const erro = new Error("Veiculo não encontrado");
            erro.status(404);
            return next(erro);
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir veiculo.' });
    }
};

const updateVeiculo = async(req, res, next)=>{
     const { id } = req.params;
    try {
    const [updatedRows] = await Veiculo.update(req.body, { where: { id } });
    if (updatedRows > 0) {
      const updatedVeiculo = await Veiculo.findByPk(id);
      res.status(200).json(updatedVeiculo);
    } else {
      res.status(404).json({ error: 'Veiculo não encontrado ou sem alterações.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Veiculo.' });
  }
};

module.exports = {
  getAllVeiculos,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
  getVeiculoById
};