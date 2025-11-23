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
                sessionStorage.NIVEL_USUARIO = json.nivel;

                setTimeout(function () {
                    window.location = "intro.html";
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

function validarEmail() { //Função para validar o email
    var email = ipt_email_cadastro.value
    var contador = 0

    if (email.endsWith('sptech.school') || //Se o email terminar com algumas dessas opções, entre no loop (while)
        email.endsWith('.com') ||
        email.endsWith('.com.br')) {

        while (contador < email.length) { //Enquanto o contador for menor que o tamanho do texto
            contador++

            if (email[contador] == '@') { //Percorrendo cada posição do email do usuário para verificar se existe o caractere "@"
                ipt_email_cadastro.style.border = 'solid 2px #28DF99'
                email_span.innerHTML = ''
            }
        }
    } else {
        ipt_email_cadastro.style.border = 'solid 2px red'
        email_span.innerHTML = 'Formato de email inválido'
    }
}

function validarNome() { //Função para verificar se é um nome válido
    var nome = ipt_nome_cadastro.value
    var contador = 0

    while (contador < nome.length) { //Enquanto o contador for menor que o tamanho do nome
        if (nome.length <= 1) { //Se o tamanho do nome for menor ou igual a 1, o nome é inválido
            ipt_nome_cadastro.style.border = 'solid 2px red'
            nome_span.innerHTML = 'Insira um nome válido'
        } else {
            ipt_nome_cadastro.style.border = 'solid 2px #28DF99'
            nome_span.innerHTML = ''
        }

        contador++
    }
}

function validarSenha() { //Função que valida a Senha inserida
    var senha = ipt_senha_cadastro.value

    if (senha.length < 8) { //Se o tamanho da senha for menor que 8 caracteres, ela não será válida
        senha_span.innerHTML = 'Senha necessita de, no mínimo, 8 caracteres'
        ipt_senha_cadastro.style.border = 'solid 2px red'
    } else {
        senha_span.innerHTML = ''
        ipt_senha_cadastro.style.border = 'solid 2px #28DF99'
    }
}

function validarSenhaRepetida() { //Função que valida a senha repetida
    var senha = ipt_senha_cadastro.value
    var senhaRepetida = ipt_senha_confirmada.value

    if (senhaRepetida !== senha || senhaRepetida.length < 8) { //Se as senhas forem diferentes ou se o tamanho da senha repetida for menor que 8, a senha repetida será inválida
        confirmar_senha_span.innerHTML = 'As senhas precisam ser iguais'
        ipt_senha_confirmada.style.border = 'solid 2px red'
    } else {
        confirmar_senha_span.innerHTML = ''
        ipt_senha_confirmada.style.border = 'solid 2px #28DF99'
    }
}