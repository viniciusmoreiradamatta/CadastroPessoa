create schema cadastropessoa;

ALTER TABLE IF EXISTS docker.pessoa
    OWNER to cadastropessoa;


create table cadastropessoa.pessoa(
    Id integer not null generated always as IDENTITY,
    Nome varchar(50) not null, 
    Sobrenome varchar(100) not null,
    Nacionalidade varchar(20) not null, 
    CEP varchar(8) not null,
    Cpf varchar(11) not null,
    Estado varchar(2) not null, 
    Cidade varchar(50) not null, 
    Logradouro varchar(50) not null, 
    Email varchar(50) not null,
    Telefone varchar(13) not null);
