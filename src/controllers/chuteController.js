var chuteModel = require("../models/chuteModel");

function cadastrar(req, res) {
    console.log("BODY RECEBIDO:", req.body);

    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkPartida = req.body.fkPartidaServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var fkAdversario = req.body.fkAdversarioServer;
    var posicaoChute = req.body.posicaoChuteServer;
    var resultadoChute = req.body.resultadoChuteServer;

    console.log(posicaoChute)
    console.log(resultadoChute)

    // Faça as validações dos valores
    if (fkPartida == undefined) {
        res.status(400).send("Usuario está undefined!");
    } else if (posicaoChute == undefined) {
        res.status(400).send("Posicao Chute está undefined!");
    } else if( resultadoChute == undefined){
        res.status(400).send("Resultado Chute está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        chuteModel.cadastrar(fkPartida,fkUsuario, fkAdversario, posicaoChute , resultadoChute )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}