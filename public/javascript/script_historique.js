
function sendRequest() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", "http://127.0.0.1:3000/api/data/last");
        xhr.responseType = "json";

        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const data = xhr.response;
                resolve(data); // resolve the promise with data
            } else {
                const error = `Error: ${xhr.status}`;
                reject(error); // reject promise with an error
            }
        };

        xhr.send();
    });
}

async function apiCall() {
    try {
        const data = await sendRequest();
        return { temperature: data.temperature, humidity: data.humidity };
    } catch (error) {
        console.error(error);
        return { temperature: 0, humidity: 0 }; // Default values in case of an error
    }
}

async function updateChart(chart) {
    try {
        const data = await apiCall();

        // Add new data to the chart
        chart.data.labels.push(new Date().toLocaleTimeString());
        chart.data.datasets[0].data.push(data.temperature);
        chart.data.datasets[1].data.push(data.humidity);

        // Limit the number of data points to display
        const maxDataPoints = 24;
        if (chart.data.labels.length > maxDataPoints) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
            chart.data.datasets[1].data.shift();
        }

        // Update the chart
        chart.update();
    } catch (error) {
        console.error(error);
    }
}


/* Générer des données aléatoires */
function generateData() {
    randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
    randomHumidity = (Math.random() * Math.floor(50)).toFixed(2);

    // Add new data to the chart
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(randomTemperature);
    chart.data.datasets[1].data.push(randomHumidity);

    // Limit the number of data points to display
    const maxDataPoints = 24;
    if (chart.data.labels.length > maxDataPoints) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
    }

    // Update the chart
    chart.update();
}


function shareData() {
    // Obtenez la dernière donnée
    const lastData = data[data.length - 1];

    // Convertissez la dernière donnée en JSON
    const json = JSON.stringify(lastData);

    // Logique pour partager les données
    // Par exemple, vous pouvez l'afficher dans la console pour le moment
    console.log(json);
}



// Create initial chart
const ctx = document.getElementById('historiqueCanvas').getContext('2d');
const weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Température °C',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Humidité %',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                scaleLabel: { // Titre sur l'axe X
                    display: true,
                    labelString: "Temps"
                }
            }],
            yAxes: [{
                scaleLabel: { // Titre sur l'axe Y
                    display: true,
                    labelString: "°C"
                }
            }]
        }
    }
});

// Periodically update the chart (every 5 seconds)
setInterval(() => updateChart(weatherChart), 5000);
// Initial chart update
updateChart(weatherChart);
