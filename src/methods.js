import TaskCollection from './mainClass.js';

export default class UtilityFunction {
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
    const item = JSON.stringify(listOfTasks);
    localStorage.setItem('storedTasksData', item);
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

    static listOfTasksHtml = ({ description, index }, checkboxStatus, iscompleted) => {
      const ul = document.createElement('ul');
      ul.className = 'tasks';
      ul.innerHTML = `
        <li><input class="checkbox" id="${index}" type="checkbox" ${checkboxStatus}></li> 
        <li><input id="TEXT${index}" type="text" class="text${iscompleted}" value="${description}" readonly></li>
        <li>
        <button class="edit_btn" id="${index}"><i class="fa fa-ellipsis-v icon"></i></button>
        <button class="delete_btn" id="${index}"><i class="fa fa-trash-can icon"></i></button>
        </li>
      `;
      return ul;
    }

    static showTasks = () => {
      const listOfTasks = this.getTaskFromStorage();
      document.querySelector('.toDoTasksContainer').innerHTML = '';
      listOfTasks.forEach((item) => {
        let checkboxStatus;
        let iscompleted;
        if (item.completed === true) {
          checkboxStatus = 'checked';
          iscompleted = 'completed';
        } else {
          checkboxStatus = '';
          iscompleted = '';
        }
        document.querySelector('.toDoTasksContainer').appendChild(this.listOfTasksHtml(item, checkboxStatus, iscompleted));
      });

      this.addBtnRemoveEvent();
      this.addBtnEditEvent();
      this.updateBtnEvent();

      const event = new Event('listUpdated');
      document.dispatchEvent(event);
    };

    static addTasks = (description) => {
      const listOfTasks = this.getTaskFromStorage();
      const index = listOfTasks.length + 1;
      const newtask = new TaskCollection(description, false, index);

      listOfTasks.push(newtask);
      this.addTaskToStorage(listOfTasks);
      this.showTasks();
    }

    static updateBtnEvent = () => {
      document.querySelectorAll('.text').forEach((input) => input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const inputID = 'TEXT';
          const selectedID = event.currentTarget.id;
          let concatID;

          if (!selectedID.includes('TEXT')) {
            concatID = inputID.concat(selectedID);
          } else {
            concatID = selectedID;
          }

          document.getElementById(concatID).setAttribute('readonly', 'readonly');
          this.updateTaskInput(document.getElementById(concatID).value, (Number(concatID.replace('TEXT', '')) - 1));
        }
      }));
    }

    static addBtnEditEvent = () => {
      let previousList = null;
      document.querySelectorAll('.edit_btn').forEach((button) => button.addEventListener('click', (event) => {
        event.preventDefault();
        const inputID = 'TEXT';
        const selectedID = event.currentTarget.id;
        let concatID;

        if (!selectedID.includes('TEXT')) {
          concatID = inputID.concat(selectedID);
        } else {
          concatID = selectedID;
        }

        if (previousList !== null) {
          previousList.getElementById(concatID).removeAttribute('readonly');
        }

        const listItem = event.target.closest('li');
        previousList = listItem;
        const ulItem = event.target.closest('ul');

        listItem.style.background = 'rgb(230, 230, 184)';
        ulItem.style.background = 'rgb(230, 230, 184)';

        document.getElementById(concatID).removeAttribute('readonly');
        document.getElementById(concatID).focus();
        document.getElementById(concatID).style.background = 'rgb(230, 230, 184)';
        listItem.querySelector('.edit_btn').style.display = 'none';
        listItem.querySelector('.delete_btn').style.display = 'block';
      }));
    };
}