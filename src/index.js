import "./styles/index.scss"
import * as playerstats from "./playerstats"

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

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
        let picContainer = document.createElement("div");
        picContainer.setAttribute('class', 'pic-container')
        page.appendChild(picContainer);
        let pic = document.createElement("div");
        pic.setAttribute('class', 'faker-image');
        picContainer.appendChild(pic);
        setTimeout(() => {
            playerstats.topChampsData("Faker");
        }, 800);
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
        let picContainer = document.createElement("div");
        picContainer.setAttribute('class', 'pic-container')
        page.appendChild(picContainer);
        let pic = document.createElement("div");
        pic.setAttribute('class', 'bang-image');
        picContainer.appendChild(pic);
        setTimeout(() => {
            playerstats.topChampsData("Bang");
        }, 800);
    })

    // const bjergButton = document.querySelector("#bjergButton")
    // bjergButton.addEventListener('click', () => {
    //     let splash = document.querySelector(".splash");
    //     splash.remove();
    //     const h1 = document.createElement("h1");
    //     h1.textContent = "Bjergsen";
    //     h1.setAttribute('class', 'player-header');
    //     const page = document.querySelector(".page-container");
    //     page.appendChild(h1);
    //     let body = document.querySelector("body");
    //     body.classList.add("player-page");
    //     let picContainer = document.createElement("div");
    //     picContainer.setAttribute('class', 'pic-container')
    //     page.appendChild(picContainer);
    //     let pic = document.createElement("div");
    //     pic.setAttribute('class', 'bjerg-image');
    //     picContainer.appendChild(pic);
    //     setTimeout(() => {
    //         playerstats.topChampsData("Bjergsen");
    //     }, 50);

    // })

    const jensenButton = document.querySelector("#jensenButton")
        jensenButton.addEventListener('click', () => {
        let splash = document.querySelector(".splash");
        splash.remove();
        const h1 = document.createElement("h1");
        h1.textContent = "Jensen";
        h1.setAttribute('class', 'player-header');
        const page = document.querySelector(".page-container");
        page.appendChild(h1);
        let body = document.querySelector("body");
        body.classList.add("player-page");
        let picContainer = document.createElement("div");
        picContainer.setAttribute('class', 'pic-container')
        page.appendChild(picContainer);
        let pic = document.createElement("div");
        pic.setAttribute('class', 'jensen-image');
        picContainer.appendChild(pic);
        setTimeout(() => {
            playerstats.topChampsData("Jensen");
        }, 800);

    })

});    