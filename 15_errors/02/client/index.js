async function getData(way) {
    let response = await fetch(way);
    console.log(response);
    if (response.status === 404) {
        throw new Error('Список товаров пуст');
    }
    if (response.status === 500) {
        response = await fetch(way);
        if (response.status === 500) {
            response = await fetch(way);
            if (response.status === 500) {
                throw new Error('Произошла ошибка, попробуйте обновить страницу позже');
            }
        }
       
    }

    const data = response.json();
    console.log(data);
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

const info = document.getElementById('info');
const infoBody = document.querySelector('.toast-body');

try {
    const dataProducts = await getData('/api/products');
    hideSpinner('create', dataProducts);
}
catch(error) {
    if (error.message === 'Unexpected end of JSON input') {
        infoBody.textContent = 'Произошла ошибка, попробуйте обновить страницу позже'
    }
    else {
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