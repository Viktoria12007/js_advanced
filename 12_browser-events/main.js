"use strict";

function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.textContent = title;
    appTitle.classList.add('mb-4', 'text-center');
    return appTitle;
}

function task1() {
    const dropDownButton = document.querySelector('#dropdownMenuButton');
    const dropDownMenu = document.querySelector('#dropdownMenu');
 
    dropDownButton.addEventListener('click', () => {
      dropDownMenu.classList.toggle('d-block');
    })
 
    window.addEventListener('click', (e) => {
        if (e.target !== dropDownButton && !e.target.closest('#dropdownMenu')) {
        dropDownMenu.classList.remove('d-block');
        }
   })
}

function task2(container) {
    const inputs = document.querySelectorAll('.form-control');
    const pattern = new RegExp('[А-Яа-яЁё\\s\\-]+$');
    const form = document.querySelector('.form');

    inputs.forEach(element => {
        element.addEventListener('keypress', (e) => {
          const newValue = e.target.value + e.key;
          if (!pattern.test(newValue)) e.preventDefault();
        })
        element.addEventListener('blur', (e) => {
               if (e.target.value !== '') {
                   e.target.value = e.target.value.replace(/[^А-Яа-яЁё\s\-]/g, '');
                   e.target.value = e.target.value.replace(/^[\s\-]+|[\s\-]+$/g, '');
                   e.target.value = e.target.value.replaceAll(/([\s\-])\1+/g, '$1');
                   if (e.target.value !== '') {
                   e.target.value = e.target.value.split(/\s+/).map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                   }
               }
         })
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let string;
        const text = document.createElement('p');
        text.classList.add('text');
        inputs.forEach(element => {
            if (element.value !== '') {
           string = element.value;
           text.textContent = text.textContent + ' ' + string;
           container.append(text);
           element.value = '';
        }
       })
    })
}

function task3() {
    const buttonUp = document.querySelector('.js-button-up');

    window.addEventListener('scroll', () => {
     if (window.pageYOffset > 100) {
        buttonUp.classList.remove('d-none');
     }
     else {
         buttonUp.classList.add('d-none');
     }
    }, {passive: true})

    buttonUp.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}

function createBrowserEventsApp(container, title, task) {

   const mainTitle = createAppTitle(title);
   container.prepend(mainTitle);

   if (task === 1) {
     task1();
   }
  if (task === 2) {
     task2(container);
  }
  if (task === 3) {
     task3();
  }
}