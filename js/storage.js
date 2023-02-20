//STORAGE CODE REFACTORED
class Storage {
  static addStorage(key, arrayToBeAdded) {
    localStorage.setItem(key, JSON.stringify(arrayToBeAdded));
  }
  static getFromStorage(key) {
    let deletedStorage =
      localStorage.getItem(key) === null
        ? []
        : JSON.parse(localStorage.getItem(key));
    return deletedStorage;
  }
  static addToStorage = (todoArray) => Storage.addStorage("todo", todoArray);
  static getStorage = () => Storage.getFromStorage("todo");
  static addDeletedToStorage = (todoArray) =>
    Storage.addStorage("deletedTasks", todoArray);
  static getDeletedTasks = () => Storage.getFromStorage("deletedTasks");
}
