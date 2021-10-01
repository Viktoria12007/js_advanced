async function getData(way) {
    const response = await fetch(way);
    const data = response.json();
    return data;
}
async function createCatalog(dataProducts) {
    const catalog = document.getElementById('catalog');
    // const dataProducts = await getProductsData();
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
        catalog.append(card);
        // const info = createInfo();
        // catalog.append(info);
    });
}
// function createInfo() {
//     const infoElement = document.createElement('div');
//     infoElement.classList.add('position-absolute', 'bottom-0', 'end-0');
//     infoElement.textContent = 'Hello!';
//     return infoElement;
// }

const dataProducts = await getData('/api/products?status=200');
createCatalog(dataProducts);