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

CREATE TABLE adversario(
idAdversario INT PRIMARY KEY AUTO_INCREMENT,
timeAdversario VARCHAR(45)
);


CREATE TABLE partida(
idPartida INT AUTO_INCREMENT, 
fkUsuario INT,
fkAdversario INT,
timeUsuario VARCHAR(45),
golsUsuario INT,
golsAdversario INT,
chutesUsuario INT,
chutesAdversario INT,
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
SELECT p.idPartida,
		u.nome AS 'Nome Usuario', 
        concat('Usuario: ', p.timeUsuario, ' ', p.golsUsuario , ' X '   , p.golsAdversario , ' Adversario: ' , a.timeAdversario) AS Partida,
        CASE
        WHEN p.golsUsuario > p.golsAdversario
        THEN concat(p.timeUsuario , ' Venceu')
        ELSE concat(a.timeAdversario , ' Venceu')
        END AS Resultado
        FROM partida AS p
        JOIN usuario AS u ON u.idUsuario = p.fkUsuario
        JOIN adversario AS a ON a.idAdversario = p.fkAdversario;
        
        
SELECT * FROM vw_resultadoPartida; 