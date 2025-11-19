
var vitoriaUsuario = 0
var vitoriaAdversario = 0

var totalGolsEsquerda = 0

var totalGolsMeio = 0

var totalGolsDireita = 0


var totalChuteEsquerda = 0
var totalChuteMeio = 0
var totalChuteDireita = 0

var percentualEsquerdaGol = 0
var percentualMeioGol = 0
var percentualDireitaGol = 0

var totalGolsAdversarioEsquerda = 0
var totalGolsAdversarioMeio = 0
var totalGolsAdversarioDireita = 0

var totalChuteAdvesarioEsquerda = 0
var totalChuteAdvesarioMeio = 0
var totalChuteAdvesarioDireita = 0

var defesasEsquerda = 0
var defesasMeio = 0
var defesasDireita = 0

var percentualEsquerdaDefesa = 0
var percentualMeioDefesa = 0
var percentualDireitaDefesa = 0

function buscarTodosJogos() {
    fetch(`/partida/todosJogos/${idUsuario}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {

                    for (var i = 0; i < resposta.length; i++) {
                        var golsUsuario = resposta[i].golsUsuarioEsquerda + resposta[i].golsUsuarioMeio + resposta[i].golsUsuarioDireita;
                        var golsAdversario = resposta[i].golsAdversarioEsquerda + resposta[i].golsAdversarioMeio + resposta[i].golsAdversarioDireita;

                        if (golsUsuario > golsAdversario) vitoriaUsuario++; 
                        else vitoriaAdversario++;
                    }

                    total_vitoria.innerHTML = vitoriaUsuario;
                    total_derrota.innerHTML = vitoriaAdversario;

                    for (var i = 0; i < resposta.length; i++) {

                        totalGolsEsquerda += resposta[i].golsUsuarioEsquerda;
                        totalGolsMeio += resposta[i].golsUsuarioMeio;
                        totalGolsDireita += resposta[i].golsUsuarioDireita;

                        totalChuteEsquerda += resposta[i].chutesUsuarioEsquerda;
                        totalChuteMeio += resposta[i].chutesUsuarioMeio;
                        totalChuteDireita += resposta[i].chutesUsuarioDireita;

                        totalGolsAdversarioEsquerda += resposta[i].golsAdversarioEsquerda;
                        totalGolsAdversarioMeio += resposta[i].golsAdversarioMeio;
                        totalGolsAdversarioDireita += resposta[i].golsAdversarioDireita;

                        totalChuteAdvesarioEsquerda += resposta[i].chutesAdversarioEsquerda;
                        totalChuteAdvesarioMeio += resposta[i].chutesAdversarioMeio;
                        totalChuteAdvesarioDireita += resposta[i].chutesAdversarioDireita;
                    }

                    defesasEsquerda = totalChuteAdvesarioEsquerda - totalGolsAdversarioEsquerda;
                    defesasMeio = totalChuteAdvesarioMeio - totalGolsAdversarioMeio;
                    defesasDireita = totalChuteAdvesarioDireita - totalGolsAdversarioDireita;

                    percentualEsquerdaDefesa = (defesasEsquerda / totalChuteAdvesarioEsquerda) * 100;
                    percentualMeioDefesa = (defesasMeio / totalChuteAdvesarioMeio) * 100;
                    percentualDireitaDefesa = (defesasDireita / totalChuteAdvesarioDireita) * 100;

                    percentualEsquerdaGols = (totalGolsEsquerda / totalChuteEsquerda) * 100;
                    percentualMeioGols = (totalGolsMeio / totalChuteMeio) * 100;
                    percentualDireitaGols = (totalGolsDireita / totalChuteDireita) * 100;

                    percentual_chute_esquerda.innerHTML = `${percentualEsquerdaGols.toFixed(1)}%`;
                    percentual_chute_meio.innerHTML = `${percentualMeioGols.toFixed(1)}%`;
                    percentual_chute_direita.innerHTML = `${percentualDireitaGols.toFixed(1)}%`;

                    percentual_defesa_esquerda.innerHTML = `${percentualEsquerdaDefesa.toFixed(1)}%`;
                    percentual_defesa_meio.innerHTML = `${percentualMeioDefesa.toFixed(1)}%`;
                    percentual_defesa_direita.innerHTML = `${percentualDireitaDefesa.toFixed(1)}%`;

                    CriarGraficos();
                });
            }
        })
        .catch(function (error) {
            console.error(`Erro: ${error.message}`);
        });
}

buscarTodosJogos();


// Gráfico de chutes 
function CriarGraficos() {


    const ctxChute = document.getElementById('myChartChute');

    new Chart(ctxChute, {
        type: 'bar',
        data: {
            labels: [

                'Esquerda', 'Meio', 'Direita'
            ],
            datasets: [
                {
                    label: 'Total Chutes',
                    data: [totalChuteEsquerda, totalChuteMeio, totalChuteDireita,],
                    backgroundColor: 'rgba(7, 244, 104, 0.3)',
                    borderColor: '#07f468',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Total Gols',
                    data: [totalGolsEsquerda, totalGolsMeio, totalGolsDireita],
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderColor: '#ffffffff',
                    borderWidth: 2,
                    borderRadius: 6
                }

            ]
        },
        options: {
            responsive: true,/*deixa o grafico responsivo*/
            maintainAspectRatio: true,/*O grafico se ajusta ao tamanho do container,
                 entretanto o grafico pode acabar se esticando ou comprimindo
                 ja se o valor for true isso não acontece*/
            plugins: {
                legend: {
                    position: 'bottom', /*A posição da legenda fica abaixo do grafico*/
                    labels: {
                        color: '#ffffffff', /*cor da legenda*/
                        font: {
                            size: 13, /*Tamanho da font*/
                            weight: 'bold'/*Formato negrito*/
                        }
                    }
                },
                tooltip: /*Caixinha das legendas estilização delas*/{
                    backgroundColor: 'rgba(85, 85, 85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderWidth: 2,
                    padding: 15
                }
            },
            scales: {
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(85, 85, 85, 0.5)' }/*cores das linhas da grade do eixo x*/
                },
                y: {
                    beginAtZero: true,/*começa do zero o eixo y*/
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(85, 85, 85, 0.2)' }/*cores das linhas da grades do eixo y*/
                }
            }
        }
    });


    const ctxDefesa = document.getElementById('myChartDefesa');

    // Gráfico de defesas 
    new Chart(ctxDefesa, {
        type: 'bar',
        data: {
            labels: [

                'Esquerda', 'Meio', 'Direita'
            ],
            datasets: [
                {
                    label: 'Total de chutes adversario',
                    data: [totalChuteAdvesarioEsquerda, totalChuteAdvesarioMeio, totalChuteAdvesarioDireita],
                    backgroundColor: 'rgba(7, 244, 104, 0.3)',
                    borderColor: '#07f468',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Total de defesas',
                    data: [defesasEsquerda, defesasMeio, defesasDireita],
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderColor: '#ffffffff',
                    borderWidth: 2,
                    borderRadius: 6
                }

            ]
        },
        options: {
            responsive: true,/*deixa o grafico responsivo*/
            maintainAspectRatio: true,/*O grafico se ajusta ao tamanho do container,
                 entretanto o grafico pode acabar se esticando ou comprimindo
                 ja se o valor for true isso não acontece*/
            plugins: {
                legend: {
                    position: 'bottom', /*A posição da legenda fica abaixo do grafico*/
                    labels: {
                        color: '#ffffffff', /*cor da legenda*/
                        font: {
                            size: 13, /*Tamanho da font*/
                            weight: 'bold'/*Formato negrito*/
                        }
                    }
                },
                tooltip: /*Caixinha das legendas estilização delas*/{
                    backgroundColor: 'rgba(85, 85, 85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderWidth: 2,
                    padding: 15
                }
            },
            scales: {
                x: {
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(85, 85, 85, 0.5)' }/*cores das linhas da grade do eixo x*/
                },
                y: {
                    beginAtZero: true,/*começa do zero o eixo y*/
                    ticks: { color: '#fff' },
                    grid: { color: 'rgba(85, 85, 85, 0.2)' }/*cores das linhas da grades do eixo y*/
                }
            }
        }
    });

}