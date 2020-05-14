"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FetchApi {
    constructor() {
    }
    getAll(url) {
        return fetch(`${url}/`, { method: 'get' })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    getOne(url, _id) {
        return fetch(`${url}/${_id}`, { method: 'get' })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    post(url, body) {
        return fetch(`${url}/`, {
            method: 'post',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(body)
        })
            .then(response => {
            if (!response.ok) {
                return response.json();
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    put(url, _id, body) {
        return fetch(`${url}/${_id}`, {
            method: 'put',
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(body)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
    delete(url, _id) {
        return fetch(`${url}/${_id}`, {
            method: 'delete',
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }
}
exports.default = FetchApi;
