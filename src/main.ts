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


(async function() {
   try {
      const data: [{name: string, age: number, gender: string}] = await api.getAll<[{name: string, age: number, gender: string}]>('https://young-reef-15976.herokuapp.com');
      console.log(data)
   } catch (error) {
      console.log(error)
   }
})();