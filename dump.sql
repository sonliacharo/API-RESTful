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

create table produtos (
	id serial primary key,
  	descricao text not null,
  	quantidade_estoque integer not null,
  	valor numeric(10,2) not null,
  	categoria_id integer references categorias(id)
);

create table clientes (
	id serial primary key,
  	nome varchar(50) not null,
  	email varchar(50) unique,
  	cpf char (11) unique not null,
  	cep char (8),
  	rua varchar(50),
  	numero varchar (10),
  	bairro varchar(50),
  	cidade varchar(50),
  	estado varchar(50)
);

create table pedidos (
	id serial primary key,
  	cliente_id integer references clientes(id),
  	observacao text,
  	valor_total numeric(10,2) not null
);

create table pedido_produtos (
	id serial primary key,
  	pedido_id integer references pedidos(id),
  	produto_id integer references produtos(id),
  	quantidade_produto integer not null,
  	valor_produto numeric(10,2) not null
);

alter table
produtos 
add column
produto_imagem varchar(255);

