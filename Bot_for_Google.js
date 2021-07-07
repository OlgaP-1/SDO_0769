// ==UserScript==
// @name         Google Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Chizhikov Sergey
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://psyholog.me/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @grant        none
// ==/UserScript==


let sites = {
    "napli.ru":['вывод произвольных полей wordpress', 'Отключение редакций и ревизий в WordPress', '10 самых популярных шрифтов от Google'],
    "psyholog.me":['центр здоровых отношений "Запятая"', 'Услуги центра здоровых отношений', 'Чекалина Елена психолог'],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['как звучит кларнет', 'как звучит гобой', 'Музыкальные диктанты']
};

let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];

let keywords = sites[site];
let googleInput = document.getElementsByName("q")[0];
let keyword = keywords[getRandom(0, keywords.length)];

let btnK = document.getElementsByName("btnK")[0];
let links = document.links;
let i = 0;

if (btnK !== undefined) {
    document.cookie = `site = ${site}`;
}else if(location.hostname == "www.google.com"){
    site = getCookie("site");
}else{
    site = location.hostname;
}


if (btnK !== undefined) {
    document.cookie = `site = ${site}`;
    let timerId = setInterval(() => {
        googleInput.value += keyword[i];
        i++;
        if (i == keyword.length) {
            clearInterval(timerId);
            btnK.click();
        }
    }, 650);

} else if(location.hostname == site) {
    console.log("Мы на Napli!")

    setInterval(()=>{
        let index = getRandom(0,links.length);
        if(getRandom(0,101)>=80) {
            location.href = "https://www.google.com";
        }
        else if (links[index].href.indexOf(site) !== -1)
            links[index].click();
    }, getRandom(1000,5000));


} else {
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes(site)) {
            let link = links[i];
            let nextGooglePage = false;
            console.log("Найдена строка " + links[i]);
            setTimeout(() => {
                link.click();
            }, getRandom(2500, 4500));

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

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
