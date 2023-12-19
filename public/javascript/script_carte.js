var map = L.map('map').setView([48.858844, 2.294350], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                var probeLocation = [48.858844, 2.294350];
                var probeMarker = L.marker(probeLocation).addTo(map);
                probeMarker.bindPopup("Emplacement de la sonde").openPopup();

                // Exemple de cercle autour de la sonde
                var circle = L.circle(probeLocation, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 200 // en mètres
                }).addTo(map);

                var mymap = L.map('map').setView([48.8534, 2.3488], 13);

                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: '',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoicGF1bG9wZXJzIiwiYSI6ImNrZ2Z2b2Z6ZjBjZm0ycW1yZ2Z6Z2J6Z2gifQ.5Z4Z3Z3Z3Z3Z3Z3Z3Z3Z3w'
                }).addTo(mymap);

                var marker = L.marker([48.8534, 2.3488]).addTo(mymap);