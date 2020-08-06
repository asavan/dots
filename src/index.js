"use strict";
import "./css/style.css";

// import settings from "./helper.js";

function launch(f, window, document) {
    if (document.readyState !== 'loading') {
        f(window, document);
    } else {
        document.addEventListener("DOMContentLoaded", function (event) {
            f(window, document);
        });
    }
}

function initField(fieldSize, className, elem) {
    for (let i = 0; i < fieldSize; i++) {
        const cell = document.createElement('div');
        cell.className = className;
        elem.appendChild(cell);
    }
}

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

const svgToDataURL = svgStr => {
    const encoded = encodeURIComponent(svgStr)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');

    const header = 'data:image/svg+xml;utf8,';
    const dataUrl = header + encoded;
    return dataUrl;
}


function makeSvgIcon(color) {
    const svgStr = "<svg viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg'><circle fill='#color' cx='60' cy='60' r='50'/></svg>";
    return  svgStr.replace('#color', color);
}

const colors = ["ff7c00", "ef88b5", "fdbf43", "77c465",
    "ab63c2", "3cc0f0", "fe4e55", "77c566", "00b6a3",
    "ff7e00", "ff4f5b"];

const randomColor = function () {
    const index = randomInteger(0, colors.length);
    return '#' + colors[index];
}

const box = document.getElementsByClassName("grid")[0];
initField(36, "dot", box);

const c = box.children;
for (let i = 0; i < c.length; i++) {
    c[i].style.backgroundColor = randomColor();
}


function changeIcon(color) {
    const link = document.getElementById('favicon');
    if (!link) {
        console.error("Can't find favicon");
    }

    const svgText = makeSvgIcon(color);
    console.log(svgText);

    link.href = svgToDataURL(svgText);
}

box.onclick = function (e) {
    e.preventDefault();
    if (e.target.classList.contains('dot')) {
        const color = e.target.style.backgroundColor;
        changeIcon(color);
        e.target.classList.add("disabled");
    }
};

changeIcon(randomColor());
