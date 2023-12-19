document.addEventListener("DOMContentLoaded", function () {
    // Simuler des données de température et d'humidité depuis la base de données
    const temperatureData = [20, 22, 25, 18, 23];
    const humidityData = [50, 55, 60, 45, 58];

    // Afficher les données météo
    const tempValue = document.getElementById("tempValue");
    const humidityValue = document.getElementById("humidityValue");

    tempValue.innerText = temperatureData[temperatureData.length - 1];
    humidityValue.innerText = humidityData[humidityData.length - 1];

    // Créer le graphique
    const ctx = document.getElementById("weatherChart").getContext("2d");

    const weatherChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [
                {
                    label: "Température (°C)",
                    data: temperatureData,
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Humidité (%)",
                    data: humidityData,
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Fonction pour partager les données (à remplacer par une logique réelle)
    window.shareData = function () {
        alert("Données partagées !");
    };
});
