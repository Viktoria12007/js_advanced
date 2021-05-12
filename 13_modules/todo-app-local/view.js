function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.classList.add('align-self-start');
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.setAttribute('disabled', 'true');

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
        form,
        input,
        button
    }
}

function createTodoItemElement(owner, todoItem, {switchTodoItemDone, deleteTodoItem}) {
    
    const classDone = 'list-group-item-success';
    const item = document.createElement('li');
    const containerItem = document.createElement('div');
    const buttonDone = document.createElement('button');
    const buttonDelete = document.createElement('button'); 

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = todoItem.name;
    item.setAttribute('done', todoItem.done);
    item.setAttribute('id', todoItem.id);

    if (todoItem.done) {
        item.classList.add(classDone);
    }

    containerItem.classList.add('btn-group', 'btn-group-sm');
    buttonDone.classList.add('btn', 'btn-success');
    buttonDone.textContent = 'Готово';
    buttonDelete.classList.add('btn', 'btn-danger');
    buttonDelete.textContent = 'Удалить';
    let data;
    
    buttonDone.addEventListener('click', (e) => {
        e.preventDefault();
        switchTodoItemDone(owner, data, item);
        item.classList.toggle(classDone, item.done);
})

    buttonDelete.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!confirm('Вы уверены?')) {
            return;
        }
        
        deleteTodoItem(owner, data, item);
     
   });

    containerItem.append(buttonDone, buttonDelete);
    item.append(containerItem);

    return item;
}

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group', 'align-self-stretch');
    return list;
}

function createTodoApp(container, title, owner, 
    {
    setMemory,
    getTodoList,
    createTodoItem,
    switchTodoItemDone,
    deleteTodoItem,}) {
    
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    const handlers = {switchTodoItemDone: switchTodoItemDone, deleteTodoItem: deleteTodoItem};
    let data = getTodoList(owner);
    
    container.append(todoAppTitle, todoItemForm.form, todoList);

    todoItemForm.input.addEventListener('input', function() {
        
        if (todoItemForm.input.value) {
            todoItemForm.button.disabled = false;
        }
        else {
            todoItemForm.button.disabled = true;
        }
    
    })

    todoItemForm.form.addEventListener('submit', (e) => {

        e.preventDefault();
    
        if (!todoItemForm.input.value) {
            return;
        }
       
        while (todoList.firstChild) {
            todoList.removeChild(todoList.firstChild);
          }

          data = getTodoList(owner);
    
        data.forEach((item, index) => {
            item.id = String(index);
            let todoItemElement = createTodoItemElement(owner, item, handlers);
            todoList.append(todoItemElement);
        });

        setMemory(owner, data);

        let todoItem = {};
        todoItem.name = todoItemForm.input.value.trim();
        todoItem.done = false; 
        todoItem.id = String(todoList.children.length);
    
        let todoItemElement = createTodoItemElement(owner, todoItem, handlers);
        createTodoItem(owner, data, todoItem);

        todoList.append(todoItemElement);
    
        todoItemForm.input.value = ''; 

        todoItemForm.button.disabled = true;

    });

        data.forEach((item, index) => {
         item.id = String(index);  
         let todoItemElement = createTodoItemElement(owner, item, handlers);
         todoList.append(todoItemElement);
        })
        
        setMemory(owner, data);
    }
    export { createTodoApp };