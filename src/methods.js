import TaskCollection from './mainClass.js';

export default class Methods {
    static getTaskFromStorage = () => {
      let listOfTasks;
      if (JSON.parse(localStorage.getItem('storedTasksData')) === null) {
        listOfTasks = [];
      } else {
        listOfTasks = JSON.parse(localStorage.getItem('storedTasksData'));
      }
      return listOfTasks;
    };

    static addTaskToStorage = (listOfTasks) => {
      const string = JSON.stringify(listOfTasks);
      localStorage.setItem('storedTasksData', string);
    };

    static deleteTasks = (id) => {
      let listOfTasks = this.getTaskFromStorage();
      const taskToDelete = listOfTasks[id];

      listOfTasks = listOfTasks.filter((task) => task !== taskToDelete);
      this.addTaskToStorage(listOfTasks);
    };

    static addBtnRemoveEvent = () => {
      document.querySelectorAll('.delete_btn').forEach((button) => button.addEventListener('click', (event) => {
        event.preventDefault();
        const { id } = button;
        this.deleteTasks(id);
        this.showTasks();
      }));
    };
}