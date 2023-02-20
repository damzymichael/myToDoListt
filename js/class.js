let todos = Storage.getStorage();
let deletedTasks = Storage.getDeletedTasks();

const defaultTasks = [
  "Be the best version of yourself",
  "Don't settle for less",
  "Live life to the fullest",
];

//todo class
class Todos {
  constructor(id, todoname) {
    this.id = id;
    this.name = todoname;
    this.completed = false;
    this.priorityLevel = 0;
  }
}

//functionality
class UI {
  static addToDo(name) {
    name.replace(/\s+/g, " ").trim(); //removes extra spacing
    let id = Math.floor(Math.random() * 1000000);
    const todo = new Todos(id, name);
    todos = [...todos, todo];
    Storage.addToStorage(todos);
  }
  static clearInput() {
    toDo.value = "";
  }
  static addDefaultTasks() {
    if (todos.length > 0) return;
    defaultTasks.forEach((task) => UI.addToDo(task));
  }
  static updateDisplay() {
    let displayData = todos.map((item) => {
      const { name, id, completed, priorityLevel } = item;
      const iconClass =
        completed === false
          ? "fa-regular fa-square"
          : "fa-regular fa-square-check";
      const spanID = completed === false ? "" : "done";
      return `
      <div class="taskStyles ${completed}" id="${priorityLevel}" data-id="${id}">
         <i class="${iconClass}"></i>
         <span id="${spanID}">${name} </span> 
         <button class="cancel">+</button>
      </div>
      `;
    });
    output.innerHTML = displayData.join(" ");
  }
  static checkAndUncheckTasks() {
    output.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-regular")) {
        const parentElement = e.target.parentElement;
        const id = parentElement.dataset.id;
        let checked = parentElement.classList[1];

        //the DOM
        if (e.target.className === "fa-regular fa-square") {
          parentElement.className = "taskStyles true";
          e.target.className = "fa-regular fa-square-check";
        } else {
          parentElement.className = "taskStyles false";
          e.target.className = "fa-regular fa-square";
        }

        //under the hood
        todos.forEach((todo) => {
          if (todo.id === +id) {
            checked = !checked;
            todo.completed = !todo.completed;
            Storage.addToStorage(todos);
          }
        });
        UI.updateDisplay();
      }
    });
  }
  static displayError(p) {
    p.style.display = "block";
    toDo.onmouseover = () => (p.style.display = "none");
    toDo.onclick = () => (p.style.display = "none");
    setTimeout(() => {
      p.style.display = "none";
    }, 3000);
  }
  static deleteToDo() {
    output.addEventListener("click", (e) => {
      if (e.target.className === "cancel") {
        //The DOM
        const toBeDeleted = e.target.parentElement;
        const id = toBeDeleted.dataset.id;
        output.removeChild(toBeDeleted);

        //under the hood
        const delFromArray = (array, toBeDeleted) => {
          const index = array.indexOf(toBeDeleted);
          return array.splice(index, 1);
        };
        const checkId = (todo) => todo.id === +id;
        const index = todos.findIndex(checkId);
        let deleted = delFromArray(todos, index);
        deletedTasks.push(deleted[0]);

        Storage.addDeletedToStorage(deletedTasks);
        Storage.addToStorage(todos);
      }
    });
  }
  static undoDelete() {
    if (deletedTasks.length < 1) return UI.displayError(noTaskError);
    let recent = deletedTasks.pop();
    todos.push(recent);
    UI.updateDisplay();
    Storage.addDeletedToStorage(deletedTasks);
    Storage.addToStorage(todos);
  }
  static editTask() {
    output.addEventListener("click", (e) => {
      if (e.target.localName === "span") {
        //change the span tag to an input tag
        const span = e.target;
        const input = document.createElement("input");
        span.parentNode.replaceChild(input, span);
        input.value = span.innerHTML;
        input.focus();

        //Saving edited
        const saveEdited = () => {
          input.parentNode.replaceChild(span, input);
          input.value = input.value.replace(/\s+/g, " ").trim(); //removes extra spacing
          span.innerHTML = input.value;

          //under the hood
          const parentElement = span.parentElement;
          const id = parentElement.dataset.id;
          todos.forEach((todo) => {
            if (todo.id === +id) {
              todo.name = span.innerHTML;
            }
          });
        };
        //Enter key saves
        input.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            if (input.value === "" || input.value.trim().length === 0) return;
            saveEdited();
            Storage.addToStorage(todos);
          }
        });
        // input.addEventListener("blur", () => {
        //   if (input.value === "" || input.value.trim().length === 0) return;
        //   saveEdited();
        //   Storage.addToStorage(todos);
        // });
      }
    });
  }
 
}
