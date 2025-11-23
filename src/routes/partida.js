var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

router.get("/ultimas/:idUsuario", function (req, res) {
    partidaController.buscarUltimoIDPartida(req, res);
});

router.get("/ultimosJogos/:idUsuario", function (req, res) {
    partidaController.buscarUltimo5Jogos(req, res);
});

router.get("/todosJogos/:idUsuario", function (req, res) {
    partidaController.buscarTodosJogos(req, res);
});

router.get("/timeFavorito/:idUsuario", function (req, res) {
    partidaController.buscarTimeFavorito(req, res);
});

router.get("/AdversarioMaisEnfrentado/:idUsuario", function (req, res) {
    partidaController.buscarAdversarioMaisEnfrentado(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    partidaController.cadastrar(req, res);
})

module.exports = router;