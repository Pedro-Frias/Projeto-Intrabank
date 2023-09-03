var express = require("express");
var router = express.Router();

var sellerController = require("../controllers/sellerController");

router.post("/cadastrar/", function (req, res) {
    sellerController.cadastrar(req, res);
});


router.get("/listSeller/", function (req, res) {
    sellerController.listSeller(req, res);
});

router.delete("/deletar/:idSeller", function (req, res) {
    sellerController.deleteSeller(req, res);
});

router.put("/editar/:idVendedor", function (req, res) {
    sellerController.updateSeller(req, res);
});



module.exports = router;