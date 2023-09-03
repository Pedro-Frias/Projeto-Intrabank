var database = require("../database/config");


function listEstoque() {
    var instrucao = `
    SELECT
    e.regiaoEstoque AS Regiao,
    p.nomeProduto AS NomeProduto,
    p.categoria AS Categoria,
    COUNT(*) AS Quantidade
FROM
    produto p
INNER JOIN
    estoque e ON p.fkProduto = e.idEstoque
GROUP BY
    e.regiaoEstoque,
    p.nomeProduto,
    p.categoria;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listEstoque,
}