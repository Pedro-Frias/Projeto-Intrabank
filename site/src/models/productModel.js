var database = require("../database/config");

function cadastrar(nome, categoria,preco, regiao) {
    var instrucao = `
        INSERT INTO produto (nomeProduto, categoria, precoProduto, fkProduto) VALUES ('${nome}', '${categoria}','${preco}', '${regiao}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listProduct() {
    var instrucao = `
    SELECT * FROM produto left join estoque on idEstoque = fkProduto;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deleteProduct(id) {
    var instrucao = `
       DELETE FROM produto where idProduto = ${id} `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateProduct(name, categoria, preco, regiao, idProduto) {
    console.log("ACESSEI O TAREFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ");
    var instrucao = `
    UPDATE produto SET nomeProduto = '${name}' , categoria = '${categoria}' , precoProduto = '${preco}', fkProduto = '${regiao}'  WHERE idProduto = ${idProduto};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrar,
    listProduct,
    deleteProduct,
    updateProduct
}