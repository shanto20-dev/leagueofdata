import "./styles/index.scss"
import "./playerstats"
import {riotKey} from "./secret"
const fetch = require("node-fetch");

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    console.log(d3.csv('../data/2021_Match_Data.csv'))
    const stats = document.getElementById('stats');

    const fakerButton = document.querySelector("#fakerButton")
    fakerButton.addEventListener('click', () => {
        let splash = document.querySelector(".splash");
        splash.remove();
        const h1 = document.createElement("h1");
        h1.textContent = "Faker";
        h1.setAttribute('class', 'player-header');
        const page = document.querySelector(".page-container");
        page.appendChild(h1);
        let body = document.querySelector("body");
        body.classList.add("player-page");
    })

    const bangButton = document.querySelector("#bangButton")
    bangButton.addEventListener('click', () => {
        let splash = document.querySelector(".splash");
        splash.remove();
        const h1 = document.createElement("h1");
        h1.textContent = "Bang";
        h1.setAttribute('class', 'player-header');
        const page = document.querySelector(".page-container");
        page.appendChild(h1);
        let body = document.querySelector("body");
        body.classList.add("player-page");
    })

    const bjergButton = document.querySelector("#bjergButton")
    bjergButton.addEventListener('click', () => {
        let splash = document.querySelector(".splash");
        splash.remove();
        const h1 = document.createElement("h1");
        h1.textContent = "Bjergsen";
        h1.setAttribute('class', 'player-header');
        const page = document.querySelector(".page-container");
        page.appendChild(h1);
        const statsDiv = document.createElement("div");
        statsDiv.setAttribute('class', 'stats-div')
        page.appendChild(statsDiv);
        let body = document.querySelector("body");
        body.classList.add("player-page");

        const graphContainer = d3.select('.stats-div')
            .style('border', '1px solid red');

        graphContainer
            .selectAll('.bar')
            .data(FAKER_DATA)
            .enter()
            .append('div')
            .classed('bar', true)
            .style('height', data => (data.value * 15) + 'px');

    })

});    

const FAKER_DATA = [
    { id: 'd1', value: 10, region: 'KR'},
    { id: 'd2', value: 15, region: 'USA'},
    { id: 'd3', value: 30, region: 'USA'},
];








// async function fetchSumByName(summonerName){
//     while (summonerName.includes(" ")){
//         let spaceSpot = summonerName.indexOf(" ");    
//         summonerName = summonerName.substring(0, spaceSpot) + "%20" + summonerName.substring(spaceSpot+1);
//     }

//     const link = `https://na.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?${riotKey}`;
//     const testLink = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/meleetoplul?api_key=RGAPI-53586f80-debf-4349-907e-8053bf191232'

//     const response = await fetch(testLink);
//     const data = await response.json();
//     console.log(data);
//     return data
// }
