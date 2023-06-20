import BaseComponent from "./baseComponent.js";

export default class AddToCartComponent extends BaseComponent {
    constructor(selector, count, show = true) {
        if (typeof count !== "number" || count < 0) {
          throw new TypeError('Количество товара не может быть меньше нуля!');
        }
        super(selector, count, show);
        this.count = count;
        console.log(this.showLoader);
        super.hideSpinner('create', this.getElement());
    }
    set count(quantity) {
        this._count = quantity;
        if (this.displayCount)
         this.displayCount.textContent = quantity;
    }
    get count() {
        return this._count;
    }
   
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

        await this.wait(3000);
            //    throw new Error('Yhooo!');  // Симулировать ошибку при неудачной загрузке данных при вызове метода fetch
            return new AddToCartComponent(selector, number, showSpinner, showError);
      }
}