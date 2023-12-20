
function sendRequest() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", window.location.origin + "/api/data/last");
        xhr.withCredentials=true;
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
        return data;
    } catch (error) {
        console.error(error);
        return { temperature: 0, humidity: 0 }; // Default values in case of an error
    }
}

async function updateMeteoWidget() {
    try {
        const data = await apiCall(); // make apiCall

        // update widget values
        document.getElementById('tempValue').innerText = data.temperature;
        document.getElementById('humidityValue').innerText = data.humidity;

    } catch (error) {
        console.error(error);
    }
}

// Periodically update the meteo widget
setInterval(() => updateMeteoWidget(), 5000);
