//input, buttons and elements
const toDo = document.querySelector("#toDoEntry");
const btn = document.querySelector(".submit");
const output = document.querySelector("#out");
const errorMessage = document.querySelector("#errorMessage");
const unDoBtn = document.querySelector("#unDo");
const noTaskError = document.querySelector("#noDeletedMessage");
const arrowIcon = document.querySelector("#themes .fa-solid");

window.addEventListener("DOMContentLoaded", () => {
  UI.addDefaultTasks();
  UI.updateDisplay();
  UI.deleteToDo();
  UI.checkAndUncheckTasks();
  UI.editTask();
});

btn.addEventListener("click", () => {
  if (toDo.value === "" || toDo.value.trim().length === 0) {
    UI.clearInput();
    return UI.displayError(errorMessage);
  }
  UI.addToDo(toDo.value);
  UI.clearInput();
  UI.updateDisplay();
});

toDo.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    if (toDo.value === "" || toDo.value.trim().length === 0) {
      UI.clearInput();
      return UI.displayError(errorMessage);
    }
    UI.addToDo(toDo.value);
    UI.clearInput();
    UI.updateDisplay();
    Storage.addToStorage(todos);
  }
});

unDoBtn.addEventListener("click", () => {
  UI.undoDelete();
});
