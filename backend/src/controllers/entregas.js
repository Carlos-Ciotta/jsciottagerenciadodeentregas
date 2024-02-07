const Entrega = require('../models/entregas');

module.exports = {

async getAllEntregasFilterUser (req,res, next){
    const colunas = ['id_entrega', 'nome_cliente', 'bairro', 'situacao','vendedor', 'observacao'];
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {situacao: ['Aguardando', 'Em andamento']}});
        if (entregas){
            res.status(200).json(entregas);
        }
        else{
            const erro = new Error("Entregas não encontradas");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
},
async getAllEntregasFilterOperador (req,res, next){
    const { situacao, id_veiculo } = req.params;
    const colunas = ['id_entrega', 'nome_cliente', 'bairro', 'hora_entrega', 'data_entrega', 'observacao','situacao'];
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {situacao: situacao, id_veiculo: id_veiculo}});
        if (entregas){
            res.status(200).json(entregas);
        }
        else{
            const erro = new Error("Entregas não encontradas");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
},
async getAllEntregasFilterOperador1 (req,res, next){
    const { situacao, id_veiculo } = req.params;
    const colunas = ['id_entrega', 'nome_cliente', 'bairro'];
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {situacao: situacao, id_veiculo: id_veiculo}});
        if (entregas){
            res.status(200).json(entregas);
        }
        else{
            const erro = new Error("Entregas não encontradas");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
},
async getLeastEntregues (req,res, next){
    const colunas = ['id_entrega', 'nome_cliente','bairro', 'situacao','vendedor', 'observacao'];
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {situacao: ['Entregue']},
            limit: 20});
        if (entregas){
            res.status(200).json(entregas);
        }
        else{
            const erro = new Error("Entregas não encontradas");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
},

async getEntregaById(req,res, next){
    const id_entrega = req.params.id_entrega;
    try{
        const entrega = await Entrega.findOne({
            where: {
              id_entrega: id_entrega,
            },
          });
        if (entrega){
            res.status(200).json(entrega)
        }
        else{
            const erro = new Error("Entrega não encontrada");
        }
    } catch(error){
        console.error('Erro ao obter entrega', error);
    }
},

async createEntrega(req, res){
    const { id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor } = req.body;
    try {
    const entrega = await Entrega.create({ id_entrega,id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor });
    res.status(201).json(entrega);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar entrega.' });
    }
},

async deleteEntrega(req, res, next){
    const id_entrega = req.params.id;
    try{
            const entrega = await Entrega.findByPk(id_entrega);
            if(entrega){
                Entrega.destroy({ where: { id_entrega } })
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
    },
async updateEntrega(req, res, next){
        const { id_entrega } = req.params;
        try {
        const [updatedRows] = await Entrega.update(req.body, { where: { id_entrega } });
        if (updatedRows > 0) {
        const updatedEntrega = await Entrega.findByPk(id_entrega);
        res.status(200).json(updatedEntrega);
        } else {
        res.status(404).json({ error: 'Entrega não encontrada ou sem alterações.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
    }
},
async updateVeiculoEntrega(req, res, next){
        const { id_entrega, id_veiculo, situacao } = req.params;
        try {
        const [updatedRows] = await Entrega.update({id_veiculo: id_veiculo, situacao: situacao}, { where: { id_entrega } });
        if (updatedRows > 0) {
        const updatedEntrega = await Entrega.findByPk(id_entrega);
        res.status(200).json(updatedEntrega);
        } else {
        res.status(404).json({ error: 'Entrega não encontrada ou sem alterações.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
    }
    }
};
