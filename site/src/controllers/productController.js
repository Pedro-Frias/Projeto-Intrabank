var productModel = require("../models/productModel");


function listProduct(req, res) {
    productModel.listProduct().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function cadastrar(req, res) {
    var nome = req.body.nome;
    var categoria = req.body.categoria;
    var preco = req.body.preco;
    var regiao = req.body.regiao;

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    }else if (regiao == undefined) {
        res.status(403).send("A regiao do cliente está indefinido!");
    }
     else if (categoria == undefined) {
        res.status(403).send("A categoria do usuário está indefinido!");
    }
     else if (preco == undefined) {
        res.status(403).send("O cpf do usuário está indefinido!");
    }
     else {
        productModel.cadastrar(nome,categoria,preco,regiao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deleteProduct(req, res) {
    var id = req.params.idProduct;

    productModel.deleteProduct(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function updateProduct(req, res) {
    var newName = req.body.nome;
    var newCategoria = req.body.categoria;
    var newPreco = req.body.preco;
    var newRegiao = req.body.regiao;
    var idProduto = req.params.idProduto;
    console.log(`ola: ${idProduto} `);

    productModel.updateProduct(newName, newCategoria, newPreco ,newRegiao, idProduto)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}


module.exports = {
    cadastrar,
    listProduct,
    deleteProduct,
    updateProduct
}