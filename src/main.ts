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
               const {_id, name, age, gender } = i;
               root.innerHTML = `
                  <ul>
                     <li class="list-group-item">Name: ${name}</li>
                     <li class="list-group-item">Age: ${age}</li>
                     <li class="list-group-item">Gender: ${gender}</li>
                  </ul>
                  <button class="btn primary" id="editBtn">Edit</button>
                  <button class="btn danger" id="delBtn">Delete</button>
               `;

               const delBtn = buttonElem('delBtn');
               const editBtn = buttonElem('editBtn');

               editPerson(editBtn, i);
               deletePerson(delBtn, _id);
            });

            

         } catch (error) {
            console.log(error);
            window.location.href = homeUrl;
         }
         
      });
   });
}

function editPerson(editBtn: HTMLButtonElement, person: {_id: string, name: string, age: number, gender: string }) {
   editBtn.addEventListener('click', () => {
      const { _id, name, age, gender } = person
      root.innerHTML = `
         <form id="editForm">
            <input type="text" id="editName" name="name" class="add-inputs" placeholder="Name" value="${name}">
            <input type="number" id="editAge" name="age" class="add-inputs" placeholder="Age" value="${age}">
            <input type="text" id="editGender" name="gender" class="add-inputs" placeholder="Gender" value="${gender}">
            <input type="submit" class="btn success" value="Submit">
            <button class="btn dark" id="cancelEdit">Cancel</button>
         </form>
      `;

      const editForm = formElem('editForm');
      const cancelEdit = buttonElem('cancelEdit');

      cancelEdit.addEventListener('click', () => {
         window.location.href = homeUrl;
      });

      const inputs = inputElem(['editName', 'editAge', 'editGender']);
      const formBody = getInputs(inputs)
      editForm.addEventListener('submit', async function(e) {
         e.preventDefault()
         try {
            const data: { name: string, age: number, gender: string, error: string} = await api.put('https://young-reef-15976.herokuapp.com/updatePerson', _id, formBody);
            
            if(data.error) {
               throw new Error(data.error);
            }

            window.location.href = homeUrl;
            
         } catch (error) {
            console.log(error)
         }
      })
   })
}

function deletePerson(delBtn: HTMLButtonElement, _id: string) {
   delBtn.addEventListener('click', async() => {
      try {
         const data: { name: string, age: number, gender: string, error: string } = await api.delete('https://young-reef-15976.herokuapp.com/deletePerson', _id);

         if(data.error) {
            throw new Error(data.error);
         }

         window.location.href = homeUrl;
      } catch (error) {
         console.log(error)
      }
   })
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
         console.clear()
         console.log(error);
         console.log({ errors })
         const errorMsgs = element('errorMsgs');

         errorMsgs.innerHTML = '';
         errors.forEach(err => {
            errorMsgs.innerHTML += `
               <li class="warning err-msg">${err} <span class="close-btn">&times;</span></li>
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