create table cadastroUser(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome varchar(150) NOT NULL,
    sobrenome varchar(150) NOT NULL,
    email varchar(150) NOT NULL,
    usuario varchar(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

