config = {
    type: "line", // Graphique de type Line
    data: {
        labels: [], // Données Axe X
        datasets: [{
            label: "Température °C", // Titre du jeu de données
            fill: false, // Juste un trait pour le tracé de la courbe
            backgroundColor: "red", // Couleur des points
            borderColor: "red", // Couleur du trait
            data: [] // Données Axe Y
        },
        {
            label: "Humidité %", // Title of the new dataset
            fill: false, // Just a line for the plot
            backgroundColor: "blue", // Color of the points
            borderColor: "blue", // Color of the line
            data: [] // Data for Y Axis
        }]
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
};


/*Le contexte du canevas HTML */
context = document.getElementById("historiqueCanvas").getContext("2d");
chart = new Chart(context, config);

/* Générer des données aléatoires */
function generateData() {
    randomTemperature = (Math.random() * Math.floor(50)).toFixed(2); // Deux chiffres après la virgule
    addTemperature(new Date().toLocaleTimeString(), randomTemperature);
}

function addTemperature(time, temperature) {
    /* Ajoute la valeur en X */
    config.data.labels.push(time);

    /* Ajoute la valeur */
    config.data.datasets[0].data.push(temperature);

    /* Rafraichir le graphique */
    chart.update();
}

let data = []; // Supposons que c'est votre tableau de données

function shareData() {
    // Obtenez la dernière donnée
    const lastData = data[data.length - 1];

    // Convertissez la dernière donnée en JSON
    const json = JSON.stringify(lastData);

    // Logique pour partager les données
    // Par exemple, vous pouvez l'afficher dans la console pour le moment
    console.log(json);
}