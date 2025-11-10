// imprime os dados do usuario
nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
nivel_usuario.innerHTML += sessionStorage.NIVEL_USUARIO;

setTimeout(() => {
    btn_jogar.style.opacity = '1'; btn_sair.style.opacity = '1';
}, 1000);


// puxando os times e criando os card deles
fetch('../json/times.json') // vai até onde esta o dados
    .then(response => response.json()) // converte para objeto JS
    .then(times => {

        console.log(times);
        var cardTime = `<div class="linha-time">`;

        // inserindo no html os times
        for (var i = 0; i < times.length; i++) {
            var time = times[i];

            cardTime += `
            <div class="card-time">
            <img src="${time.logo}" class="logo-time">
            <h2>${time.nome}</h2>
            <p>Local:${time.local}</p>
            <p>${time.fundacao}</p>
            </div>
            `;
            if(i == 3){
                cardTime += `</div>
                <div class="linha-time">`
            }
        }
        container_time.innerHTML = `${cardTime}</div>`;
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));

    

/* Para recarregar a pagina e não voltar para o inicio*/
function validarURL() {

    var url = window.location.href;

    if (url.endsWith('tapgo.html')) {
        tela_inicial_visivel.style.display = 'block';
        tela_menu_visivel.style.display = 'none';

    } else if (url.includes('?menu')) {
        tela_inicial_visivel.style.display = 'none';
        navbar_visivel.style.display = 'block';

    }
    else if (url.includes('?escolhaTime')) {

        tela_inicial_visivel.style.display = 'none';
        btn_voltar.style.display = 'block';
        tela_time_visivel.style.display = 'block'

    }
}

validarURL();


// redirecionamento 
function MudarPagina() {
    window.location.href = "../login.html";

}
function Iniciar() {
    window.location.href = "?menu";
}
function Voltar() {
    window.location.href = "?menu";
}
function Jogar() {
    window.location.href = "?escolhaTime";
}

