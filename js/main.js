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
        console.log(error);
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
                  <button class="btn primary" id="editBtn">Edit</button>
                  <button class="btn danger" id="delBtn">Delete</button>
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
(function () {
    const addPersonBtn = getElements_1.queryHTMLElement('addPersonBtn');
    addPersonBtn.addEventListener('click', () => {
        root.innerHTML = `
         <form id="addForm">
         <div id="errorMsgs"></div>
            <input type="text" id="name" name="name" class="add-inputs" placeholder="Name">
            <input type="number" id="age" name="age" class="add-inputs" placeholder="Age">
            <input type="text" id="gender" name="gender" class="add-inputs" placeholder="Gender">
            <input type="submit" class="btn success" value="Submit">
            <button class="btn dark">Cancel</button>
         </form>
      `;
        const form = getElements_1.queryFormElement('addForm');
        const inputs = getElements_1.queryInputElements(['name', 'age', 'gender']);
        const formBody = getInputs(inputs);
        submitAddForm(form, formBody);
    });
})();
function getInputs(inputs) {
    let tempInputStore = {};
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const { name, value } = input;
            tempInputStore = Object.assign(tempInputStore, { [name]: value });
        });
    });
    return tempInputStore;
}
function submitAddForm(form, formBody) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let errors = [];
        try {
            const data = await api.post('https://young-reef-15976.herokuapp.com/addPerson', formBody);
            if (data.error) {
                errors.push(...data.errors);
                throw new Error(data.error);
            }
            window.location.href = homeUrl;
        }
        catch (error) {
            console.clear();
            console.log(error);
            console.log({ errors });
            const errorMsgs = getElements_1.queryHTMLElement('errorMsgs');
            errorMsgs.innerHTML = '';
            errors.forEach(err => {
                errorMsgs.innerHTML += `
               <li class="warning err-msg">${err} <span class="close-btn">&times;</span></li>
            `;
            });
            const list = getElements_1.queryListElements('err-msg');
            list.forEach(li => {
                li.children[0].addEventListener('click', () => {
                    li.remove();
                });
            });
        }
    });
}
