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
                            p.golsAdversarioEsquerda, p.golsAdversarioMeio , golsAdversarioDireita
	                    FROM partida AS p
                        JOIN adversario AS a ON a.idAdversario = p.fkAdversario
	WHERE fkUsuario = ${idUsuario}
	ORDER BY idPartida DESC
	LIMIT 5`;
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
    buscarUltimoIDPartida,
    buscarUltimo5Jogos,
    cadastrar
};