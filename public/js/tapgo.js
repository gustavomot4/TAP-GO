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

