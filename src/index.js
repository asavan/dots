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


const colors = ["ff7c00", "ef88b5", "fdbf43", "77c465", "ab63c2", "3cc0f0", "fe4e55", "77c566", "00b6a3", "ff7e00", "ff4f5b"];

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

box.onclick = function (e) {
    e.preventDefault();
    if (e.target.classList.contains('dot')) {
        e.target.classList.add("disabled");
    }
};

