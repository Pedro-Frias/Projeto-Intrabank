var express = require("express");
var router = express.Router();

var estoqueController = require("../controllers/estoqueController");

router.get("/listEstoque/", function (req, res) {
    estoqueController.listEstoque(req, res);
});



module.exports = router;