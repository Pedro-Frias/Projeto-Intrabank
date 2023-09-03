var express = require("express");
var router = express.Router();

var productController = require("../controllers/productController");

router.post("/cadastrar/", function (req, res) {
    productController.cadastrar(req, res);
});


router.get("/listProduct/", function (req, res) {
    productController.listProduct(req, res);
});

router.delete("/deletar/:idProduct", function (req, res) {
    productController.deleteProduct(req, res);
});

router.put("/editar/:idProduto", function (req, res) {
    productController.updateProduct(req, res);
});



module.exports = router;