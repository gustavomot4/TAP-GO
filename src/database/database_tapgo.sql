DROP DATABASE IF EXISTS tapgo;
CREATE DATABASE tapgo;
USE tapgo;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45) UNIQUE,
senha VARCHAR(45),
nivel INT DEFAULT 1
);

SELECT * FROM usuario;
CREATE TABLE adversario(
idAdversario INT PRIMARY KEY AUTO_INCREMENT,
timeAdversario VARCHAR(45)
);


CREATE TABLE partida(
idPartida INT AUTO_INCREMENT, 
fkUsuario INT,
fkAdversario INT,
timeUsuario VARCHAR(45),

chutesUsuarioEsquerda INT,
chutesUsuarioMeio INT,
chutesUsuarioDireita INT,
golsUsuarioEsquerda INT,
golsUsuarioMeio INT,
golsUsuarioDireita INT,

chutesAdversarioEsquerda INT,
chutesAdversarioMeio INT,
chutesAdversarioDireita INT,
golsAdversarioEsquerda INT,
golsAdversarioMeio INT,
golsAdversarioDireita INT,

PRIMARY KEY (idPartida, fkUsuario, fkAdversario),
CONSTRAINT fkUsuarioPartida FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
CONSTRAINT fkAdversarioPartida FOREIGN KEY (fkAdversario) REFERENCES adversario(idAdversario)
);

SELECT * FROM usuario;
SELECT * FROM adversario;
SELECT * FROM partida;

INSERT INTO adversario (timeAdversario) values
('São Paulo'),
('Corinthians'),
('Palmeiras'),
('Santos'),
('Ponte Preta'),
('Guarani'),
('Juventus da Mooca'),
('Meninos do Morro');


CREATE VIEW vw_resultadoPartida AS

SELECT 
    p.idPartida,
    u.nome AS nomeUsuario,
    p.timeUsuario,
    a.timeAdversario,
    
    SUM(p.chutesUsuarioEsquerda + p.chutesUsuarioMeio + p.chutesUsuarioDireita) AS totalChutesUsuario,
    SUM(p.golsUsuarioEsquerda + p.golsUsuarioMeio + p.golsUsuarioDireita) AS totalGolsUsuario,
    SUM(p.chutesAdversarioEsquerda + p.chutesAdversarioMeio + p.chutesAdversarioDireita) AS totalChutesAdversario,
    SUM(p.golsAdversarioEsquerda + p.golsAdversarioMeio + p.golsAdversarioDireita) AS totalGolsAdversario,

    CASE
        WHEN SUM(p.golsUsuarioEsquerda + p.golsUsuarioMeio + p.golsUsuarioDireita) >
             SUM(p.golsAdversarioEsquerda + p.golsAdversarioMeio + p.golsAdversarioDireita)
            THEN 'Usuário Venceu'
        WHEN SUM(p.golsUsuarioEsquerda + p.golsUsuarioMeio + p.golsUsuarioDireita) <
             SUM(p.golsAdversarioEsquerda + p.golsAdversarioMeio + p.golsAdversarioDireita)
            THEN 'Adversário Venceu'
        ELSE 'Empate'
    END AS resultado
    
FROM partida p
JOIN usuario u ON u.idUsuario = p.fkUsuario
JOIN adversario a ON a.idAdversario = p.fkAdversario

GROUP BY
    p.idPartida,
    u.nome,
    p.timeUsuario,
    a.timeAdversario;
    
SELECT * FROM vw_resultadoPartida; 

