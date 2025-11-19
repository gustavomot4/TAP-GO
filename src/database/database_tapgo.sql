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



-- buscar os ultimos 5 dados das partidas
CREATE VIEW vw_ultimos_5_dados_partidas_do_usuario AS 
SELECT p.idPartida, p.timeUsuario, a.timeAdversario, p.golsUsuarioEsquerda , p.golsUsuarioMeio , p.golsUsuarioDireita,
		p.golsAdversarioEsquerda, p.golsAdversarioMeio , golsAdversarioDireita
	FROM partida AS p
	JOIN adversario AS a ON a.idAdversario = p.fkAdversario
	WHERE fkUsuario = 1
	ORDER BY idPartida DESC
	LIMIT 5;
    
    
-- puxar todos os dados de todas partidas do usuarios
CREATE VIEW vw_todos_dados_partidas_do_usuario AS
SELECT p.idPartida, p.timeUsuario, a.timeAdversario, p.golsUsuarioEsquerda , p.golsUsuarioMeio , p.golsUsuarioDireita,
		p.golsAdversarioEsquerda, p.golsAdversarioMeio , golsAdversarioDireita
	FROM partida AS p
	JOIN adversario AS a ON a.idAdversario = p.fkAdversario
	WHERE fkUsuario = 1;
    
    
-- time mais utilizado
CREATE VIEW vw_time_mais_utilizado_usuario AS
SELECT 
    p.timeUsuario,
    COUNT(*) AS vezes
FROM partida AS p
WHERE p.fkUsuario = 1
GROUP BY p.timeUsuario
ORDER BY vezes DESC
LIMIT 1;


-- adversario mais enfrentado
CREATE VIEW vw_time_mais_enfretado AS
SELECT 
    a.timeAdversario,
    COUNT(*) AS vezes
FROM partida AS p
JOIN adversario AS a ON a.idAdversario = p.fkAdversario
WHERE p.fkUsuario = 1
GROUP BY a.timeAdversario
ORDER BY vezes DESC
LIMIT 1;

SELECT * FROM vw_ultimos_5_dados_partidas_do_usuario;

SELECT * FROM  vw_todos_dados_partidas_do_usuario;

SELECT * FROM vw_todos_dados_partidas_do_usuario;

SELECT * FROM vw_time_mais_utilizado_usuario;

SELECT * FROM vw_time_mais_enfretado;
