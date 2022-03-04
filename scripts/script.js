// f3c375c7c556656ede3705bf4e1cafaa
// -16.6869872
// -49.2397506
const apiKey = "f3c375c7c556656ede3705bf4e1cafaa"
let lat;
let lon;

function pegarLocalizacao(callback) {
    if("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude
            lon = position.coords.longitude;
            console.log(lat);
            console.log(lon); 
            callback();
        }, function(erro){
            console.log(erro);
        })
    }else {
        alert("Navegador muito antigo");
    }
    // console.log(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
}

function pegarClima() {
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((response) => {
        let temp = (response.data.main.temp * 1) -273.15;
        let sensacao = (response.data.main.feels_like * 1) -273.15;
        let tempMax = (response.data.main.temp_max * 1) -273.15;
        let tempMin = (response.data.main.temp_min * 1) -273.15;
        document.querySelector(".sensacao").innerHTML += sensacao.toFixed(2);
        document.querySelector(".temp-atual").innerHTML += temp.toFixed(2);
        document.querySelector(".umidade").innerHTML += response.data.main.humidity;
        document.querySelector(".temp-max").innerHTML += tempMax.toFixed(2);
        document.querySelector(".temp-min").innerHTML += tempMin.toFixed(2);
    });
}

pegarLocalizacao(pegarClima);
// pegarClima();
// setTimeout(() => {pegarClima()},2000);