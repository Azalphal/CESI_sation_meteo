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
        return data.position;
    } catch (error) {
        console.error(error);
        return [0, 0]; // default values in case of an error
    }
}

async function initMap() {
    var probeLocation = JSON.parse( await apiCall() ); // parse string (format "[123, 123]")

    var map = L.map('map').setView(probeLocation, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var probeMarker = L.marker(probeLocation).addTo(map);
    probeMarker.bindPopup("Emplacement de la sonde").openPopup();

    // Example of a circle around the probe
    var circle = L.circle(probeLocation, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 200 // in meters
    }).addTo(map);
}

initMap();
