window.onload = async function getWeather() {
    initMap();
    const date = new Date();
    var request = new XMLHttpRequest();
    request.open("GET", "../json/citta.json", false);
    request.send(null);

    if (request.readyState == 4 && request.status == 200) {
        var cittaJson = JSON.parse(request.responseText);
        const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Array of ids
        const responses = await Promise.all(
            ids.map(async i => {
                var response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + cittaJson[i].lat + "&lon=" + cittaJson[i].lon + "&exclude=hourly,minutely&units=metric&appid=e21c453d380f0ca1bc5d071698438e15", {
                    method: "GET"
                });

                var jsonObj = await response.json();
                console.log(jsonObj)
                if (!cittaJson[i].capital) {
                    document.getElementById('weather-temp-' + cittaJson[i].name).innerText = jsonObj.current.temp + "°";
                    document.getElementById('weather-temp-percepita-' + cittaJson[i].name).innerText = jsonObj.current.feels_like + "°";
                } else {
                    document.getElementById('weather-temp-' + cittaJson[i].name).innerText = jsonObj.current.temp + "°";
                    document.getElementById('weather-temp-percepita-' + cittaJson[i].name).innerText = jsonObj.current.feels_like + "°";
                    document.getElementById('weather-press-' + cittaJson[i].name).innerText = jsonObj.current.pressure + " hPa";
                    document.getElementById('weather-umi-' + cittaJson[i].name).innerText = jsonObj.current.humidity + "%";
                    document.getElementById('weather-vento-' + cittaJson[i].name).innerText = jsonObj.current.wind_speed + " m/sec";

                    //controllo cambio del mese
                    function addDays(theDate, days) {
                        return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
                    }

                    var newDate = addDays(new Date(), 5);
                    var ctx = document.getElementById('myChart' + (i + 2))
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: [
                                date.getDate() + '/' + (addDays(date, 1).getMonth() + 1),//mese da 0 a 11
                                date.getDate() + 1 + '/' + (addDays(date, 2).getMonth() + 1),
                                date.getDate() + 2 + '/' + (addDays(date, 3).getMonth() + 1),
                                date.getDate() + 3 + '/' + (addDays(date, 4).getMonth() + 1),
                                date.getDate() + 4 + '/' + (addDays(date, 5).getMonth() + 1),
                                date.getDate() + 5 + '/' + (addDays(date, 6).getMonth() + 1),
                                date.getDate() + 6 + '/' + (addDays(date, 7).getMonth() + 1),
                            ],
                            datasets: [{
                                data: [
                                    jsonObj.current.temp,
                                    jsonObj.daily[1].temp.day,
                                    jsonObj.daily[2].temp.day,
                                    jsonObj.daily[3].temp.day,
                                    jsonObj.daily[4].temp.day,
                                    jsonObj.daily[5].temp.day,
                                    jsonObj.daily[6].temp.day
                                ],
                                lineTension: 0,
                                backgroundColor: 'transparent',
                                borderColor: '#007bff',
                                borderWidth: 4,
                                pointBackgroundColor: '#007bff'
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: false
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            }
                        }
                    })
                }
            })
        );
    }
}

