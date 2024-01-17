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
    const colunas = ['id_entrega', 'nome_cliente', 'bairro', 'hora_entrega', 'data_entrega', 'observacao','situacao'];
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {situacao: ['Aguardando']}});
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
    const colunas = ['id_entrega', 'nome_cliente','telefone', 'rua', 'bairro', 'situacao','vendedor', 'observacao'];
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {situacao: ['Entregue']},
            order: [['data_cadastro', 'DESC'], ['hora_cadastro', 'DESC']],
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
async getAllEntregas (req,res, next){
    try{
        const entregas = await Entrega.findAll();
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

async getEntregaByIdVeiculo (req,res, next){
    const id_v = req.params.situacao;
    colunas = ['id_entrega', 'nome_cliente', 'bairro']
    try{
        const entregas = await Entrega.findAll({attributes: colunas,
            where: {id_veiculo: id_v}});
        if (entregas){
            res.status(200).json(entregas)
        }
        else{
            const erro = new Error("Entregas não encontrada");
            erro.status(404);
            return next(erro);
        }
    } catch(error){
        console.error('Erro ao obter entregas', error);
    }
},

async getEntregaByData_entrega (req,res, next){
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
},

async getEntregaByHora_entrega (req,res, next){
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
},

async getEntregaByVendedor (req,res, next){
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
},


    async createEntrega(req, res){
        const { id_entrega, id_veiculo, nome_cliente, telefone, bairro, rua, situacao, data_cadastro, hora_cadastro, data_entrega, hora_entrega, observacao, vendedor } = req.body;
        console.log('Parâmetros recebidos:', req.body);
        try {
        const entrega = await Entrega.create({ id_entrega,id_veiculo, nome_cliente, telefone, bairro, rua, situacao, data_cadastro, hora_cadastro, data_entrega, hora_entrega, observacao, vendedor });
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
        const { id_entrega } = req.params;
        const id_veiculo = req.body.id_veiculo
        try {
        const [updatedRows] = await Entrega.update({id_veiculo:id_veiculo}, { where: { id_entrega } });
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
