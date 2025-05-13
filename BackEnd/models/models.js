const conexao = require('../config/db');
const executeQuery = require('../database/query')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Colaboradores = {
    registrarUsuario: async (nome, sobrenome, email,usuario, senha, data_criacao) => {
        try {
            const password = await bcrypt.hash(senha, 10)
            return await executeQuery(
                'INSERT INTO cadastroUser (nome, sobrenome, email,usuario, senha,data_criacao) VALUES(?,?,?,?,?,?)', [nome, sobrenome, email,usuario, password, data_criacao]
            )
        }
        catch (error) {
            throw error;
        }
    },
    autenticacao: async (usuario, senha) => {
        try {
            const consulta = await Colaboradores.getUsuario(usuario);

            if (consulta.length > 0) {
                //comparar as senhas
                //senha = senha do login que vem pelo post consulta[0].senha = ao objeto do banco 
                const match = await bcrypt.compare(senha, consulta[0].senha)

                if (match) {
                    const token = jwt.sign(
                        //informações do usuario no banco
                        { id: consulta[0].id, email: consulta[0].email, nome: consulta[0].nome },
                        //assinatura com a chave secreta
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    //retorno do token e da regra do usuario
                    return { token, nome: consulta[0].nome, sobrenome: consulta[0].sobrenome,email: consulta[0].email,usuario: consulta[0].usuario,};

                }
                return null;
            }
            return
        }
        catch (error) {
            throw error;
        }
    },

    getUsuario: async (usuario) => {
        return await executeQuery(
            'SELECT id, nome, sobrenome, email,senha,usuario FROM cadastroUser WHERE usuario = ?', [usuario]  // Parâmetro correto como array
        );
    },
    getEmail: async (email) => {
        return await executeQuery(
            'SELECT id, email, senha,nome FROM cadastroUser WHERE email = ?', [email]  // Parâmetro correto como array
        );
    },

 

};
module.exports = Colaboradores;
