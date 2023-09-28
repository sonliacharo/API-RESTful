create database pdv;

create table usuarios (
	id serial primary key,
  	nome text not null,
  	email varchar(100) unique,
  	senha text
);

create table categorias (
	id serial primary key,
  	descricao text not null
);

insert into 
categorias (descricao) 
values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');
