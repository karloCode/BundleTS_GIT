"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryHTMLElement(id) {
    return document.querySelector(`#${id}`);
}
exports.queryHTMLElement = queryHTMLElement;
function queryInputElements(id_s) {
    return id_s.map(elem => {
        return document.querySelector(`#${elem}`);
    });
}
exports.queryInputElements = queryInputElements;
function queryButtonElement(id) {
    return document.querySelector(`#${id}`);
}
exports.queryButtonElement = queryButtonElement;
function queryFormElement(id) {
    return document.querySelector(`#${id}`);
}
exports.queryFormElement = queryFormElement;
function queryListElements(className) {
    return document.querySelectorAll(`.${className}`);
}
exports.queryListElements = queryListElements;
