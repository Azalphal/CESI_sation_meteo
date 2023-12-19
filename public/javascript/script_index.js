
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
        return { temperature: data.temperature, humidity: data.humidite };
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

        // also update meteo widget
        document.getElementById('tempValue').innerText = data.temperature;
        document.getElementById('humidityValue').innerText = data.humidity;

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

// Create initial chart
const ctx = document.getElementById('weatherChart').getContext('2d');
const weatherChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperature',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Humidity',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Periodically update the chart (every 5 seconds)
setInterval(() => updateChart(weatherChart), 5000);
// Initial chart update
updateChart(weatherChart);