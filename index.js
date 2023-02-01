function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let todoInput = document.querySelector(".input");
let addtodoButton = document.querySelector(".button");
let showTodos=document.querySelector(".todos-container");
let todo = "";

let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];

addtodoButton.addEventListener("click",(e)=>{
    e.preventDefault();
    todo = todoInput.value;
    if(todo.length>0){
        todoList.push({
            todo,
            id:uuid(),
            isCompleted:false
        })
        rendertodoList(todoList);
        localStorage.setItem("todos", JSON.stringify(todoList));
        todoInput.value = "";
        
    }
    
})
showTodos.addEventListener("click",(e)=>{
    e.preventDefault();
    let key=e.target.dataset.key;
    let delkey = e.target.dataset.todokey;
    todoList = todoList.map(todo=>todo.id===key ? {...todo,isCompleted:!todo.isCompleted}:todo);
    todoList= todoList.filter(todo=>todo.id !== delkey);
    localStorage.setItem("todos", JSON.stringify(todoList));
    console.log(todoList);
    rendertodoList(todoList);
})



function rendertodoList(todoList) {
    showTodos.innerHTML = todoList.map(
        ({
            todo,
            id,
            isCompleted
        }) =>
        `<div class="todo relative"> <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${
        isCompleted ? "checked" : ""
      }> <label data-key=${id} class="todo-text t-pointer ${
        isCompleted ? "checked-todo" : ""
      }" for="item-${id}"> ${todo} </label> <button class="absolute right-0 button cursor">
      <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
            </button> </div>`
    );
}



rendertodoList(todoList);