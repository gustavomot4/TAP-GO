var database = require("../database/config")

function buscarUltimoIDPartida(idUsuario) {

    var instrucaoSql = `SELECT idPartida FROM partida 
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC
                    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar(
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
) {

    var instrucaoSql = `
        INSERT INTO partida (
            idPartida, fkUsuario, fkAdversario, timeUsuario,
            chutesUsuarioEsquerda, chutesUsuarioMeio, chutesUsuarioDireita,
            golsUsuarioEsquerda, golsUsuarioMeio, golsUsuarioDireita,
            chutesAdversarioEsquerda, chutesAdversarioMeio, chutesAdversarioDireita,
            golsAdversarioEsquerda, golsAdversarioMeio, golsAdversarioDireita
        ) VALUES (
            ${idPartida}, 
            ${fkUsuario}, 
            ${fkAdversario}, 
            '${timeUsuario}',
            ${chutesUsuarioEsquerda},
            ${chutesUsuarioMeio},
            ${chutesUsuarioDireita},
            ${golsUsuarioEsquerda},
            ${golsUsuarioMeio},
            ${golsUsuarioDireita},
            ${chutesAdversarioEsquerda},
            ${chutesAdversarioMeio},
            ${chutesAdversarioDireita},
            ${golsAdversarioEsquerda},
            ${golsAdversarioMeio},
            ${golsAdversarioDireita}
        );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimoIDPartida,
    cadastrar
};