var database = require("../database/config")

function buscarUltimoIDPartida(idUsuario) {

    var instrucaoSql = `SELECT idPartida FROM partida 
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC
                    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(idPartida, fkUsuario, fkAdversario, timeUsuario) {

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO partida (idPartida ,fkUsuario, fkAdversario, timeUsuario) VALUES ('${idPartida}','${fkUsuario}', '${fkAdversario}', '${timeUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimoIDPartida,
    cadastrar
};