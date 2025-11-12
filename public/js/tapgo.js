// imprime os dados do usuario
nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
nivel_usuario.innerHTML += sessionStorage.NIVEL_USUARIO;



var timesGlobais = [];

// puxando os times e criando os card deles
fetch('../json/times.json') // vai até onde esta o dados
    .then(response => response.json()) // converte para objeto JS
    .then(times => {

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
    .catch(error => console.error('Erro ao carregar JSON:', error));

function EscolherTime(i) {
    var timeEscolhido = timesGlobais[i];
    console.log(timeEscolhido.nome)
    sessionStorage.ID_TIME = timeEscolhido.id;
    sessionStorage.NOME_TIME = timeEscolhido.nome;
    sessionStorage.LOGO_TIME = timeEscolhido.logo;

    window.location.href = '?jogo';
}

time_usuario.innerHTML += `<img src="${sessionStorage.LOGO_TIME}" class="logo-time">`



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
    }
    else if (url.includes('?jogo')) {
        tela_jogo_visivel.style.display = 'block';
        btn_voltar.style.display = 'block';
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

function Chute(elemento) {

    var chute = elemento.id
    var defesa = Math.floor(Math.random() * 3) + 1;


    console.log('clicou em', chute)
    console.log('goleiro foi em', defesa)

    if (chute == 'canto_esquerdo') {
        if (defesa == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaDefesa.png" class="resultado">`
            defesasAdversario++
            fezGol = 0
        } else if (defesa == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroMeio.png" class="resultado">`
            golsUsuario++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroDireita.png" class="resultado">`
            golsUsuario++
            fezGol = 1
        }

    } else if (chute == 'canto_meio') {

        if (defesa == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroEsquerda.png" class="resultado">`
            golsUsuario++
            fezGOl = 1
        } else if (defesa == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioDefesa.png" class="resultado">`
            defesasAdversario++
            fezGol = 0
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroDireita.png" class="resultado">`
            golsUsuario++
            fezGol = 1
        }

    } else {

        if (defesa == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroEsquerda.png" class="resultado">`
            golsUsuario++
            fezGol = 1
        } else if (defesa == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroMeio.png" class="resultado">`
            golsUsuario++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaDefesa.png" class="resultado">`
            defesasAdversario++
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

    AtualizarPlacar();
}



function Defesa(elemento) {

    var defesa = elemento.id
    var chute = Math.floor(Math.random() * 3) + 1;


    console.log('o chute foi em', chute)
    console.log(' seu goleiro foi em', defesa)

    if (defesa == 'canto_esquerdo') {
        if (chute == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaDefesa.png" class="resultado">`
            defesasUsuario++
            fezGol = 0
        } else if (chute == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroEsquerda.png" class="resultado">`
            golsAdversario++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroEsquerda.png" class="resultado">`
            golsAdversario++
            fezGol = 1
        }

    } else if (defesa == 'canto_meio') {

        if (chute == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroMeio.png" class="resultado">`
            golsAdversario++
            fezGol = 1
        } else if (chute == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioDefesa.png" class="resultado">`
            defesasUsuario++
            fezGol = 0
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaGoleiroMeio.png" class="resultado">`
            golsAdversario++
            fezGol = 1
        }

    } else {

        if (chute == 1) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/esquerdaGoleiroDireita.png" class="resultado">`
            golsAdversario++
            fezGol = 1
        } else if (chute == 2) {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/meioGoleiroDireita.png" class="resultado">`
            golsAdversario++
            fezGol = 1
        } else {
            resultado_visivel.innerHTML = `<img src="../assets/penalty/direitaDefesa.png" class="resultado">`
            defesasUsuario++
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
    AtualizarPlacar();

}

var contadorPlacarUser = 1
var contadorPlacarAdv = 1
function AtualizarPlacar() {


    `chute_adv_${chutesAdversario}`;
    `chute_user_${chutesUsuario}`;

    for (; contadorPlacarUser <= chutesUsuario; contadorPlacarUser++) {
        if (fezGol == 1) {
            div_chutes_usuario.innerHTML += `
            <span class="chute gol" id="chute_user_${chutesUsuario}"></span>
            `
        }else if (fezGol == 0){
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
        }else if (fezGol == 0){
            div_chutes_adv.innerHTML += `
            <span class="chute erro" id="chute_user_${chutesAdversario}"></span>
            `
        }
    }
    
}