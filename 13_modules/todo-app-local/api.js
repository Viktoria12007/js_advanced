export function setMemory(owner, data) {
    localStorage.setItem(owner, JSON.stringify(data));
}

export function getTodoList(owner) {
    const data = localStorage.getItem(owner) ? JSON.parse(localStorage.getItem(owner)) : [];
    localStorage.setItem(owner, JSON.stringify(data));
    return data;
}
    
export function createTodoItem(owner, data, todoItem) {
    data.push(todoItem);
    localStorage.setItem(owner, JSON.stringify(data));
}
    
export function switchTodoItemDone(owner, data, element) {
    
    data = JSON.parse(localStorage.getItem(owner));
    
    for (let i of data) {
        if(i.id === element.id) {
            if (!i.done) {
                i.done = true;
                element.setAttribute('done', 'true');
         }
         else {
            i.done = false;
            element.setAttribute('done', 'false');
         }
     }
    }
    
     localStorage.setItem(owner, JSON.stringify(data));
}
    
export function deleteTodoItem(owner, data, element) {
    data = JSON.parse(localStorage.getItem(owner));
    
    if (data && data.length) { 
        let newStorageList = []; 
  
        for (let i=0; i < data.length; i++) { 
           if (data[i].id !== element.id) { 
              newStorageList.push(data[i]); 
           }
        
        }
        
        localStorage.setItem(owner, JSON.stringify(newStorageList));
     }   
    element.remove();
}