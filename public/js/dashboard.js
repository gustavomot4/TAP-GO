var idUsuario = sessionStorage.ID_USUARIO;

function buscarUltimo5Jogos() {
    fetch(`/partida/ultimosJogos/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                for (var i = 0; i < resposta.length; i++) {
                    var golsUsuario = resposta[i].golsUsuarioEsquerda + resposta[i].golsUsuarioMeio + resposta[i].golsUsuarioDireita
                    var golsAdversario = resposta[i].golsAdversarioEsquerda + resposta[i].golsAdversarioMeio + resposta[i].golsAdversarioDireita


                    var imgTimeUsuario
                    var imgTimeAdversario

                    if (resposta[i].timeUsuario == 'São Paulo') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/250px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png`
                    } else if (resposta[i].timeUsuario == 'Corinthians') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png`
                    } else if (resposta[i].timeUsuario == 'Palmeiras') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/250px-Palmeiras_logo.svg.png`

                    } else if (resposta[i].timeUsuario == 'Santos') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/250px-Santos_Logo.png`

                    } else if (resposta[i].timeUsuario == 'Ponte Preta') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_AA_Ponte_Preta.svg/120px-Logo_AA_Ponte_Preta.svg.png`

                    } else if (resposta[i].timeUsuario == 'Guarani') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Guarani_Futebol_Clube_logo.svg/1280px-Guarani_Futebol_Clube_logo.svg.png`

                    } else if (resposta[i].timeUsuario == 'Juventus da Mooca') {
                        imgTimeUsuario = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/CA_Juventus_logo.svg/1200px-CA_Juventus_logo.svg.png`

                    } else if (resposta[i].timeUsuario == 'Meninos do Morro') {
                        imgTimeUsuario = `../assets/escudoMeninosDoMorro.png`
                    }


                    if (resposta[i].timeAdversario == 'São Paulo') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/250px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png`
                    } else if (resposta[i].timeAdversario == 'Corinthians') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png`

                    } else if (resposta[i].timeAdversario == 'Palmeiras') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/250px-Palmeiras_logo.svg.png`

                    } else if (resposta[i].timeAdversario == 'Santos') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/250px-Santos_Logo.png`

                    } else if (resposta[i].timeAdversario == 'Ponte Preta') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_AA_Ponte_Preta.svg/120px-Logo_AA_Ponte_Preta.svg.png`

                    } else if (resposta[i].timeAdversario == 'Guarani') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Guarani_Futebol_Clube_logo.svg/1280px-Guarani_Futebol_Clube_logo.svg.png`


                    } else if (resposta[i].timeAdversario == 'Juventus da Mooca') {
                        imgTimeAdversario = `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/CA_Juventus_logo.svg/1200px-CA_Juventus_logo.svg.png`

                    } else if (resposta[i].timeAdversario == 'Meninos do Morro') {
                        imgTimeAdversario = `../assets/escudoMeninosDoMorro.png`
                    }
                    var resultadoJogo = ``
                    if (golsUsuario > golsAdversario) {
                        resultadoJogo = `<p class="venceu">Vitória</p>`
                    } else {
                        resultadoJogo = `<p class="perdeu">Derrota</p>`
                    }

                    container_jogo.innerHTML += `
                    <div class="card-jogo">
                        <div class="resultado">
                            ${resultadoJogo}
                        </div>
                        <div class="placar-time">
                            <div class="logo-usuario">
                                <img src="${imgTimeUsuario}"class="logo-time">
                            </div>
                            <div class="placar-usuario">${golsUsuario}</div>
                            x
                            <div class="placar-adversario">${golsAdversario}</div>
                            <div class="logo-adversario" id="logo_time_adversario">
                                <img src="${imgTimeAdversario} "class="logo-time">
                            </div>
                        </div>
                    </div>
                    <div class="barra-separadora"></div>`
                }

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

buscarUltimo5Jogos();


function buscarTimeFavorito() {
    fetch(`/partida/timeFavorito/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                
                time_favorito.innerHTML = resposta[0].timeUsuario;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

buscarTimeFavorito()

function buscarAdversarioMaisEnfrentado() {
    fetch(`/partida/AdversarioMaisEnfrentado/${idUsuario}`, { cache: 'no-store' })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                time_rival.innerHTML = resposta[0].timeAdversario;
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados ${error.message}`);
        });
}

buscarAdversarioMaisEnfrentado()
