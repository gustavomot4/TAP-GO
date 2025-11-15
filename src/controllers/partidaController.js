var partidaModel = require("../models/partidaModel");

function cadastrar(req, res) {
    console.log("BODY RECEBIDO:", req.body);

    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkAdversario = req.body.fkAdversarioServer;
    var timeUsuario = req.body.timeUsuarioServer;
    var golsUsuario = req.body.golsUsuarioServer;
    var golsAdversario = req.body.golsAdversarioServer;
    var chutesUsuario = req.body.chutesUsuarioServer;
    var chutesAdversario = req.body.chutesAdversarioServer;

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Usuario está undefined!");
    } else if (fkAdversario == undefined) {
        res.status(400).send("Adversario está undefined!");
    } else if (timeUsuario == undefined) {
        res.status(400).send("Adversario está undefined!");
    } else if (golsUsuario == undefined) {
        res.status(400).send("Gols Usuario está undefined!");
    } else if (golsAdversario == undefined) {
        res.status(400).send("Gols Adversario está undefined!");
    } else if (chutesUsuario == undefined) {
        res.status(400).send("Chutes Usuario está undefined!");
    } else if (chutesAdversario == undefined) {
        res.status(400).send("Chutes Adversario está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        partidaModel.cadastrar(fkUsuario, fkAdversario, timeUsuario, golsUsuario, golsAdversario, chutesUsuario, chutesAdversario)
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