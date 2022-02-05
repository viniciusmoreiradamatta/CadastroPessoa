create schema cadastropessoa;

ALTER TABLE IF EXISTS docker.pessoa
    OWNER to cadastropessoa;


create table cadastropessoa.pessoa(
    Id integer not null generated always as IDENTITY,
    Nome varchar(50), 
    Sobrenome varchar(100),
    Nacionalidade varchar(20), 
    CEP varchar(8),
    Estado varchar(2), 
    Cidade varchar(50), 
    Logradouro varchar(50), 
    Email varchar(50),
    Telefone varchar(13));

INSERT INTO cadastropessoa.pessoa(
	 nome, sobrenome, nacionalidade, cep, estado, cidade, logradouro, email, telefone)
	VALUES ( 'pessoa 01', 'sobrenome', 'brasileira', '79977788', 'Uf', 'cidade', 'logradouro', 'pessoa@email.com', '5599999999999');
	
	
INSERT INTO cadastropessoa.pessoa(
	 nome, sobrenome, nacionalidade, cep, estado, cidade, logradouro, email, telefone)
	VALUES ( 'pessoa 02', 'sobrenome', 'brasileira', '79977744', 'Uf', 'cidade', 'logradouro', 'pessoa2@email.com', '5599999999999');
	