let search = document.getElementById('search');
let city = document.getElementById('searchedText');
let lat;
let lon;
search.addEventListener('click', async function () {
    console.log("CLICK");
    let response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city.value + "&limit=5&appid=e21c453d380f0ca1bc5d071698438e15", {
        method: "GET"
    });
    let jsonObj = await response.json();
    console.log("LAT LOT SEARCH")
    console.log(jsonObj[0]);
    if (jsonObj[0] == undefined) {
        alert('Città non trovata');
    } else {
        document.getElementById('cittaNascosto').removeAttribute('hidden')
        lat = jsonObj[0].lat;
        lon = jsonObj[0].lon;
        var response2 = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=metric&appid=e21c453d380f0ca1bc5d071698438e15", {
            method: "GET"
        });
        var jsonObj2 = await response2.json();
        document.getElementById('city-name').innerText = city.value;
        document.getElementById('weather-temp-city').innerText = jsonObj2.current.temp + "°";
        document.getElementById('weather-temp-percepita-city').innerText = jsonObj2.current.feels_like + "°";
        document.getElementById('weather-press-city').innerText = jsonObj2.current.pressure + " hPa";
        document.getElementById('weather-umi-city').innerText = jsonObj2.current.humidity + "%";
        document.getElementById('weather-vento-city').innerText = jsonObj2.current.wind_speed + " m/sec";
        var response5 = await fetch("https://api.unsplash.com/search/photos?client_id=JS6cTwzupVMwnF79Ii-aW7aZo-vChivv5pYqEpgWBtQ&page=1&query=" + city.value + "&orientation=squarish", {
            method: "GET"
        });
        var jsonObj5 = await response5.json();
        document.getElementById('imageSearchedPlace').setAttribute('src', jsonObj5.results[0].urls.small);

        feather.replace({ 'aria-hidden': 'true' })

        //Scelta Utente
        const date = new Date();
        //controllo cambio del mese
        function addDays(theDate, days) {
            return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
        }
        var ctx = document.getElementById('myChart')
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
                        jsonObj2.current.temp,
                        jsonObj2.daily[2].temp.day,
                        jsonObj2.daily[3].temp.day,
                        jsonObj2.daily[4].temp.day,
                        jsonObj2.daily[5].temp.day,
                        jsonObj2.daily[6].temp.day,
                        jsonObj2.daily[7].temp.day
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
        });
    }
});
