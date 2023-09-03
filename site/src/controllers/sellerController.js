var sellerModel = require("../models/sellerModel");


function listSeller(req, res) {
    sellerModel.listSeller().then(function (resultado) {
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
    var contato = req.body.contato;
    var uf = req.body.uf;

    if (nome == undefined) {
        res.status(400).send("O nome está indefinido!");
    }else if (uf == undefined) {
        res.status(403).send("A uf do cliente está indefinido!");
    }
     else if (cpf == undefined) {
        res.status(403).send("O cpf do usuário está indefinido!");
    }
     else if (contato == undefined) {
        res.status(403).send("O cpf do usuário está indefinido!");
    }
     else {
        sellerModel.cadastrar(nome,cpf,contato,uf)
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

function deleteSeller(req, res) {
    var id = req.params.idSeller;

    sellerModel.deleteSeller(id)
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

function updateSeller(req, res) {
    var newName = req.body.nome;
    var newCpf = req.body.cpf;
    var newContato = req.body.contato;
    var newUf = req.body.uf;
    var idVendedor = req.params.idVendedor;
    console.log(`ola: ${idVendedor} `);

    sellerModel.updateSeller(newName, newCpf, newContato ,newUf, idVendedor)
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
    listSeller,
    deleteSeller,
    updateSeller
}