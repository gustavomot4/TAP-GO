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
idPartida INT, 
fkUsuario INT,
fkAdversario INT,
timeUsuario VARCHAR(45),
PRIMARY KEY (idPartida, fkUsuario, fkAdversario),
CONSTRAINT fkUsuarioPartida FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
CONSTRAINT fkAdversarioPartida FOREIGN KEY (fkAdversario) REFERENCES adversario(idAdversario)
);

CREATE TABLE chute(
    idChute INT AUTO_INCREMENT PRIMARY KEY,
    fkPartida INT,
    fkUsuario INT,
    fkAdversario INT,
    posicaoChute VARCHAR(10),
    resultadoChute VARCHAR(10),
    CONSTRAINT fkPartidaChute FOREIGN KEY (fkPartida) REFERENCES partida(idPartida),
    CONSTRAINT fkUsuarioChute FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fkAdversarioChute FOREIGN KEY (fkAdversario) REFERENCES adversario(idAdversario),
    CONSTRAINT chk_posicao CHECK (posicaoChute IN ('esquerda','meio','direita')),
    CONSTRAINT chk_resultado CHECK (resultadoChute IN ('gol','defesa'))
);


SELECT * FROM usuario;
SELECT * FROM adversario;
SELECT * FROM partida;
SELECT * FROM chute;

INSERT INTO adversario (timeAdversario) values
('São Paulo'),
('Corinthians'),
('Palmeiras'),
('Santos'),
('Ponte Preta'),
('Guarani'),
('Juventus da Mooca'),
('Meninos do Morro');


SELECT idPartida FROM partida 
WHERE fkUsuario = 1
ORDER BY idPartida DESC
LIMIT 1;

