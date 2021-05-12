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

function createTodoItemElement(todoItem, {onDone, onDelete}) {
    
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
    
    buttonDone.addEventListener('click', async (e) => {
        e.preventDefault();

        onDone({todoItem, element: item});
        item.classList.toggle(classDone, todoItem.done);
})

    buttonDelete.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (!confirm('Вы уверены?')) {
            return;
        }

        onDelete({todoItem, element: item});
     
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

async function createTodoApp(container, {
    title, 
    owner, 
    todoItemList = [], 
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
    }) {
    
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    const handlers = {onDone: onDoneClick, onDelete: onDeleteClick};

    container.append(todoAppTitle, todoItemForm.form, todoList);

    todoItemForm.input.addEventListener('input', function() {
        
        if (todoItemForm.input.value) {
            todoItemForm.button.disabled = false;
        }
        else {
            todoItemForm.button.disabled = true;
        }
    
    })

    todoItemForm.form.addEventListener('submit', async e => {

        e.preventDefault();
    
        if (!todoItemForm.input.value) {
            return;
        }

        const todoItem = await onCreateFormSubmit({
            owner,
            name: todoItemForm.input.value.trim(),
        });
    
        let todoItemElement = createTodoItemElement(todoItem, handlers);

        todoList.append(todoItemElement);
    
        todoItemForm.input.value = ''; 

        todoItemForm.button.disabled = true;

    });

        todoItemList.forEach(item => {
         let todoItemElement = createTodoItemElement(item, handlers);
         todoList.append(todoItemElement);
        })
       
    }
    export { createTodoApp };