const container = document.getElementById('starWars-app');
const preload = document.querySelector('.preload');

let cssPromise;

function loadCss(adress) {
    const headLinkChildren = document.querySelectorAll(`link[rel='stylesheet']`);
    const actualArray = Array.from(headLinkChildren);

    for (let child of actualArray) {

        if (child.getAttribute('href') === adress) {
            document.head.append(child);
            return cssPromise;
        }

    }

    cssPromise = new Promise(resolve => {
        const link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = adress;
        link.addEventListener('load', () => {
            resolve();
        });

        document.head.append(link);

    })
    return cssPromise;
}

function getPromise(url) {
    return fetch(url).then(resolve => resolve.json());
}

async function getData(url) {
    const data = await getPromise(url);
    return data;
}

function hey() {
    console.log('hey');
}

async function chooseCreateFunction(func = load) {
    const currentPage = window.location.pathname;
    container.innerHTML = '';
    preload.classList.remove('loaded');

    if (currentPage === '/index.html') {
        await loadCss('./styles/allEpizods.css');
        const { createEpizodsList } = await
        import ('./js/epizodsList.js');
        const allEpizods = await getData('https://swapi.dev/api/films/');
        runPreload(createEpizodsList, allEpizods);
        func();
    } else {
        const currentEpizod = currentPage[12];
        await loadCss(`../styles/epizod${currentEpizod}.css`);
        const { getDataEpizod, createEpizodPage } = await
        import (`./js/epizodPage.js`);
        const epizod = await getDataEpizod(`https://swapi.dev/api/films/${currentEpizod}`);
        runPreload(createEpizodPage, epizod.data, epizod.planetsArray, epizod.speciesArray);
        func();
    }

    const links = document.querySelectorAll('.epizods-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', link.href);
            chooseCreateFunction();
        })
    })

}

function runPreload(func, arg1, arg2 = null, arg3 = null) {
    preload.classList.add('loaded_hiding');
    preload.classList.add('loaded');
    preload.classList.remove('loaded_hiding');
    func(arg1, arg2, arg3);
}

function load() {
    chooseCreateFunction(hey);
}

window.addEventListener('popstate', () => {
    chooseCreateFunction(hey);
})

load();
