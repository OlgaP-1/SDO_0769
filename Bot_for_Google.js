// ==UserScript==
// @name         Google Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Chizhikov Sergey
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==


let keywords = [
"DevTools — очень полезная штука для разработчика",
       "Редакции — это резервные копии",
    "Google Fonts очень популярны",
];
let googleInput = document.getElementsByName("q")[0];
let keyword = keywords[getRandom(0, keywords.length)];

let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let i = 0;


if (btnK !== undefined) {
    let timerId = setInterval(() => {
        googleInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            btnK.click();
        }
    }, 650);

   } else if(location.hostname == "napli.ru") {
    console.log("Мы на Napli!")

    setInterval(()=>{
    let index = getRandom(0,links.length);
    if(getRandom(0,101)>=80) {
    location.href = "https://www.google.com";
    }
    else if (links[index].href.indexOf("napli.ru") !== -1)
    links[index].click();
    }, getRandom(1000,5000));


} else {
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes("napli.ru")) {
            let link = links[i];
            let nextGooglePage = false;
            console.log("Найдена строка " + links[i]);
            setTimeout(() => {
                link.click();
            }, getRandom(1000, 4000));

            break;
        }
    }
    if (document.querySelector(".YyVfkd").innerText == "5") {
        let nextGooglePage = false;
        location.href = "https://www.google.com";
    }
    if (nextGooglePage) {
        setTimeout(() => {
            pnnext.click();
        }, getRandom(2000, 4500));
    }
}





function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
