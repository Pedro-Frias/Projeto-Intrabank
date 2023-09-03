var database = require("../database/config");

function cadastrar(nome, cpf, uf) {
    var instrucao = `
        INSERT INTO cliente (nomeCliente, cpf , uf) VALUES ('${nome}', '${cpf}', '${uf}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listCustomer() {
    var instrucao = `
       SELECT * FROM cliente;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deleteCustomer(id) {
    var instrucao = `
       DELETE FROM cliente where idCliente = ${id} `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateCustomer(name, cpf, uf, idCliente) {
    console.log("ACESSEI O TAREFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", name, cpf, uf);
    var instrucao = `
    UPDATE cliente SET nomeCliente = '${name}' , cpf = '${cpf}' , UF = '${uf}'  WHERE idCLiente = ${idCliente};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrar,
    listCustomer,
    deleteCustomer,
    updateCustomer
}