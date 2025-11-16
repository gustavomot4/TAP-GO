// Gráfico de chutes 
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
                data: [7, 4, 3,],
                backgroundColor: 'rgba(7, 244, 104, 0.3)',
                borderColor: '#07f468',
                borderWidth: 2,
                borderRadius: 6
            },
            {
                label: 'Total Gols',
                data: [3, 2, 3],
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
                label: 'Total de pulos',
                data: [7, 4, 3,],
                backgroundColor: 'rgba(7, 244, 104, 0.3)',
                borderColor: '#07f468',
                borderWidth: 2,
                borderRadius: 6
            },
            {
                label: 'Total de defesas',
                data: [3, 2, 3],
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