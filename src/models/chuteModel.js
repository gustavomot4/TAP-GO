var database = require("../database/config");

function cadastrar(fkPartida, fkUsuario, fkAdversario, posicaoChute, resultadoChute) {

    if (fkUsuario === null) {
        fkUsuario = "NULL";
    }

    if (fkAdversario === null) {
        fkAdversario = "NULL";
    }

    var instrucaoSql = `
        INSERT INTO chute 
        (fkPartida, fkUsuario, fkAdversario, posicaoChute, resultadoChute)
        VALUES (${fkPartida}, ${fkUsuario}, ${fkAdversario}, '${posicaoChute}', '${resultadoChute}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
