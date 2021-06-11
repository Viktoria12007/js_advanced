export function showTodoApp(currentOwner, currentTitle) {
const container = document.getElementById('todo-app');
let data = localStorage.getItem('Хранилище') ? JSON.parse(localStorage.getItem('Хранилище')) : 'local';

if (!localStorage.getItem('Хранилище')) {
(async () => {
 chooseStorage({localAction: callLocalStorage, serverAction: callServerStorage});
    }) ();
}

if (localStorage.getItem('Хранилище')) {
    chooseStorage({localAction: callLocalStorage, serverAction: callServerStorage});
    }

async function callServerStorage() {

while (container.firstChild) {
container.removeChild(container.firstChild);
}
  
let {createTodoApp} = await import('./todo-app-server/view.js');
let {
getTodoList,
createTodoItem,
switchTodoItemDone,
deleteTodoItem} = await import('./todo-app-server/api.js');


(async () => {
const todoItemList = await getTodoList(currentOwner);
createTodoApp(document.getElementById('todo-app'), {
title: currentTitle, 
currentOwner,
todoItemList, 
onCreateFormSubmit: createTodoItem,
onDoneClick: switchTodoItemDone,
onDeleteClick: deleteTodoItem
});  
}) ();

switchStorageButton.textContent = 'Перейти на локальное хранилище';
localStorage.setItem('Хранилище', JSON.stringify('server'));
}

async function callLocalStorage() {

while (container.firstChild) {
  container.removeChild(container.firstChild);
}

let {createTodoApp} = await import('./todo-app-local/view.js');
let {
setMemory,
getTodoList,
createTodoItem,
switchTodoItemDone,
deleteTodoItem} = await import('./todo-app-local/api.js');


createTodoApp(document.getElementById('todo-app'), currentTitle, currentOwner,
{
setMemory: setMemory,
getTodoList: getTodoList,
createTodoItem: createTodoItem,
switchTodoItemDone: switchTodoItemDone,
deleteTodoItem: deleteTodoItem});

switchStorageButton.textContent = 'Перейти на серверное хранилище';
localStorage.setItem('Хранилище', JSON.stringify('local'));

}
    
function chooseStorage({localAction, serverAction}) {

if (data === 'local') {
localAction();
}
if (data === 'server') {
serverAction(); 
}


}

const switchStorageButton = document.querySelector('.js-switch-storage');
switchStorageButton.addEventListener('click', async (e) => {
e.preventDefault();
data = localStorage.getItem('Хранилище') ? JSON.parse(localStorage.getItem('Хранилище')) : 'local';
chooseStorage({localAction: callServerStorage, serverAction: callLocalStorage});
});
}