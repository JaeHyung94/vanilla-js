const toDoForm = document.querySelector(".js-todoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList"),
    toDoFin = document.querySelector(".js-todoFin");

const TODOS_LS = 'toDos';
const TODOS_FIN = 'toDosFin'

let toDos = [];
let toDosFin = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDos;
    saveToDos();
}

function finishTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    li.classList.toggle("finish");
}


function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const div = document.createElement("div");
    const newId = Date.now();
    finBtn.innerHTML = "✔️"
    delBtn.innerHTML = "❌";
    finBtn.addEventListener("click", finishTodo);
    delBtn.addEventListener("click", deleteToDo);
    div.innerText = text;
    li.appendChild(div);
    li.appendChild(finBtn);
    li.appendChild(delBtn);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    saveToDos(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    // toDoList.addEventListener("click", delToDos);
}

init()
