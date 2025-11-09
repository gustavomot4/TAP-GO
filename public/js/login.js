function validarURL() {
    var url = window.location.href;
    if (url.includes('?cadastro')) {
        container_cadastro_visivel.style.display = `block`;
        container_login_visivel.style.display = `none`;
    }
}

validarURL(); 

function Alternar() {
    if (container_cadastro_visivel.style.display == `none`) {
        container_cadastro_visivel.style.display = `block`;
        container_login_visivel.style.display = `none`;
    } else {
        container_cadastro_visivel.style.display = `none`;
        container_login_visivel.style.display = `block`;
    }
}


function MudarPagina() {
    window.location.href = "../index.html";
}

/*função de cadastro*/

function Cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = ipt_nome_cadastro.value;
    var emailVar = ipt_email_cadastro.value;
    var senhaVar = ipt_senha_cadastro.value;
    var confirmacaoSenhaVar = ipt_senha_confirmada.value;

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

/*função de login*/

function Login() {
    aguardar();

    var emailVar = ipt_email_login.value;
    var senhaVar = ipt_senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;

                setTimeout(function () {
                    window.location = "tapgo.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}
