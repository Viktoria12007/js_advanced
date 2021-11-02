import BaseComponent from "./baseComponent.js";

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
        // hideSpinner('create', super.appendElement(this.getElement()), this.getElement());
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
      let baseComponentItem = new BaseComponent(selector, number, showSpinner, showError);
      baseComponentItem.setShowLoader();


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