!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="./dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);const r=["ff7c00","ef88b5","fdbf43","77c465","ab63c2","3cc0f0","fe4e55","77c566","00b6a3","ff7e00","ff4f5b"],o=function(){const e=((e,t)=>{let n=e+Math.random()*(t-e);return Math.floor(n)})(0,r.length);return"#"+r[e]},c=document.getElementsByClassName("grid")[0];!function(e,t,n){for(let r=0;r<e;r++){const e=document.createElement("div");e.className=t,n.appendChild(e)}}(36,"dot",c);const f=c.children;for(let e=0;e<f.length;e++)f[e].style.backgroundColor=o();c.onclick=function(e){e.preventDefault(),e.target.classList.contains("dot")&&e.target.classList.add("disabled")}},function(e,t,n){}]);