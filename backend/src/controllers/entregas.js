const Entrega = require('../models/entregas');
/*async function excluirPrimeirosRegistros() {
    try {
        // Esperar pela conclusão da operação deleteMany
        const resultado = await Entrega.deleteMany({ id_entrega: { $lt: 8000 } });

        // Exibir o número de documentos excluídos
        console.log(`Número de documentos excluídos: ${resultado.deletedCount}`);
        return resultado;
    } catch (error) {
        // Exibir e lançar o erro para tratamento posterior
        console.error('Erro ao excluir registros:', error);
        throw error;
    }
}*/
module.exports = {
    async getAllEntregas(req, res, next) {
        const { tipo } = req.params;

        if (tipo == 'usuario'){
            try {
                const entregas = await Entrega.find({ situacao: { $in: ['Aguardando', 'Em andamento'] }}).sort({ situacao: 1 }).select('id_entrega nome_cliente bairro situacao vendedor observacao hora_entrega data_entrega -_id');
                res.status(200).json(entregas);
            } catch (error) {
                console.error('Erro ao obter entregas', error);
                next(error);
            }
        }

        if (tipo =='operador'){
            const { situacao, id_veiculo } = req.params;
            try {
                const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro hora_entrega data_entrega observacao situacao -_id');
                res.status(200).json(entregas);
            } catch (error) {
                console.error('Erro ao obter entregas', error);
                next(error);
            }
        }

        if (tipo =='operador2'){
            const { situacao, id_veiculo } = req.params;
            try {
                const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro hora_entrega data_entrega observacao situacao -_id');
                res.status(200).json(entregas);
            } catch (error) {
                console.error('Erro ao obter entregas', error);
                next(error);
            }
        }
    },
    /*async getAllEntregasFilterUser(req, res, next) {
        try {
            const entregas = await Entrega.find({ situacao: { $in: ['Aguardando', 'Em andamento'] }}).sort({ situacao: 1 }).select('id_entrega nome_cliente bairro situacao vendedor observacao hora_entrega data_entrega -_id');
            res.status(200).json(entregas);
        } catch (error) {
            console.error('Erro ao obter entregas', error);
            next(error);
        }
    },

    async getAllEntregasFilterOperador(req, res, next) {
        const { situacao, id_veiculo } = req.params;
        try {
            const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro hora_entrega data_entrega observacao situacao -_id');
            res.status(200).json(entregas);
        } catch (error) {
            console.error('Erro ao obter entregas', error);
            next(error);
        }
    },

    async getAllEntregasFilterOperador1(req, res, next) {
        const { situacao, id_veiculo } = req.params;
        try {
            const entregas = await Entrega.find({ situacao, id_veiculo }).select('id_entrega nome_cliente bairro -_id');
            res.status(200).json(entregas);
        } catch (error) {
            console.error('Erro ao obter entregas', error);
            next(error);
        }
    },*/

    async getLeastEntregues(req, res, next) {
        try {
            const entregas = await Entrega.find({ situacao: { $in: 'Entregue'}}).limit(40).select('id_entrega nome_cliente bairro situacao vendedor observacao -_id');
            res.status(200).json(entregas);
        } catch (error) {
            console.error('Erro ao obter entregas', error);
            next(error);
        }
    },

    async getEntregaById(req, res, next) {
        const id_entrega = req.params.id_entrega;
        try {
            const entrega = await Entrega.findOne({id_entrega:id_entrega});
            if (entrega) {
                res.status(200).json(entrega);
            } else {
                const erro = new Error("Entrega não encontrada");
                erro.status = 404;
                return next(erro);
            }
        } catch (error) {
            console.error('Erro ao obter entrega', error);
            next(error);
        }
    },

    async createEntrega(req, res) {
        const { id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor } = req.body;
        try {
            const aux = Entrega.findOne({id_entrega:id_entrega});
            if(aux){
                const erro = new Error ("Entrega já cadastrada");
                return next(erro);
            }
            else{
                const entrega = new Entrega ({ id_entrega, id_veiculo, nome_cliente, bairro, situacao, data_entrega, hora_entrega, observacao, vendedor });
                await entrega.save();
                res.status(201).json(entrega);
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar entrega.' });
        }
    },

    async deleteEntrega(req, res, next) {
        const id_entrega = req.params.id;
        try {
            const entrega = await Entrega.findByIdAndDelete(id_entrega);
            res.send(entrega);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir entrega.' });
        }
    },

    async updateEntrega(req, res, next) {
        const { id_entrega } = req.params;
        try {
            const updatedEntrega = await Entrega.findOneAndUpdate({ id_entrega: id_entrega }, req.body, { new: true });
            if (updatedEntrega) {
                res.status(200).json(updatedEntrega);
            } else {
                res.status(404).json({ error: 'Entrega não encontrada ou sem alterações.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
        }
    },

    async updateVeiculoEntrega(req, res, next) {
        const { id_entrega, id_veiculo, situacao } = req.params;
        try {
            const updatedEntrega = await Entrega.findOneAndUpdate({ id_entrega: id_entrega }, { id_veiculo, situacao }, { new: true });
            if (updatedEntrega) {
                res.status(200).json(updatedEntrega);
            } else {
                res.status(404).json({ error: 'Entrega não encontrada ou sem alterações.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar Entrega.' });
        }
    },
};