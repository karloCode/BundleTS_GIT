"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../sass/helperClasses.scss");
require("../sass/style.scss");
const fetchApi_1 = __importDefault(require("./fetchApi"));
const api = new fetchApi_1.default();
const getElements_1 = require("./getElements");
const root = getElements_1.queryHTMLElement('root');
const nav = document.querySelector('nav');
console.log(nav.offsetHeight);
(async function () {
    try {
        const data = await api.getAll('https://young-reef-15976.herokuapp.com');
        let tempContentStore = ``;
        data.forEach(person => {
            const { name, age, gender } = person;
            tempContentStore += `
            <li class="list-group-item">Name: ${name}</li>
         `;
        });
        root.innerHTML = `
         <ul id="listGroup" class="hc-d-block">
            ${tempContentStore}
         </ul>
      `;
        console.log(data);
    }
    catch (error) {
        console.log('something is wrong');
    }
})();
