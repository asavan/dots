"use strict";

function initField(fieldSize, className, elem) {
    for (let i = 0; i < fieldSize; i++) {
        const cell = document.createElement("div");
        cell.className = className;
        elem.appendChild(cell);
    }
}

const randomInteger = (min, max) => {
    const rand = min + Math.random() * (max - min);
    return Math.floor(rand);
};

const randomIndex = (size) => randomInteger(0, size);
const randomElem = (arr) => arr[randomIndex(arr.length)];

const svgToDataURL = svgStr => {
    const encoded = encodeURIComponent(svgStr)
        .replace(/'/g, "%27")
        .replace(/"/g, "%22");

    const header = "data:image/svg+xml;utf8,";
    const dataUrl = header + encoded;
    return dataUrl;
};


function makeSvgIcon(color) {
    const svgStr =
    `<svg viewBox='0 0 120 120' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <circle fill='#color' cx='60' cy='60' r='50'/>
    </svg>`;
    return svgStr.replace("#color", color);
}

const colors = ["#ff7e00", "#ef88b5",
    "#fdbf43", "#77c566",
    "#ab63c2", "#3cc0f0",
    "#fe4e55", "#00b6a3"
];

const fieldSize = 36;

const randomColor = () => randomElem(colors);

const box = document.getElementsByClassName("grid")[0];
initField(fieldSize, "dot", box);

const c = box.children;

for (let i = 0; i < c.length; i++) {
    c[i].style.backgroundColor = randomColor();
}


function changeIcon(color) {
    let link = document.getElementById("favicon");
    if (!link) {
        link = document.createElement("link");
        link.id = "favicon";
        link.rel = "shortcut icon";
        link.sizes = "any";
        link.type = "image/svg+xml";
        document.head.appendChild(link);
    }

    const svgText = makeSvgIcon(color);
    link.href = svgToDataURL(svgText);
}

let prevColor = null;
box.onclick = function (e) {
    e.preventDefault();
    if (e.target.classList.contains("dot")) {
        const color = e.target.style.backgroundColor;
        if (prevColor) {
            changeIcon(prevColor);
        } else {
            changeIcon(randomColor());
        }
        prevColor = color;
        e.target.classList.add("disabled");
    }
};

changeIcon(randomColor());

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
    }
}
