class ComponentError extends Error {
    constructor() {
        super('Такого элемента не существует!');
    }
}

class BaseComponent {
    constructor(selector, data = null, showLoader = true, showErrorState = true) {
        this.selector = selector;
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
    setShowError() {
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
        console.log(this.showErrorState);
        return this.showErrorState;
    }
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
        if (!currentContainer) {
            throw new ComponentError();
         }
        currentContainer.append(currentElement);
    }
    hideSpinner(action, currentElement = null) {
    const spinner = document.getElementById('spinner');
    // this.spinnerElement = spinner;
    //  if (this.showLoader) {
    //      console.log('dwdwd');
        spinner.classList.add('loaded_hiding');
         window.setTimeout(() => {
             spinner.classList.add('loaded');
             spinner.classList.remove('loaded_hiding');
             if (action === 'create') {
             this.appendElement(currentElement);
             }
         }, 500);
     }
    //  else {
    //      spinner.classList.add('loaded');
    //  }
//   }
}

export default class AddToCartComponent extends BaseComponent {
    constructor(selector, count, show = true) {
        if (typeof count !== "number" || count < 0) {
          throw new TypeError('Количество товара не может быть меньше нуля!');
        }
        super(selector, count, show);
        this.count = count;
        // super.appendElement(this.getElement());
        console.log(this.showLoader);
        // if (show) {
        super.hideSpinner('create', this.getElement());
        // }
        // else {
        //     super.appendElement(this.getElement());
        // }
    }
    set count(quantity) {
        this._count = quantity;
        if (this.displayCount)
         this.displayCount.textContent = quantity;
    }
    get count() {
        return this._count;
    }
    // static setShowLoader() {
    //     // console.log(this.showLoader);
    //     const spinner = document.getElementById('spinner');
    //     // console.log(spinner);
    //     if (!this.showLoader) {
    //         console.log('fgdsfg');
    //         console.log(this.showLoader);
    //         spinner.classList.add('loaded');
    //      }
    //     else {
    //         console.log('zzzz');
    //         console.log(this.showLoader);
    //         spinner.classList.remove('loaded');
    //     }
    // }
    increase() {
        ++this.count;
    }
    decrease() {
        if (this.count === 0) {
            return;
        }
        --this.count;
    }
    getElement() {
        const currentContainer = document.querySelector(this.selector);
        if (this.count === 0) {
            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Добавить в корзину';
            addToCartButton.classList.add('btn', 'btn-dark');
            addToCartButton.addEventListener('click', () => {
               this.increase();
            //    this.getElement();
               currentContainer.innerHTML = '';
               super.appendElement(this.getElement());
            })
            return addToCartButton;
        }
        else {
            const wrapButtons = document.createElement('div');
            wrapButtons.classList.add('d-flex', 'align-items-center');

            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.classList.add('btn', 'btn-outline-dark', 'me-3');
            decreaseButton.addEventListener('click', () => {
               
                if (this.count === 1) {
                    currentContainer.innerHTML = '';
                    this.decrease();
                    super.appendElement(this.getElement());
                }
                else {
                    this.decrease();
                }
                
             })
            
            const displayCount = document.createElement('div');
            displayCount.classList.add('me-3');
            this.displayCount = displayCount;
            displayCount.textContent = this.count;

            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.classList.add('btn', 'btn-outline-dark');
            increaseButton.addEventListener('click', () => {
                this.increase();
             })
            
            wrapButtons.append(decreaseButton, displayCount, increaseButton);

            return wrapButtons;
        }
    } 
    static wait(ms) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, ms);
        });
      }
    static async fetch(selector, number, showSpinner, showError) {
      baseComponent = new BaseComponent(selector, number, showSpinner, showError);
      baseComponent.setShowLoader();
    //   baseComponent.setShowError();
        await this.wait(3000);
            //    throw new Error('Yhooo!');  // Симулировать ошибку при неудачной загрузке данных при вызове метода fetch
            return new AddToCartComponent(selector, number, showSpinner, showError);
    
            // return  {
            //     cartComponent: new AddToCartComponent(selector, number, show),
            //     baseComponent: base
            // }
            
      }
}
let baseComponent;

async function startLoad(selector, number, showSpinner, showError) {
    const info = document.getElementById('info');
try {
    // let countCart;
    
    const againLoad = document.getElementById('repetLoad');
    againLoad.addEventListener('click', async () => {
        // startLoad('#container', 5, true, true);
        // await AddToCartComponent.fetch('#container', 5, true, true);
        info.classList.remove('show');
        startLoad(selector, number, showSpinner, showError);
    })
    // AddToCartComponent.setShowLoader();
    // async function startLoad(selector, number, showSpinner, showError) {
    // const countCart = await AddToCartComponent.fetch(selector, number, showSpinner, showError);
    // BaseComponent.hideSpinner('create', countCart);
    // console.log(countCart);
    // return await AddToCartComponent.fetch(selector, number, showSpinner, showError);
    // }
    // startLoad('#container', 5, true, true);
    await AddToCartComponent.fetch(selector, number, showSpinner, showError);

    // const againLoad = document.getElementById('again');
    // againLoad.addEventListener('click', () => {
    //     startLoadh('#container', 5, false);
    // })
    // const countCart = await AddToCartComponent.fetch(selector, number, show);
    // console.log(countCart);
}
catch(error) {
    console.log(error);
   
    if (baseComponent.setShowError()) {
    info.classList.add('show');
    }
    else {
        info.classList.remove('show');
    }
}
finally {
    // const base = new BaseComponent();
   baseComponent.hideSpinner('don`t create');
}
}

startLoad('#container', 5, true, true);