var clienteModel = require("../models/clienteModel");


function listCustomer(req, res) {
    clienteModel.listCustomer().then(function (resultado) {
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
    var cpf = req.body.cpf;
    var uf = req.body.uf;

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    }else if (uf == undefined) {
        res.status(403).send("A uf do cliente está indefinido!");
    }
     else if (cpf == undefined) {
        res.status(403).send("O cpf do usuário está indefinido!");
    }
     else {
        clienteModel.cadastrar(nome,cpf,uf)
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

function deleteCustomer(req, res) {
    var id = req.params.idCliente;

    clienteModel.deleteCustomer(id)
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

function updateCustomer(req, res) {
    var newName = req.body.nome;
    var newCpf = req.body.cpf;
    var newUf = req.body.uf;
    var idCliente = req.params.idCliente;


    clienteModel.updateCustomer(newName, newCpf, newUf,idCliente)
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
    listCustomer,
    deleteCustomer,
    updateCustomer
}