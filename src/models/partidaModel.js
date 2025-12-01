var database = require("../database/config")

function buscarUltimoIDPartida(idUsuario) {

    var instrucaoSql = `SELECT idPartida FROM partida 
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY idPartida DESC
                    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarUltimo5Jogos(idUsuario) {
    var instrucaoSql = `SELECT p.idPartida, p.timeUsuario, a.timeAdversario, p.golsUsuarioEsquerda , p.golsUsuarioMeio , p.golsUsuarioDireita,
                            p.golsAdversarioEsquerda, p.golsAdversarioMeio , p.golsAdversarioDireita
	                    FROM partida AS p
                        JOIN adversario AS a ON a.idAdversario = p.fkAdversario
	                    WHERE fkUsuario = ${idUsuario}
	                    ORDER BY idPartida DESC
	                    LIMIT 5`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


function buscarTodosJogos(idUsuario) {
    var instrucaoSql = `SELECT p.idPartida, p.timeUsuario, a.timeAdversario, 
                            p.golsUsuarioEsquerda , p.golsUsuarioMeio , p.golsUsuarioDireita,
                            p.golsAdversarioEsquerda, p.golsAdversarioMeio , p.golsAdversarioDireita,
                            p.chutesUsuarioEsquerda, p.chutesUsuarioMeio, p.chutesUsuarioDireita,
                            p.chutesAdversarioEsquerda, p.chutesAdversarioMeio, p.chutesAdversarioDireita
	                    FROM partida AS p
                        JOIN adversario AS a ON a.idAdversario = p.fkAdversario
	WHERE fkUsuario = ${idUsuario}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


function buscarTimeFavorito(idUsuario) {
    var instrucaoSql = `SELECT p.timeUsuario,
                            COUNT(*) AS vezes
                        FROM partida AS p
                        WHERE p.fkUsuario = ${idUsuario}
                        GROUP BY p.timeUsuario
                        ORDER BY vezes DESC
                        LIMIT 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}


function buscarAdversarioMaisEnfrentado(idUsuario) {
    var instrucaoSql = `SELECT a.timeAdversario,
                        COUNT(*) AS vezes
                        FROM partida AS p
                        JOIN adversario AS a ON a.idAdversario = p.fkAdversario
                        WHERE p.fkUsuario = ${idUsuario}
                        GROUP BY a.timeAdversario
                        ORDER BY vezes DESC
                        LIMIT 1`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
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
    melhoresJogadores,
    buscarUltimoIDPartida,
    buscarUltimo5Jogos,
    buscarTodosJogos,
    buscarTimeFavorito,
    buscarAdversarioMaisEnfrentado,
    cadastrar
};