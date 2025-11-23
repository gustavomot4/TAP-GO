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
    var emailVar = ipt_email_cadastro.value.toLowerCase();
    var senhaVar = ipt_senha_cadastro.value;
    var confirmacaoSenhaVar = ipt_senha_confirmada.value;

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        card_resultado_visivel.style.display = "block"
        mensagem_resultado.innerHTML = "Por favor Preencha os campos";
        sumirResultado();

        finalizarAguardar();
        return false;
    } else if (contadorEmail < 1) {

        card_resultado_visivel.style.display = "block"
        mensagem_resultado.innerHTML = "O formato do email é invalido";
        sumirResultado();
    } else if (contadorSenha < 1) {
        card_resultado_visivel.style.display = "block"
        mensagem_resultado.innerHTML = "A senha não cumpre os requisitos";
        sumirResultado();
    } else if (contadorSenhaRepetida < 1) {
        card_resultado_visivel.style.display = "block"
        mensagem_resultado.innerHTML = "A senha não são iguais";
        sumirResultado();
    } else {


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

                    card_resultado_visivel.style.display = "block"
                    mensagem_resultado.innerHTML = "Cadastro realizado com sucesso!";
                    sumirResultado();
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
}

/*função de login*/

function Login() {
    aguardar();

    var emailVar = ipt_email_login.value;
    var senhaVar = ipt_senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        card_resultado_visivel.style.display = "block"
        mensagem_resultado.innerHTML = "Por favor Preencha os campos";
        sumirResultado();
        finalizarAguardar();
        return false;
    }
    else {

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

                var mensagem = ""
                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar()


                    card_resultado_visivel.style.display = "block"
                    mensagem_resultado.innerHTML = `Email ou senha inválidos`;
                    sumirResultado();
                });


            }

        }).catch(function (erro) {
            console.log(erro);

        })

        return false;
    }
}

var contadorEmail = 0
function validarEmail() {
    var email = ipt_email_cadastro.value
    var contador = 0

    if (email.endsWith('sptech.school') ||
        email.endsWith('.com') ||
        email.endsWith('.com.br')) {

        while (contador < email.length) {
            contador++

            if (email[contador] == '@') {
                ipt_email_cadastro.style.border = 'solid 2px #28DF99'
                email_span.innerHTML = ''
                contadorEmail = 1
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

    while (contador < nome.length) {
        if (nome.length <= 1) {
            ipt_nome_cadastro.style.border = 'solid 2px red'
            nome_span.innerHTML = 'Insira um nome válido'
        } else {
            ipt_nome_cadastro.style.border = 'solid 2px #28DF99'
            nome_span.innerHTML = ''
        }

        contador++
    }
}


var contadorSenha = 0

function validarSenha() {
    var senha = ipt_senha_cadastro.value;
    var listaCaracterEspecial = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', '?']
    validarSenhaRepetida();

    ipt_senha_cadastro.style.border = 'solid 2px #28DF99'

    if (senha.length < 8) {
        senha_span.innerHTML
        var mensagemSenha = 'Senha necessita de, no mínimo, 8 caracteres <br>'
        ipt_senha_cadastro.style.border = 'solid 2px red'
    } else {
        var mensagemSenha = ''
        var contadorSenhaTam = 1
    }

    var i = 0
    var contadorCaracterEspecial = 0
    while (i < listaCaracterEspecial.length) {
        var letraAtual = listaCaracterEspecial[i]
        if (senha.includes(letraAtual)) contadorCaracterEspecial++
        i++
    }

    if (contadorCaracterEspecial >= 1) {
        var mensagemCaracter = ''
        var contadorSenhaCaracter = 1
    } else {
        ipt_senha_cadastro.style.border = 'solid 2px red'
        var mensagemCaracter = 'Senha necessita de pelo menos 1 Caracter especial <br>'
    }

    if (senha.toLowerCase() == senha) {
        var mensagemTam = 'Senha necessita de pelo menos 1 letra MAIUSCULA'
    } else {
        var mensagemTam = ''
        var contadorSenhaTam = 1
    }
    senha_span.innerHTML = `${mensagemSenha}  ${mensagemCaracter}  ${mensagemTam}`;

    if (contadorCaracterEspecial == 1 && contadorSenhaCaracter == 1 && contadorSenhaTam == 1) contadorSenha = 1
    else contadorSenha = 0
}

var contadorSenhaRepetida = 0
function validarSenhaRepetida() {
    var senha = ipt_senha_cadastro.value
    var senhaRepetida = ipt_senha_confirmada.value

    if (senhaRepetida !== senha) {
        confirmar_senha_span.innerHTML = 'As senhas precisam ser iguais'
        ipt_senha_confirmada.style.border = 'solid 2px red'
        contadorSenhaRepetida = 0
    } else {
        confirmar_senha_span.innerHTML = ''
        ipt_senha_confirmada.style.border = 'solid 2px #28DF99'
        contadorSenhaRepetida = 1
    }
}