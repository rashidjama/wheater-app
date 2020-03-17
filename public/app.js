// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=ddcda21a40302eb72786fa7fcaeec045";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
console.log(newDate);


const getData = async url => {
    const data = await fetch(url);
    const result = await data.json();
    return result;
}

const postData = async (url, mydata) => {
    const data = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mydata)
    });
    const result = await data.json();
    return result;
}

const updateUI = aData => {
    document.getElementById("date").textContent = aData.date;
    document.getElementById("content").textContent = `${aData.name} feels ${aData.feel} today`;
    document.getElementById("temp").textContent = `The temperature is ${aData.temp}`;
}

document.getElementById("generate").addEventListener("click", async () => {
    let zipValue = document.getElementById("zip").value;
    if (!zipValue) {
        zipValue = 33101;
    }

    let feeling = document.getElementById("feelings").value || "Good";

    //Response from API
    const respFromAPI = await getData(baseURL + zipValue + apiKey);

    //obj for the DOM
    const anObj = {
        temperature: respFromAPI.main.temp,
        feeling: feeling,
        date: newDate
    }
    //Response from server.
    const respFromServer = await postData("/postData", anObj);

    //Data received from Server by Get 
    const respFromGet = await getData("/getData");

    updateUI(respFromGet);

})