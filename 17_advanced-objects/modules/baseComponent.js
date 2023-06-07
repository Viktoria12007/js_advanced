import ComponentError from "./componentError.js";

export default class BaseComponent {
    address = 'surgutskaya';
    constructor(selector, data = null, showLoader = true, showErrorState = true) {
        this.selector = selector;
        const currentContainer = document.querySelector(this.selector);
        if (!currentContainer) {
            throw new ComponentError();
         }
        this.showLoader = showLoader;
        this.showErrorState = showErrorState;
        this.data = data;
    }
    
    setShowLoader() {
        const spinner = document.getElementById('spinner');
       
        if (!this.showLoader) {
            console.log(this.showLoader);
            spinner.classList.add('loaded');
         }
        else {
            console.log(this.showLoader);
            spinner.classList.remove('loaded');
        }
    }
    appendElement(currentElement) {
        const currentContainer = document.querySelector(this.selector);
        currentContainer.append(currentElement);
    }
    hideSpinner(action, currentElement = null) {
        const spinner = document.getElementById('spinner');
        spinner.classList.add('loaded_hiding');
         window.setTimeout(() => {
             spinner.classList.add('loaded');
             spinner.classList.remove('loaded_hiding');
             if (action === 'create') {
             this.appendElement(currentElement);
             }
         }, 500);
     }
    static wait(ms) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, ms);
        });
      }
    static async fetch() {
        await wait(3000);
        return {}
      }
}