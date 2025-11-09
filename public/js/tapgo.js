// dados do usuario
nome_usuario.innerHTML = sessionStorage.NOME_USUARIO


setTimeout(() => {
    btn_jogar.style.opacity = '1';
    btn_sair.style.opacity = '1';
}, 1000);


/* Para recarregar a pagina e não voltar para o inicio*/
function validarURL() {

    var url = window.location.href;

    if (url.includes('?menu')) {
        tela_inicial_visivel.style.display = 'none';
        tela_menu_visivel.style.display = 'block';
    }
    if (url.endsWith('tapgo.html')) {
        tela_inicial_visivel.style.display = 'block';
        tela_menu_visivel.style.display = 'none';
    }

}
validarURL();

function MudarPagina() {
    window.location.href = "../login.html";
}

function Jogar() {
    window.location.href = "?menu";
}