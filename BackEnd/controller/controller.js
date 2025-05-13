const clienteModel = require('../models/models');
const verificarData = require('../src/moment');

const clienteController = {

    getRoot:async(req,res)=>{
        try{
            res.status(200).send("API online");
        }
        catch(erro){
            res.status(500).json({msg:"Erro no servidor"})
        }
    },
    cadastroUsuario: async (req, res) => {
        let dataFormatada = null;
        const { nome, sobrenome, email,usuario, senha,data_criacao } = req.body;

        try {

            const emailExistente = await clienteModel.getEmail(email);
            if (emailExistente.length > 0) {
                return res.status(400).json({ msg: "Cadastro duplicado" });
            }
            else {
                await clienteModel.registrarUsuario(
                    nome, sobrenome, email,usuario, senha,data_criacao
                );
                res.status(201).json({ msg: "Funcionário cadastrado com sucesso!" });

            }
            if(data_criacao){
                dataFormatada = verificarData(data_criacao);
                if(!dataFormatada)
                return res.status(400).json({
                    mensagem:"Data inválida. Use o formato DD/MM/YYYY OU YYYY-MM-DD"
                });
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            res.status(500).json({
                msg: "Erro interno no servidor",
                detalhes: error.message
            });
        }
    },
    autenticacao: async (req, res) => {
        const { usuario, senha } = req.body;

        try {
            const resultado = await clienteModel.autenticacao(usuario, senha)

            if (!resultado) {
                return res.status(401).json({ msg: "Usuario ou senha incorretos" })
            }
            else {
                res.status(200).json({ token: resultado });
            }
        }
        catch (error) {
            res.status(500).json({ msg: "Erro no servidor" })
            console.log(error)

        }
    },

    //controller para verificar se o email existe
    verificarEmail: async(req,res)=>{
        const{email}=req.body

        console.log(req.body);
        
        try{
            const consulta = await clienteModel.getEmail(email);

            if(consulta.length > 0){
                res.status(200).json({msg:"sucesso"})
            }
            else{
                res.status(404).json({msg:"falha na consulta"})
            }
        }
        catch(erro){
            res.status(500).json({msg:"Erro no servidor"})
        }

    },

    //controlle para atualizar senha do funcionario
    
};

module.exports = clienteController;

