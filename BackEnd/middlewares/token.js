//Função que realiza a verificação e validação do token de acesso
const jwt = require('jsonwebtoken');
//variaveis de ambiente = informações sigilosas
require('dotenv').config();

const verificarToken = (req,res,next)=>{
    //verificar se token chegou no cabeçalho
    const header = req.header('authorization');

    if(!header)
        return res.status(401).json({msg:"Acesso negado. Token não fornecido"})
                         //quebra o objeto
    const token = header.split(' ')[1];//separar o objeto

    if(!token)
        return res.status(401).json({msg:"Acesso negado. Token não fornecido"})

    try{
        const verificar = jwt.verify(token,process.env.JWT_SECRET);

        req.user = verificar;//adiciona as informações do usuario req.user

        next();//chama a proxima etapa do processo a ser executada
    }
    catch(erro){
        res.status(400).json({msg:"Token inválido"});
    }
};
module.exports = verificarToken;