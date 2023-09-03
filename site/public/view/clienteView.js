   
    function cadastrar() {
        var corpo = {
            nome: nome.value,
            cpf: cpf.value,
            uf: uf.value
        }

         if (corpo.nome == "" || corpo.cpf == "" || corpo.uf == "") {
            alert("Insira dados válidos")
            return false;
        } else if (corpo.cpf.length != 14) {
            alert("CPF com quantidade inválida.")
            return false;
        }
        console.log(`${corpo.cpf}`)

        fetch(`/cliente/cadastrar/`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        }).then(function (resposta) {

            console.log("resposta: ", resposta);

            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "cliente.html";
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

    function listCustomer() {
        //aguardar();
        fetch(`/cliente/listCustomer/`).then(function (resposta) {
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
                        var idCliente = document.createElement("td");
                        var nomeCliente = document.createElement("td");
                        var cpf = document.createElement("td");
                        var UF = document.createElement("td");
                        var areaDelete = document.createElement("td");
                        var areaUpdate = document.createElement("td");
                        

                        idCliente.innerHTML = `<span>${publicacao.idCliente}</span>`
                        nomeCliente.innerHTML = `${publicacao.nomeCliente}`
                        cpf.innerHTML = `${publicacao.cpf}`
                        UF.innerHTML = `${publicacao.UF}`

                        var buttonDelete = document.createElement("button");
                        buttonDelete.textContent = "Deletar"; // Texto do botão
                        buttonDelete.className = "botaoDeletar"
                        areaDelete.appendChild(buttonDelete);
                        buttonDelete.setAttribute("onclick", `deleteCustomer(${publicacao.idCliente})`);

                        var buttonUpdate = document.createElement("button");
                        buttonUpdate.textContent = "Atualizar"; // Texto do botão
                        buttonUpdate.className = "botaoAtualizar"
                        areaUpdate.appendChild(buttonUpdate);
                        buttonUpdate.setAttribute("onclick", `redirectUpdate(${publicacao.idCliente})`);

                        feed.appendChild(linhaTr);
                        linhaTr.appendChild(idCliente);
                        linhaTr.appendChild(nomeCliente);
                        linhaTr.appendChild(cpf);
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

    function deleteCustomer(idCliente) {
        console.log("Criar função de apagar post escolhido - ID" + idCliente);

        fetch(`/cliente/deletar/${idCliente}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {

            if (resposta.ok) {
                alert("Cliente deletado com sucesso!")
                setTimeout(() => {
                    window.location = "../view/cliente.html"
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


    function redirectUpdate(idCliente) {
        sessionStorage.ID_POSTAGEM_EDITANDO = idCliente;
        console.log("cliquei em editar - " + idCliente);
/*         window.alert("Você será redirecionado à página de edição do aviso de id número: " + idCliente); */
        window.location = "editarCliente.html";

    }

    function updateCustomer() {
        fetch(`/cliente/editar/${sessionStorage.getItem("ID_POSTAGEM_EDITANDO")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome.value,
                cpf: cpf.value,
                uf: uf.value,
                
            })
        }).then(function (resposta) {
            
            console.log(`${body.nome}, ${body.cpf}, ${body.uf}`);
            if (resposta.ok) {
                alert("Atualização feita com sucesso")
                console.log("Testando se direciona para to-do.html")
                setTimeout(() => {
                    window.location = "../view/cliente.html";
                }, "2000")
            }
        }).catch(function (resposta) {
            window.location = "../view/cliente.html";
        });
    }

