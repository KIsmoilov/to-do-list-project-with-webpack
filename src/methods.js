import TaskCollection from './mainClass.js';

export default class Methods {
  static addTaskToStorage = (listOfTasks) => {
    const item = JSON.stringify(listOfTasks);
    localStorage.setItem('storedTasksData', item);
  };

  static getTaskFromStorage = () => {
    let listOfTasks;

    if (JSON.parse(localStorage.getItem('storedTasksData')) === null) {
      listOfTasks = [];
    } else {
      listOfTasks = JSON.parse(localStorage.getItem('storedTasksData'));
    }
    return listOfTasks;
  };

  static newIndex = (listOfTasks) => {
    listOfTasks.forEach((item, i) => {
      item.index = i + 1;
    });
  }

    static deleteTasks = (id) => {
      let listOfTasks = this.getTaskFromStorage();
      const taskToDelete = listOfTasks[id];

      listOfTasks = listOfTasks.filter((item) => item !== taskToDelete);

      this.newIndex(listOfTasks);
      this.addTaskToStorage(listOfTasks);
    };

    static updateTaskInput = (newDescription, id) => {
      const listOfTasks = this.getTaskFromStorage();
      const itemToUpdate = listOfTasks[id];

      listOfTasks.forEach((item) => {
        if (item === itemToUpdate) {
          item.description = newDescription;
        }
      });

      this.addTaskToStorage(listOfTasks);
      this.showTasks();
    };

    static addBtnRemoveEvent = () => {
      document.querySelectorAll('.delete_btn').forEach((button) => button.addEventListener('click', (event) => {
        event.preventDefault();
        let id;
        if (button.id > 0) {
          id = button.id - 1;
        } else {
          id = 0;
        }
        this.deleteTasks(id);
        this.showTasks();
      }));
    };

    static listOfTasksHtml = ({ description, index }) => {
      const ul = document.createElement('ul');
      ul.className = 'tasks';
      ul.innerHTML = `
        <li><input id="${index}" type="checkbox"></li> 
        <li><input type="text" class="text" value="${description}" readonly></li>
        <li><button class="edit_btn" id="${index}"><i class="fa fa-ellipsis-v icon"></i></button>
        <button class="delete_btn" id="${index}"><i class="fa fa-ellipsis-v icon"></i></button></li>
      `;
      return ul;
    }

    static showTasks = () => {
      const listOfTasks = this.getTaskFromStorage();
      document.querySelector('.toDoTasksContainer').innerHTML = '';
      listOfTasks.forEach((item) => {
        document.querySelector('.toDoTasksContainer').appendChild(this.listOfTasksHtml(item));
      });

      this.addBtnRemoveEvent();
    };

    static addTasks = (description) => {
      const listOfTasks = this.getTaskFromStorage();
      const index = listOfTasks.length + 1;
      const newtask = new TaskCollection(description, false, index);

      listOfTasks.push(newtask);
      this.addTaskToStorage(listOfTasks);
      this.showTasks();
    }
}