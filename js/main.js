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
(async function () {
    try {
        const data = await api.getAll('https://young-reef-15976.herokuapp.com');
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
})();
