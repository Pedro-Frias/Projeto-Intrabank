function deleteProduct(idProduct) {
    console.log("Criar função de apagar post escolhido - ID" + idProduct);

    fetch(`/Product/deletar/${idProduct}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            alert("Produto comprado!")
            setTimeout(() => {
                window.location = "Product.html"
            }, "2000")
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        } ''
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}
