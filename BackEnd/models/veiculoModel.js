const executeQuery = require('../database/query');
const conexao = require('../config/db');

const Veiculo = {
    registrarVeiculo : async (marca,modelo,ano, preco,cor) =>{
        return await executeQuery(
            'INSERT INTO veiculo (marca,modelo,ano, preco,cor) VALUES(?,?,?,?,?)',
            [marca,modelo,ano, preco,cor]
        );
    },
    async buscarVeiculo() {
        try {
            const [veiculo] = await conexao.query(
                "SELECT * FROM veiculo"
            );
            return veiculo;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Erro ao listar veiculos: ${error.message}`);
        }
    },
    async listaId(id) {
        try {
            const [veiculo] = await conexao.query(
                "SELECT * FROM veiculo WHERE id=?", [id]
            );
            return veiculo
        }
        catch (error) {
            console.log(error);
            throw new Error(`Erro ao encontrar o id desse veiculo: ${error.message}`);
        }
    },
    async deletar (id) {
        try{
            const [result] = await conexao.query(
                "DELETE FROM veiculo WHERE id = ?", [id])
                return result;
        }
        catch(error){
            console.log(error);
            throw new Error(`Erro ao deletar veiculo: ${error.message}`);
        }
    },
    async atualizar(marca, modelo, ano, preco, cor, id) { 
        try {
            const [result] = await conexao.query(
                "UPDATE veiculo SET marca=?, modelo=?, ano=?, preco=?, cor=? WHERE id=?",
                [marca, modelo, ano, preco, cor, id]  
            );
            return result;
        } catch(error) {
            console.log(error);
            throw new Error(`Erro ao atualizar o veiculo: ${error.message}`);
        }
    }
    
};

module.exports = Veiculo;