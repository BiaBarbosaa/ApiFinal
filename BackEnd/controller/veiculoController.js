const veiculoController = require('../models/veiculoModel');

const ControllerVeiculo = {

    criarNovoVeiculo: async(req, res) => {
        const {marca, modelo, ano, preco, cor} = req.body;
    
        try {
            await veiculoController.registrarVeiculo(marca, modelo, ano, preco, cor);
            res.status(201).json({msg: "Veículo cadastrado com sucesso"});
        }
        catch(erro) {
            console.error(erro);
            res.status(500).json({msg: "Erro no servidor"});
        }
    },
    async listarTodos(req, res) {
        try {
            const resultado = await veiculoController.buscarVeiculo();
            res.status(200).json(resultado);
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    },
    async listaId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ mensagem: 'ID inválido' });
            }

            const veiculo = await veiculoController.listaId(id);

            if (!veiculo) {
                return res.status(404).json({ mensagem: 'Veiculo não encontrado' });
            }

            res.status(200).json(veiculo);
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { marca, modelo, ano, preco, cor } = req.body;
            
            if (!id) {
                return res.status(400).json({ mensagem: 'ID inválido' });
            }
    
            const result = await veiculoController.atualizar(marca, modelo, ano, preco, cor, id);
            
            if (result.affectedRows > 0) {
                res.status(200).json({ mensagem: 'Atualizado com sucesso' });
            } else {
                res.status(404).json({ msg: "Veículo não encontrado" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ mensagem: error.message });
        }
    },
    async deletar(req, res) {
        try {
            const id = req.params.id;
            const result = await veiculoController.deletar(id);
           
            if (result.affectedRows > 0) {
                res.status(200).json({msg: "Deletado com sucesso"});
            } else {
                res.status(404).json({msg: "ID não existe no banco de dados"});
            }
        } catch(erro) {
            console.error("Erro ao deletar:", erro);
            res.status(500).json({msg: "Erro no servidor"});
        }
    }    


}

module.exports = ControllerVeiculo;