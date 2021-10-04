async function getData(way) {
    let response = await fetch(way);
    if (response.status === 500) {
        response = await fetch(way);
        if (response.status === 500) {
            response = await fetch(way);
            if (response.status === 500) {
                throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
            }
        }
       
    }

    if (response.status === 404) {
        throw new Error('Список товаров пуст');
    }

    const data = response.json();
    return data;
}

function createCatalog(dataProducts) {
    const catalog = document.getElementById('catalog');
    const fragment = document.createDocumentFragment();
    dataProducts.products.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-5');
        card.style.width = '18rem';
        card.innerHTML = `<img src="${element.image}" class="card-img-top" alt="${element.name}">
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">${element.price} $</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>`
        fragment.appendChild(card);
    });
    catalog.append(fragment);
}

function hideSpinner(action, data) {
    const spinner = document.getElementById('spinner');
    spinner.classList.add('loaded_hiding');
     window.setTimeout(() => {
         spinner.classList.add('loaded');
         spinner.classList.remove('loaded_hiding');
         if(action === 'create') {
         createCatalog(data);
         }
     }, 500);
 }

//  function hideSpinner() {
//     const spinner = document.getElementById('spinner');
//     spinner.classList.add('loaded_hiding');
//      window.setTimeout(() => {
//          spinner.classList.add('loaded');
//          spinner.classList.remove('loaded_hiding');
//      }, 500);
//  }
function updateOnlineStatus() {
    const status = document.getElementById('status');
    const state = document.getElementById('state');
    const condition = navigator.onLine ? {style: "bg-success", text: "ONLINE"} : {style: "bg-danger", text: "OFLINE"};
    state.textContent = condition.text;
    status.classList.remove('bg-success', 'bg-danger');
    status.classList.add('show', condition.style);
    window.setTimeout(() => {
        status.classList.add('loaded_hiding');
     }, 3000)
     window.setTimeout(() => {
        status.classList.remove('show', 'loaded_hiding');
     }, 4000)
}

window.addEventListener('load', () => {
    window.addEventListener('online',  updateOnlineStatus, false);
    window.addEventListener('offline', updateOnlineStatus, false);
});


try {
    const dataProducts = await getData('/api/products?json_invalid=true');
    hideSpinner('create', dataProducts);
}
catch(error) {

    const info = document.getElementById('info');
    const infoBody = info.querySelector('.toast-body');

    if (error.message === 'Unexpected end of JSON input') {
            infoBody.textContent = 'Произошла ошибка, попробуйте обновить страницу позже';
    }
    if (error.message === 'Failed to fetch') {
        infoBody.textContent = 'Произошла ошибка, проверьте подключение к интернету';
    } 
    if (error.message !== 'Unexpected end of JSON input' && error.message !== 'Failed to fetch') {
        infoBody.textContent = error.message;
    }

  info.classList.add('show');
  window.setTimeout(() => {
     info.classList.add('loaded_hiding');
  }, 3000)
  window.setTimeout(() => {
     info.classList.remove('show', 'loaded_hiding');
  }, 4000)

}
finally {
    hideSpinner('don`t create');
}

// getData('/api/products?status=200').then((resolve)=> {
//     hideSpinner('create', resolve);
//     // createCatalog(resolve);
// }).catch(error => {
//     infoBody.textContent = 'Произошла ошибка, попробуйте обновить страницу позже';
//     info.classList.add('show');
// }).finally(() => {
//     hideSpinner('don`t create');
// })