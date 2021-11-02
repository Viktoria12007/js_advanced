import onlyHideSpinner from './functions/onlyHideSpinner.js';
// import ComponentError from "./componentError";
import BaseComponent from "./classes/baseComponent.js";
import AddToCartComponent from './classes/addToCartComponent.js';
// import baseComponentItem from './classes/addToCartComponent.js';

async function startLoad(selector, number, showSpinner, showError) {
    const info = document.getElementById('info');
    let baseComponentItem;
    
    try {
        // let countCart;
        baseComponentItem = new BaseComponent(selector, number, showSpinner, showError);
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
        // console.log(error);
        // console.log(baseComponentItem);
        // console.log(baseComponentItem.showErrorState);
        if (baseComponentItem) {
            // console.log(baseComponentItem.showErrorState);
            // if (baseComponentItem.setShowError()) {
            if (baseComponentItem.showErrorState) {
            info.classList.add('show');
            }
            else {
                info.classList.remove('show');
            }
        }
    }
    finally {
        // const base = new BaseComponent();
        console.log('что-то там!')
        if (baseComponentItem) {
        baseComponentItem.hideSpinner('don`t create');
        }
        else {
            window.setTimeout(() => {
                onlyHideSpinner();
            }, 1000);
        }
    }
}

startLoad('#container', 10, true, true);