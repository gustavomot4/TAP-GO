// Gráfico de Barras 
const ctxBarra = document.getElementById('myChartBarra');

new Chart(ctxBarra, {
    type: 'bar',
    data: {
        labels: [
            '01/10', '02/10', '03/10', '04/10', '05/10', '06/10', '07/10',
            '08/10', '09/10', '10/10', '11/10', '12/10', '13/10', '14/10'
        ],
        datasets: [
            {
                label: 'Camara Fria 1',
                data: [11, 1, 2, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: '#12be8b', /*cor dado do grafico*/
                borderColor: '#12be8b', /*cor da borda*/
                borderWidth: 1, /*tamanho da largura da borda*/
                borderRadius: 6 /*Arredonda a borda*/
            },
            {
                label: 'Camara Fria 2',
                data: [3, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 2],
                backgroundColor: '#6C63FF', /*cor dado do grafico*/
                borderColor: '#6C63FF', /*cor da borda*/
                borderWidth: 1, /*tamanho da largura da borda*/
                borderRadius: 6 /*Arredonda a borda*/
            }


        ]
    },
    options: {
        responsive: true,/*deixa o grafico responsivo*/
        maintainAspectRatio: false,/*O grafico se ajusta ao tamanho do container,
                 entretanto o grafico pode acabar se esticando ou comprimindo
                 ja se o valor for tru isso não acontece*/
        plugins: {
            legend: {
                position: 'bottom', /*A posição da legenda fica abaixo do grafico*/
                labels: {
                    color: '#333', /*cor da legenda*/
                    font: { /*Estilização da font*/
                        size: 13, /*Tamanho da font*/
                        weight: 'bold'/*Formato negrito*/
                    }
                }
            },
            tooltip: /*Caixinha das legendas estilização delas*/{
                backgroundColor: '#6C63FF',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderWidth: 2,
                padding: 15
            }
        },
        scales: {
            x: {
                ticks: { color: '#555' },
                grid: { color: 'rgba(0, 0, 0, 0.03)' }/*cores das linhas da grade do eixo x*/
            },
            y: {
                beginAtZero: true,/*começa do zero o eixo y*/
                ticks: { color: '#555' },
                grid: { color: 'rgba(0, 0, 0, 0.5)' }/*cores das linhas da grades do eixo y*/
            }
        }
    }
});

// Gráfico de Pizza 
const ctxPie = document.getElementById('myChartPie');

new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Câmara Fria 1', 'Câmara Fria 2'],
        datasets: [
            {
                label: 'Total de Sensores',
                data: [4, 4],
                backgroundColor: [
                    '#6C63FF',
                    '#12be8b'
                ],
                borderColor: '#fff',
                borderWidth: 3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#333',
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#6C63FF',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10
            }
        }
    }
});