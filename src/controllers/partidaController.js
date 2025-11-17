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

    // Pegando todos os dados enviados pelo frontend
    var idPartida = req.body.idPartidaServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var fkAdversario = req.body.fkAdversarioServer;
    var timeUsuario = req.body.timeUsuarioServer;

    var chutesUsuarioEsquerda = req.body.chutesUsuarioEsquerdaServer;
    var chutesUsuarioMeio = req.body.chutesUsuarioMeioServer;
    var chutesUsuarioDireita = req.body.chutesUsuarioDireitaServer;

    var golsUsuarioEsquerda = req.body.golsUsuarioEsquerdaServer;
    var golsUsuarioMeio = req.body.golsUsuarioMeioServer;
    var golsUsuarioDireita = req.body.golsUsuarioDireitaServer;

    var chutesAdversarioEsquerda = req.body.chutesAdversarioEsquerdaServer;
    var chutesAdversarioMeio = req.body.chutesAdversarioMeioServer;
    var chutesAdversarioDireita = req.body.chutesAdversarioDireitaServer;

    var golsAdversarioEsquerda = req.body.golsAdversarioEsquerdaServer;
    var golsAdversarioMeio = req.body.golsAdversarioMeioServer;
    var golsAdversarioDireita = req.body.golsAdversarioDireitaServer;

    // Validações básicas
    if (idPartida == undefined) {
        res.status(400).send("Partida está undefined!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("Usuario está undefined!");
    } else if (fkAdversario == undefined) {
        res.status(400).send("Adversario está undefined!");
    } else if (timeUsuario == undefined) {
        res.status(400).send("timeUsuario está undefined!");
    } else {

        // Envia os 16 parâmetros para o model
        partidaModel.cadastrar(
            idPartida,
            fkUsuario,
            fkAdversario,
            timeUsuario,

            chutesUsuarioEsquerda,
            chutesUsuarioMeio,
            chutesUsuarioDireita,

            golsUsuarioEsquerda,
            golsUsuarioMeio,
            golsUsuarioDireita,

            chutesAdversarioEsquerda,
            chutesAdversarioMeio,
            chutesAdversarioDireita,

            golsAdversarioEsquerda,
            golsAdversarioMeio,
            golsAdversarioDireita
        ).then(
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
};
