import onlyHideSpinner from './functions/onlyHideSpinner';
// import ComponentError from "./componentError";
// import BaseComponent from "./baseComponent";
import AddToCartComponent from './classes/addToCartComponent';

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
        if(baseComponent) {
        if (baseComponent.setShowError()) {
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
        if (baseComponent) {
        baseComponent.hideSpinner('don`t create');
        }
        else {
            window.setTimeout(() => {
                onlyHideSpinner();
            }, 1000);
        }
    }
}

startLoad('#container', 5, true, true);