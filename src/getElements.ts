export function queryHTMLElement(id: string) : HTMLElement {
   return document.querySelector(`#${id}`) ! as HTMLElement;
}

export function queryInputElements(id_s: string[]) : HTMLInputElement[] {
   return id_s.map(elem => {
      return document.querySelector(`#${elem}`) ! as HTMLInputElement;
   })
}

export function queryButtonElement(id: string): HTMLButtonElement {
   return document.querySelector(`#${id}`) ! as HTMLButtonElement;
}

export function queryFormElement(id: string): HTMLFormElement {
   return document.querySelector(`#${id}`) ! as HTMLFormElement;
}
