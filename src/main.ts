import '../sass/helperClasses.scss';
import '../sass/style.scss';
import FetchApi from './fetchApi';

const api = new FetchApi();

import {
   queryHTMLElement as element,
   queryButtonElement as buttonElem,
   queryFormElement as formElem,
   queryInputElements as inputElem
} from './getElements';

const root = element('root');
const nav = document.querySelector('nav') !;
console.log(nav.offsetHeight);
 
(async function() {
   try {
      const data: [{name: string, age: number, gender: string}] = await api.getAll<[{name: string, age: number, gender: string}]>('https://young-reef-15976.herokuapp.com');
      
      let tempContentStore: string = ``;
      data.forEach(person => {
         const { name, age, gender } = person
         tempContentStore += `
            <li class="list-group-item">Name: ${name}</li>
         `;
      });

      root.innerHTML = `
         <ul id="listGroup" class="hc-d-block">
            ${tempContentStore}
         </ul>
      `;
      console.log(data)
   } catch (error) {
      console.log('something is wrong')
   }
})();

