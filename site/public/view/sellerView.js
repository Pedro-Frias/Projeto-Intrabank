    
    function cadastrar() {
        var corpo = {
            nome: nome.value,
            cpf: cpf.value,
            contato: contato.value,
            uf: uf.value
        }



        if (corpo.nome == "" || corpo.cpf == "" || corpo.uf == "" || corpo.contato == "") {
            alert("Insira dados válidos")
            return false;
        } else if (corpo.cpf.length != 14) {
            alert("CPF com quantidade inválida.")
            return false;
        } else if (corpo.contato != 13) {
            alert("Contato inválido.")
            return false;
        }


        console.log(`${corpo.cpf}`)

        fetch(`/seller/cadastrar/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "seller.html";
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

    function listSeller() {
        //aguardar();
        fetch(`/seller/listSeller/`).then(function (resposta) {
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
                        var idseller = document.createElement("td");
                        var nomeseller = document.createElement("td");
                        var cpf = document.createElement("td");
                        var contato = document.createElement("td");
                        var UF = document.createElement("td");
                        var areaDelete = document.createElement("td");
                        var areaUpdate = document.createElement("td");
                        

                        idseller.innerHTML = `<span>${publicacao.idVendedor}</span>`
                        nomeseller.innerHTML = `${publicacao.nomeVendedor}`
                        cpf.innerHTML = `${publicacao.cpf}`
                        contato.innerHTML = `${publicacao.contato}`
                        UF.innerHTML = `${publicacao.UF}`

                        var buttonDelete = document.createElement("button");
                        buttonDelete.textContent = "Deletar"; // Texto do botão
                        buttonDeletar.className = "botaoDeleter"
                        areaDelete.appendChild(buttonDelete);
                        buttonDelete.setAttribute("onclick", `deleteSeller(${publicacao.idVendedor})`);

                        var buttonUpdate = document.createElement("button");
                        buttonUpdate.textContent = "Atualizar"; // Texto do botão
                        buttonUpdate.className = "botaoAtualizar"
                        areaUpdate.appendChild(buttonUpdate);
                        buttonUpdate.setAttribute("onclick", `redirectUpdate(${publicacao.idVendedor})`);

                        feed.appendChild(linhaTr);
                        linhaTr.appendChild(idseller);
                        linhaTr.appendChild(nomeseller);
                        linhaTr.appendChild(cpf);
                        linhaTr.appendChild(contato);
                        linhaTr.appendChild(UF);
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

    function deleteSeller(idseller) {
        console.log("Criar função de apagar post escolhido - ID" + idseller);

        fetch(`/seller/deletar/${idseller}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {

            if (resposta.ok) {
                alert("seller deletado com sucesso!")
                setTimeout(() => {
                    window.location = "../view/seller.html"
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


    function redirectUpdate(idVendedor) {
        sessionStorage.ID_POSTAGEM_EDITANDO = idVendedor;
        console.log("cliquei em editar - " + idVendedor);
/*         window.alert("Você será redirecionado à página de edição do aviso de id número: " + idseller); */
        window.location = "editarSeller.html";

    }

    function updateSeller() {

        fetch(`/seller/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome.value,
                cpf: cpf.value,
                contato: contato.value,
                uf: uf.value,
                
            })
        }).then(function (resposta) {
            console.log(`${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`)
            console.log(`${body.nome}, ${body.cpf}, ${body.uf}`);
            
            if (resposta.ok) {
                alert("Atualização feita com sucesso")
                console.log("Testando se direciona para to-do.html")
                setTimeout(() => {
                    window.location = "../view/seller.html";
                }, "2000")
            }
        }).catch(function (resposta) {
            window.location = "../view/seller.html";
        });
    }
