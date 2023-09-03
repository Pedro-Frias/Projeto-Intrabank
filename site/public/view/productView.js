    
    function cadastrar() {
        var corpo = {
            nome: nome.value,
            categoria: categoria.value,
            preco: preco.value,
            regiao: regiao.value
        }



         if (corpo.nome == "" || corpo.contato == "" || corpo.regiao == "" || corpo.preco == "") {
            alert("Insira dados válidos")
            return false;
        } 

        fetch(`/Product/cadastrar/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "Product.html";
                }, "2000")

                /*   finalizarAguardar(); */
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            /*         finalizarAguardar(); */
        });

        return false;

    }

    function listProduct() {
        //aguardar();
        fetch(`/Product/listProduct/`).then(function (resposta) {
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
                        var idProduct = document.createElement("td");
                        var nomeProduct = document.createElement("td");
                        var categoria = document.createElement("td");
                        var preco = document.createElement("td");
                        var fkProduto = document.createElement("td");
                        var areaDelete = document.createElement("td");
                        var areaUpdate = document.createElement("td");
                        

                        idProduct.innerHTML = `<span>${publicacao.idProduto}</span>`
                        nomeProduct.innerHTML = `${publicacao.nomeProduto}`
                        categoria.innerHTML = `${publicacao.categoria}`
                        preco.innerHTML = `${publicacao.precoProduto}`
                        fkProduto.innerHTML = `${publicacao.regiaoEstoque}`

                        var buttonDelete = document.createElement("button");
                        buttonDelete.textContent = "Deletar"; // Texto do botão
                        buttonDelete.className = "botaoDeletar"
                        areaDelete.appendChild(buttonDelete);
                        buttonDelete.setAttribute("onclick", `deleteProduct(${publicacao.idProduto})`);

                        var buttonUpdate = document.createElement("button");
                        buttonUpdate.textContent = "Atualizar"; // Texto do botão
                        buttonUpdate.className = "botaoAtualizar"
                        areaUpdate.appendChild(buttonUpdate);
                        buttonUpdate.setAttribute("onclick", `redirectUpdate(${publicacao.idProduto})`);

                        feed.appendChild(linhaTr);
                        linhaTr.appendChild(idProduct);
                        linhaTr.appendChild(nomeProduct);
                        linhaTr.appendChild(categoria);
                        linhaTr.appendChild(preco);
                        linhaTr.appendChild(fkProduto);
                        linhaTr.appendChild(areaDelete);
                        linhaTr.appendChild(areaUpdate);

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

    function listSales() {
        //aguardar();
        fetch(`/Product/listProduct/`).then(function (resposta) {
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
                        var idProduct = document.createElement("td");
                        var nomeProduct = document.createElement("td");
                        var categoria = document.createElement("td");
                        var preco = document.createElement("td");
                        var fkProduto = document.createElement("td");
                        var areaDelete = document.createElement("td");


                        idProduct.innerHTML = `<span>${publicacao.idProduto}</span>`
                        nomeProduct.innerHTML = `${publicacao.nomeProduto}`
                        categoria.innerHTML = `${publicacao.categoria}`
                        preco.innerHTML = `${publicacao.precoProduto}`
                        fkProduto.innerHTML = `${publicacao.regiaoEstoque}`

                        var buttonDelete = document.createElement("button");
                        buttonDelete.textContent = "Comprar"; // Texto do botão
                        buttonDelete.className = "botaoDeletar"
                        areaDelete.appendChild(buttonDelete);
                        buttonDelete.setAttribute("onclick", `buyProduct(${publicacao.idProduto})`);



                        feed.appendChild(linhaTr);
                        linhaTr.appendChild(idProduct);
                        linhaTr.appendChild(nomeProduct);
                        linhaTr.appendChild(categoria);
                        linhaTr.appendChild(preco);
                        linhaTr.appendChild(fkProduto);
                        linhaTr.appendChild(areaDelete);
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

    function buyProduct(idProduct) {
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
                    window.location = "compra.html"
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

    function deleteProduct(idProduct) {
        console.log("Criar função de apagar post escolhido - ID" + idProduct);

        fetch(`/Product/deletar/${idProduct}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {

            if (resposta.ok) {
                alert("Product deletado com sucesso!")
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


    function redirectUpdate(idProduto) {
        sessionStorage.ID_POSTAGEM_EDITANDO = idProduto;
        console.log("cliquei em editar - " + idProduto);
/*         window.alert("Você será redirecionado à página de edição do aviso de id número: " + idProduct); */
        window.location = "editarProduct.html";

    }


    function updateProduct() {

        fetch(`/product/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome.value,
                categoria: categoria.value,
                preco: preco.value,
                regiao: regiao.value,
                
            })
        }).then(function (resposta) {
            console.log(`${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`)
            console.log(`${body.nome}, ${body.cpf}, ${body.uf}`);
            
            if (resposta.ok) {
                alert("Atualização feita com sucesso")
                setTimeout(() => {
                    window.location = "../view/product.html";
                }, "2000")
            }
        }).catch(function (resposta) {
            window.location = "../view/product.html";
        });
    }
