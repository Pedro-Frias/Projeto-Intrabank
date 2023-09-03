function listEstoque() {
    //aguardar();
    fetch(`/estoque/listEstoque/`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = ""
                feed.appendChild(mensagem);
                throw "";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                var colunas = document.getElementById("colunas-container");
                feed.appendChild(colunas);

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    // criando e manipulando elementos do HTML via JavaScript
                    var linhaTr = document.createElement("tr");
                    var nomeProduct = document.createElement("td");
                    var categoria = document.createElement("td");
                    var qtdProduto = document.createElement("td");
                    var regiao = document.createElement("td");

                    

                    nomeProduct.innerHTML = `${publicacao.NomeProduto}`
                    categoria.innerHTML = `${publicacao.Categoria}`
                    qtdProduto.innerHTML = `<span>${publicacao.Quantidade}</span>`
                    regiao.innerHTML = `${publicacao.Regiao}`



                    feed.appendChild(linhaTr);
                    linhaTr.appendChild(nomeProduct);
                    linhaTr.appendChild(categoria);
                    linhaTr.appendChild(qtdProduto);
                    linhaTr.appendChild(regiao);


                }

                /* finalizarAguardar(); */
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        /*            finalizarAguardar(); */
    });
}
