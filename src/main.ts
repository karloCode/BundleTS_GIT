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
      console.log('something is wrong')
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
               `;
            });
         } catch (error) {
            console.log(error);
            window.location.href = homeUrl;
         }
         
      })
   })
}