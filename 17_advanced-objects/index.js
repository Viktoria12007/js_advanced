const mainButton = document.querySelector('#mainButton');
const mainInput = document.querySelector('#mainInput');
const list = document.getElementById('list');

mainButton.setAttribute('disabled', true);

mainInput.addEventListener('input', () => {
  if(mainInput.value.trim()) {
    mainButton.removeAttribute('disabled');
  }
  else {
    mainButton.setAttribute('disabled', true);
  }
})

mainButton.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    list.innerHTML = '';

    const patternModulesJs=/\.js+$/i;

  try {
    if(patternModulesJs.test(mainInput.value.trim())) {
      const module = await import(`./modules/${mainInput.value.trim()}`);
      // console.log(typeof module.default);
      createArrayPrototypes(module.default);
    }
    else {
      createArrayPrototypes(window[mainInput.value.trim()]);
    }
  }
  catch(e) {
    console.log(`${e.name}: ${e.message}`);
    mainInput.classList.remove('is-valid');
    mainInput.classList.add('is-invalid');
  }
  
  finally {
    mainInput.value = '';
    mainButton.setAttribute('disabled', true);
  }
})

function createObjectPrototype(prototype, arrayPrototypes) {
  // prototype.constructor ? console.log(prototype.constructor.name) : console.log('Без названия');
  const objectPrototype = {};
  objectPrototype.constructor = prototype.constructor ? prototype.constructor.name : 'Без названия';
  objectPrototype.properties = [];

  for (let key in prototype) {
    try {
      // console.log(`${key} (${typeof prototype[key]})`);
      objectPrototype.properties.push(`${key} (${typeof prototype[key]})`)
    }
    catch(e) {
      console.log(`${e.name}: ${e.message}`);
    }
  }
  arrayPrototypes.push(objectPrototype);
}

function createArrayPrototypes(currentValue) {
  if(typeof currentValue === 'function') {
    let prototype;
    prototype = currentValue.prototype;
    // console.log(prototype);
    const arrayPrototypes = [];
    createObjectPrototype(prototype, arrayPrototypes);

    while(Object.getPrototypeOf(prototype)) {
      prototype = Object.getPrototypeOf(prototype);
      // console.log(prototype);
      createObjectPrototype(prototype, arrayPrototypes);
    }
    
    // console.log(arrayPrototypes);
    createListPrototypes(arrayPrototypes);

    mainInput.classList.add('is-valid');
    mainInput.classList.remove('is-invalid');
  }
  else {
    mainInput.classList.remove('is-valid');
    mainInput.classList.add('is-invalid');
  }
}

function createListPrototypes(array) {
  const parentOl = document.createElement('ol');
  for(let itemParentArray of array) {
    const itemListParent = document.createElement('li');
    itemListParent.textContent = itemParentArray.constructor;
    parentOl.append(itemListParent);
    if(itemParentArray.properties) {
      const childrenOl = document.createElement('ol');
      for(let itemChildrenArray of itemParentArray.properties) {
        const itemListChildren = document.createElement('li');
        itemListChildren.textContent = itemChildrenArray;
        childrenOl.append(itemListChildren);
      }
      parentOl.append(childrenOl);
    }
  }
  list.append(parentOl);
}