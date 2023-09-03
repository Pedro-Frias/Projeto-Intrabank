var database = require("../database/config");

function cadastrar(nome, cpf,contato, uf) {
    var instrucao = `
        INSERT INTO vendedor (nomeVendedor, cpf, contato, uf) VALUES ('${nome}', '${cpf}','${contato}', '${uf}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listSeller() {
    var instrucao = `
       SELECT * FROM vendedor;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deleteSeller(id) {
    var instrucao = `
       DELETE FROM vendedor where idVendedor = ${id} `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateSeller(name, cpf, contato, uf, idVendedor) {
    console.log("ACESSEI O TAREFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", name, cpf, uf, idVendedor);
    var instrucao = `
    UPDATE vendedor SET nomeVendedor = '${name}' , cpf = '${cpf}' , contato = '${contato}', UF = '${uf}'  WHERE idVendedor = ${idVendedor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrar,
    listSeller,
    deleteSeller,
    updateSeller
}