var partidaModel = require("../models/partidaModel");

function buscarUltimoIDPartida(req, res) {
    var idUsuario = req.params.idUsuario;

    partidaModel.buscarUltimoIDPartida(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o id da ultima partida.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
    console.log("BODY RECEBIDO:", req.body);

    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idPartida = req.body.idPartidaServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var fkAdversario = req.body.fkAdversarioServer;
    var timeUsuario = req.body.timeUsuarioServer;
    // Faça as validações dos valores

    if (idPartida == undefined) {
        res.status(400).send("Partida está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Usuario está undefined!");
    } else if (fkAdversario == undefined) {
        res.status(400).send("Adversario está undefined!");
    } else if (timeUsuario == undefined) {
        res.status(400).send("Usuario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        partidaModel.cadastrar(idPartida ,fkUsuario, fkAdversario, timeUsuario)
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
    buscarUltimoIDPartida,
    cadastrar
}