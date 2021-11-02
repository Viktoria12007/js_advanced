import ComponentError from "./componentError.js";

export default class BaseComponent {
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
    // set selector(value) {
    //     const currentElement = document.querySelector(value);
    //     if (!currentElement) {
    //         throw new ComponentError();
    //      }
    //     this._selector = value;
    // }
    // get selector() {
    //     return this._selector;
    // }
    // static set showLoader(value) {
    //     // const spinner = document.getElementById('spinner');
    //     this._showLoader = value;
    //     if (!value) {
    //     //     console.log('fgdsfg');
    //         this.spinnerElement.classList.add('loaded');
    //      }
    //     else {
    //         this.spinnerElement.classList.remove('loaded');
    //     }
        
    // }
    // static get showLoader() {
    //     return this._showLoader;
    // }
    // setShowError() {
        // const info = document.getElementById('info');
        // // if (action !== null) {

        // // }
        // if (this.showErrorState) {
        // //     console.log('fgdsfg');
        // console.log(this.showErrorState);
        //     info.classList.add('show');
        //  }
        // else {
        //     console.log(this.showErrorState);
        //     info.classList.remove('show');
        // }


    //     console.log(this.showErrorState);
    //     return this.showErrorState;
    // }
    setShowLoader() {
        const spinner = document.getElementById('spinner');
        // if (action !== null) {

        // }
        if (!this.showLoader) {
        //     console.log('fgdsfg');
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
        // if (!currentContainer) {
        //     throw new ComponentError();
        //  }
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