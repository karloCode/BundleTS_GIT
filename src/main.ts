import '../sass/helperClasses.scss';
import '../sass/style.scss';
import FetchApi from './fetchApi';

const api = new FetchApi();

import {
   queryHTMLElement as element,
   queryButtonElement as buttonElem,
   queryFormElement as formElem,
   queryInputElements as inputElem,
   queryListElements as listElem
} from './getElements';

const root = element('root');

const homeUrl: string = window.location.href;

 
(async function() {
   try {
      const data: [{_id: string, name: string, age: number, gender: string}] = await api.getAll('https://young-reef-15976.herokuapp.com');
      
      let tempContentStore: string = ``;
      data.forEach(person => {
         const {_id, name, age, gender } = person
         tempContentStore += `
            <li class="list-group-item" id="${_id}" id="${_id}">Name: ${name}</li>
         `;
      });

      root.innerHTML = `
         <ul id="listGroup" class="hc-d-block">
            ${tempContentStore}
         </ul>
      `;
      
      const list = listElem('list-group-item');
      getPerson(list);

   } catch (error) {
      console.log(error)
   }
})();

function getPerson(item: NodeListOf<Element>) {
   item.forEach(i => {
      i.addEventListener('click', async() => {
         try {
            const data: [{_id: string, name: string, age: number, gender: string}] = await api.getOne('https://young-reef-15976.herokuapp.com/getPerson', i.id)
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
         } catch (error) {
            console.log(error);
            window.location.href = homeUrl;
         }
         
      });
   });
}

(function() {
   const addPersonBtn = element('addPersonBtn');
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

      const form = formElem('addForm');
      const inputs = inputElem(['name', 'age', 'gender']);

      const formBody: object = getInputs(inputs)
      submitAddForm(form, formBody);
   })
})();

function getInputs(inputs: HTMLInputElement[]) : object {
   let tempInputStore: object = {};
   inputs.forEach(input => {
      input.addEventListener('input', () => {
         const { name, value } = input
         tempInputStore = Object.assign(tempInputStore, { [name]: value })
      })
   })

   return tempInputStore;
}

function submitAddForm(form: HTMLFormElement, formBody: object) {
   form.addEventListener('submit', async e => {
      e.preventDefault();
      let errors: string[] = [];
      try {
         const data: { 
            name: string, 
            age: number, 
            gender: string, 
            error: string, 
            errors: string[] } = await api.post('https://young-reef-15976.herokuapp.com/addPerson', formBody);

            if(data.error) {
               errors.push(...data.errors);
               throw new Error(data.error);
            }

            window.location.href = homeUrl;

      } catch (error) {
         console.log(error);
         const errorMsgs = element('errorMsgs');
         errors.forEach((err, index) => {
            errorMsgs.innerHTML += `
               <li class="warning err-msg">${err} <span class="close-btn" id="${index}">&times;</span></li>
            `;
         })

         const list = listElem('err-msg');
         list.forEach(li => {
            li.children[0].addEventListener('click', () => {
               li.remove();
            })
         })
      }
   })
}