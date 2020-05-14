export default class FetchApi {
   constructor() {

   }

   getAll<T>(url: string): Promise<T> {
      return fetch(`${url}/`, { method: 'get'})
      .then(response => {
         if(!response.ok) {
            throw new Error(response.statusText)
         }

         return response.json();
      })  
      
   }

   getOne<T>(url: string, _id: string) : Promise <T> {
      return fetch(`${url}/${_id}`, { method: 'get'})
      .then(response => {
         if(!response.ok) {
            throw new Error(response.statusText)
         }

         return response.json();
      })  
   }

   post<T>(url: string, body: object) : Promise <T> {
      return fetch(`${url}/`, {
         method: 'post',
         headers: { "Content-Type": "application/json; charset=utf-8"},
         body: JSON.stringify(body)
      })
      .then(response => {
         if(!response.ok) {
            return response.json();
            throw new Error(response.statusText)
         }
         return response.json();
      })
   }

   put<T>(url: string, _id: string, body: object) : Promise <T> {
      return fetch(`${url}/${_id}`, {
         method: 'put',
         headers: { "Content-Type": "application/json; charset=utf-8"},
         body: JSON.stringify(body)
      })
      .then(response => {
         if(!response.ok) {
            throw new Error(response.statusText)
         }
         return response.json();
      })
   }

   delete<T>(url: string, _id: string) : Promise <T> {
      return fetch(`${url}/${_id}`, {
         method: 'delete',
      })
      .then(response => {
         if(!response.ok) {
            throw new Error(response.statusText)
         }
         return response.json();
      })
   }
}