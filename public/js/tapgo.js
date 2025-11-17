// imprime os dados do usuario
nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
nivel_usuario.innerHTML += sessionStorage.NIVEL_USUARIO;

var idUsuario = sessionStorage.ID_USUARIO;

function buscarUltimoIDPartida() {
    fetch(`/partida/ultimas/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sessionStorage.ID_ULTIMA_PARTIDA = resposta[0].idPartida
                console.log(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

var timesGlobais = [];

// puxando os times e criando os card deles
fetch('../json/times.json') // vai até onde esta o dados
    .then(
        function (response) {
            return response.json();
        }
    ) // converte para objeto JS
    .then(
        function (times) {

            timesGlobais = times

            console.log(times);
            var cardTime = `<div class="linha-time">`;

            // inserindo no html os times
            for (var i = 0; i < times.length; i++) {
                var time = times[i];

                cardTime += `
                <div class="card-time" onclick="EscolherTime(${i})">
                <img src="${time.logo}" class="logo-time">
                <h2>${time.nome}</h2>
                <p>Local: ${time.local}</p>
                <p>${time.fundacao}</p>
                </div>
                `;
                if (i == 3) {
                    cardTime += `</div>
                    <div class="linha-time">`
                }
            }
            container_time.innerHTML = `${cardTime}</div>`;

        })

function EscolherTime(i) {
    var timeEscolhido = timesGlobais[i];
    console.log(timeEscolhido.nome)
    sessionStorage.ID_TIME = timeEscolhido.id;
    sessionStorage.NOME_TIME = timeEscolhido.nome;
    sessionStorage.LOGO_TIME = timeEscolhido.logo;

    window.location.href = '?jogo';

    do {
        var contadorAdversario = Math.floor(Math.random() * 7) + 1;
    }
    while (contadorAdversario == i)

    adversario = timesGlobais[contadorAdversario]

    sessionStorage.TIME_ADVERSARIO = adversario.id;
    sessionStorage.NOME_ADVERSARIO = adversario.nome;
    sessionStorage.LOGO_ADVERSARIO = adversario.logo;

}

// imprime os dados apos o fim do jogo
time_usuario.innerHTML += `<img src="${sessionStorage.LOGO_TIME}" class="logo-time">`
time_adversario.innerHTML += `<img src="${sessionStorage.LOGO_ADVERSARIO}" class="logo-time">`


/* Para recarregar a pagina e não voltar para o inicio*/
function validarURL() {
    var url = window.location.href;

    tela_menu_visivel.style.display = 'none';
    navbar_visivel.style.display = 'none';
    tela_time_visivel.style.display = 'none';
    tela_jogo_visivel.style.display = 'none';
    btn_voltar.style.display = 'none';

    if (url.endsWith('tapgo.html')) {
        tela_menu_visivel.style.display = 'block';
        navbar_visivel.style.display = 'block';
    }
    else if (url.includes('?escolhaTime')) {
        tela_menu_visivel.style.display = 'block';
        tela_time_visivel.style.display = 'block';
        btn_voltar.style.display = 'block';
        buscarUltimoIDPartida();

    }
    else if (url.includes('?jogo')) {
        tela_jogo_visivel.style.display = 'block';
        btn_voltar.style.display = 'block';
    } else if (url.includes('?fimJogo')) {

        fim_jogo_visivel.style.display = 'block'
        btn_voltar.style.display = 'block';

        logo_usuario_fim_jogo.innerHTML = `<img src="${sessionStorage.LOGO_TIME}" class="logo-time">`;
        placar_usuario.innerHTML = sessionStorage.GOLS_USUARIO;
        placar_adversario.innerHTML = sessionStorage.GOLS_ADVERSARIO;
        logo_adversario_fim_jogo.innerHTML = `<img src="${sessionStorage.LOGO_ADVERSARIO}" class="logo-time">`;

        if (sessionStorage.GOLS_USUARIO > sessionStorage.GOLS_ADVERSARIO) {
            quem_venceu.innerHTML = `Você venceu`;
        } else if (sessionStorage.GOLS_USUARIO < sessionStorage.GOLS_ADVERSARIO) {
            quem_venceu.innerHTML = `<span style="color:#ff2e2e ">Você perdeu</span>`;
        }
    }
}

validarURL();


// redirecionamento 
function MudarPagina() {
    window.location.href = "../login.html";
}
function Voltar() {
    window.location.href = "tapgo.html";
}
function Jogar() {
    window.location.href = "?escolhaTime";
}


var chutesUsuario = 0
var golsUsuario = 0
var defesasUsuario = 0

var chutesAdversario = 0
var defesasAdversario = 0
var golsAdversario = 0
var fezGol;


var chutesUsuarioEsquerda = 0
var chutesUsuarioMeio = 0
var chutesUsuarioDireita = 0

var golsUsuarioEsquerda = 0
var golsUsuarioMeio = 0
var golsUsuarioDireita = 0


var chutesAdversarioEsquerda = 0
var chutesAdversarioMeio = 0
var chutesAdversarioDireita = 0

var golsAdversarioEsquerda = 0
var golsAdversarioMeio = 0
var golsAdversarioDireita = 0

function Chute(div_canto) {

    var chute = div_canto.id
    var defesa = Math.floor(Math.random() * 3) + 1;

    console.log('clicou em', chute)
    console.log('goleiro foi em', defesa)

    if (chute == 'canto_esquerdo') {
        if (defesa == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaDefesa.png" class="resultado">`
            defesasAdversario++
            chutesUsuarioEsquerda++
            fezGol = 0

        } else if (defesa == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroMeio.png" class="resultado">`
            golsUsuario++
            chutesUsuarioEsquerda++
            golsUsuarioEsquerda++
            fezGol = 1

        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroDireita.png" class="resultado">`
            golsUsuario++
            chutesUsuarioEsquerda++
            golsUsuarioEsquerda++
            fezGol = 1

        }

    } else if (chute == 'canto_meio') {

        if (defesa == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroEsquerda.png" class="resultado">`
            golsUsuario++
            chutesUsuarioMeio++
            golsUsuarioMeio++
            fezGOl = 1

        } else if (defesa == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioDefesa.png" class="resultado">`
            defesasAdversario++
            chutesUsuarioMeio++
            fezGol = 0

        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroDireita.png" class="resultado">`
            golsUsuario++
            chutesUsuarioMeio++
            golsUsuarioMeio++
            fezGol = 1
        }


    } else {

        if (defesa == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroEsquerda.png" class="resultado">`
            golsUsuario++
            chutesUsuarioDireita++
            golsUsuarioDireita++
            fezGol = 1
        } else if (defesa == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroMeio.png" class="resultado">`
            golsUsuario++
            chutesUsuarioDireita++
            golsUsuarioDireita++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaDefesa.png" class="resultado">`
            defesasAdversario++
            chutesUsuarioDireita++
            fezGol = 0
        }


    }

    chutesUsuario++

    escolher_canto_chute_visivel.style.display = 'none'
    resultado_visivel.style.display = 'block'
    setTimeout(() => {
        resultado_visivel.style.display = 'none'
        escolher_canto_defesa_visivel.style.display = 'block'
    }, 1500);

    sessionStorage.GOLS_USUARIO = golsUsuario;

    AtualizarPlacar();
}


function Defesa(div_canto) {

    var defesa = div_canto.id
    var chute = Math.floor(Math.random() * 3) + 1;

    console.log('o chute foi em', chute)
    console.log(' seu goleiro foi em', defesa)

    if (defesa == 'canto_esquerdo') {
        if (chute == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaDefesa.png" class="resultado">`
            defesasUsuario++
            chutesAdversarioEsquerda++
            fezGol = 0
        } else if (chute == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroEsquerda.png" class="resultado">`
            golsAdversario++
            chutesAdversarioMeio++
            golsAdversarioMeio++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroEsquerda.png" class="resultado">`
            golsAdversario++
            chutesAdversarioDireita++
            golsAdversarioDireita++
            fezGol = 1
        }

    } else if (defesa == 'canto_meio') {

        if (chute == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroMeio.png" class="resultado">`
            golsAdversario++
            chutesAdversarioEsquerda++
            golsAdversarioEsquerda++
            fezGol = 1

        } else if (chute == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioDefesa.png" class="resultado">`
            defesasUsuario++
            chutesAdversarioMeio++
            fezGol = 0

        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroMeio.png" class="resultado">`
            golsAdversario++
            chutesAdversarioDireita++
            golsAdversarioDireita++
            fezGol = 1

        }

    } else {

        if (chute == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroDireita.png" class="resultado">`
            golsAdversario++
            chutesAdversarioEsquerda++
            golsAdversarioEsquerda++
            fezGol = 1
        } else if (chute == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroDireita.png" class="resultado">`
            golsAdversario++
            chutesAdversarioMeio++
            golsAdversarioMeio++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaDefesa.png" class="resultado">`
            defesasUsuario++
            chutesAdversarioDireita++
            fezGol = 0
        }

    }

    escolher_canto_defesa_visivel.style.display = 'none'
    resultado_visivel.style.display = 'block'
    setTimeout(() => {
        resultado_visivel.style.display = 'none'
        escolher_canto_chute_visivel.style.display = 'block'
    }, 1500);

    chutesAdversario++
    sessionStorage.GOLS_ADVERSARIO = golsAdversario;

    AtualizarPlacar();
}

var contadorPlacarUser = 1
var contadorPlacarAdv = 1
var vitoriaUsuario = 0
var vitoriaAdversario = 0

function AtualizarPlacar() {

    for (; contadorPlacarUser <= chutesUsuario; contadorPlacarUser++) {
        if (fezGol == 1) {
            div_chutes_usuario.innerHTML += `
            <span class="chute gol" id="chute_user_${chutesUsuario}"></span>
            `
        } else if (fezGol == 0) {
            div_chutes_usuario.innerHTML += `
            <span class="chute erro" id="chute_user_${chutesUsuario}"></span>
            `
        }
    }

    for (; contadorPlacarAdv <= chutesAdversario; contadorPlacarAdv++) {
        if (fezGol == 1) {
            div_chutes_adv.innerHTML += `
            <span class="chute gol" id="chute_user_${chutesAdversario}"></span>
            `
        } else if (fezGol == 0) {
            div_chutes_adv.innerHTML += `
            <span class="chute erro" id="chute_user_${chutesAdversario}"></span>
            `
        }
    }

    var diferencaGolsUsuario = golsUsuario - golsAdversario;
    var diferencaGolsAdversario = golsAdversario - golsUsuario;
    var chuteRestantesAdversario = 5 - chutesAdversario;
    var chuteRestantesUsuario = 5 - chutesUsuario;


    if (
        chutesAdversario <= 5 &&
        chutesUsuario <= 5 &&
        (diferencaGolsUsuario > chuteRestantesAdversario ||
            diferencaGolsAdversario > chuteRestantesUsuario)) {
        console.log('acabou');
        if (golsUsuario > golsAdversario) {
            console.log('voce venceu');
            vitoriaUsuario = 1;
        } else if (golsAdversario > golsUsuario) {
            console.log('voce perdeu');
            vitoriaAdversario = 1;
        }
    }

    // alternadas
    if (
        chutesAdversario > 5 &&
        chutesUsuario > 5 &&
        chutesAdversario == chutesUsuario &&
        (diferencaGolsUsuario == 1 || diferencaGolsAdversario == 1) &&
        golsUsuario != golsAdversario) {

        console.log('acabou nas alternadas');
        if (golsUsuario > golsAdversario) {
            console.log('voce venceu');
            vitoriaUsuario = 1;
        } else {
            console.log('voce perdeu');
            vitoriaAdversario = 1;
        }
    }

    if (chutesAdversario % 5 == 0 && chutesUsuario % 5 == 0) {
        div_chutes_usuario.innerHTML = ``
        div_chutes_adv.innerHTML = ``
    }

    fimJogo()
}

function fimJogo() {
    if (vitoriaUsuario == 1 || vitoriaAdversario == 1) {
        CadastrarPartida()
    }
}

function CadastrarPartida() {
    if (sessionStorage.ID_ULTIMA_PARTIDA == undefined) {
        sessionStorage.ID_ULTIMA_PARTIDA = 1;
    } else {
        sessionStorage.ID_ULTIMA_PARTIDA = Number(sessionStorage.ID_ULTIMA_PARTIDA) + 1;
    }

    var idUltimaPartidaVar = Number(sessionStorage.ID_ULTIMA_PARTIDA);
    var fkUsuarioVar = sessionStorage.ID_USUARIO;
    var fkAdversarioVar = sessionStorage.TIME_ADVERSARIO;
    var timeUsuarioVar = sessionStorage.NOME_TIME;

    var chutesUsuarioEsquerdaVar = chutesUsuarioEsquerda;
    var chutesUsuarioMeioVar = chutesUsuarioMeio;
    var chutesUsuarioDireitaVar = chutesUsuarioDireita;

    var golsUsuarioEsquerdaVar = golsUsuarioEsquerda;
    var golsUsuarioMeioVar = golsUsuarioMeio;
    var golsUsuarioDireitaVar = golsUsuarioDireita;


    var chutesAdversarioEsquerdaVar = chutesAdversarioEsquerda;
    var chutesAdversarioMeioVar = chutesAdversarioMeio;
    var chutesAdversarioDireitaVar = chutesAdversarioDireita;

    var golsAdversarioEsquerdaVar = golsAdversarioEsquerda;
    var golsAdversarioMeioVar = golsAdversarioMeio;
    var golsAdversarioDireitaVar = golsAdversarioDireita;

    // Enviando o valor da nova input
    fetch("/partida/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            idPartidaServer: idUltimaPartidaVar,
            fkUsuarioServer: fkUsuarioVar,
            fkAdversarioServer: fkAdversarioVar,
            timeUsuarioServer: timeUsuarioVar,

            chutesUsuarioEsquerdaServer: chutesUsuarioEsquerdaVar,
            chutesUsuarioMeioServer: chutesUsuarioMeioVar,
            chutesUsuarioDireitaServer: chutesUsuarioDireitaVar,

            golsUsuarioEsquerdaServer: golsUsuarioEsquerdaVar,
            golsUsuarioMeioServer: golsUsuarioMeioVar,
            golsUsuarioDireitaServer: golsUsuarioDireitaVar,

            chutesAdversarioEsquerdaServer: chutesAdversarioEsquerdaVar,
            chutesAdversarioMeioServer: chutesAdversarioMeioVar,
            chutesAdversarioDireitaServer: chutesAdversarioDireitaVar,

            golsAdversarioEsquerdaServer: golsAdversarioEsquerdaVar,
            golsAdversarioMeioServer: golsAdversarioMeioVar,
            golsAdversarioDireitaServer: golsAdversarioDireitaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log('cadastro completo')
                setTimeout(() => {
                    window.location.href = "?fimJogo";
                }, 1500);

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;

}
