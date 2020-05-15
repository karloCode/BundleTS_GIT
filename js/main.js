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
const homeUrl = window.location.href;
(async function () {
    try {
        const data = await api.getAll('https://young-reef-15976.herokuapp.com');
        let tempContentStore = ``;
        data.forEach(person => {
            const { _id, name, age, gender } = person;
            tempContentStore += `
            <li class="list-group-item" id="${_id}" id="${_id}">Name: ${name}</li>
         `;
        });
        root.innerHTML = `
         <ul id="listGroup" class="hc-d-block">
            ${tempContentStore}
         </ul>
      `;
        const list = getElements_1.queryListElements('list-group-item');
        getPerson(list);
    }
    catch (error) {
        console.log('something is wrong');
    }
})();
function getPerson(item) {
    item.forEach(i => {
        i.addEventListener('click', async () => {
            try {
                const data = await api.getOne('https://young-reef-15976.herokuapp.com/getPerson', i.id);
                data.forEach(i => {
                    const { name, age, gender } = i;
                    root.innerHTML = `
                  <ul>
                     <li class="list-group-item">Name: ${name}</li>
                     <li class="list-group-item">Age: ${age}</li>
                     <li class="list-group-item">Gender: ${gender}</li>
                  </ul>
               `;
                });
            }
            catch (error) {
                console.log(error);
                window.location.href = homeUrl;
            }
        });
    });
}
