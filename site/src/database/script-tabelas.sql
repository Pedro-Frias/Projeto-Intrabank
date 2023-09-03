create table estoque(
	idEstoque int primary key auto_increment,
    regiaoEstoque varchar(245)
);

Create table produto (
	idProduto int primary key auto_increment,
    nomeProduto varchar(245) not null,
    categoria varchar(100) not null,
    precoProduto int not null,
    fkProduto int , constraint chkEstoque foreign key(fkProduto) references estoque(idEstoque)
);

create table cliente (
	idCliente int primary key auto_increment,
    nomeCliente varchar(245) not null,
    cpf char(15)not null,
    UF char(2) not null
);

create table vendedor(
	idVendedor int primary key auto_increment,
    nomeVendedor varchar(245)not null,
    cpf char(15)not null,
    contato char(15)not null,
    UF char(2)not null
);
