var express = require("express");
var router = express.Router();

var clienteController = require("../controllers/clienteController");

router.post("/cadastrar/", function (req, res) {
    clienteController.cadastrar(req, res);
});


router.get("/listCustomer/", function (req, res) {
    clienteController.listCustomer(req, res);
});

router.delete("/deletar/:idCliente", function (req, res) {
    clienteController.deleteCustomer(req, res);
});

router.put("/editar/:idCliente", function (req, res) {
    clienteController.updateCustomer(req, res);
});



module.exports = router;