import UtilityFunction from './methods.js';

export default class InteractiveFunction {
    static changeCompletedTask = (checkboxStatus, id) => {
      const listOfTasks = UtilityFunction.getTaskFromStorage();
      listOfTasks[id].completed = checkboxStatus;
      UtilityFunction.addTaskToStorage(listOfTasks);
      UtilityFunction.showTasks();
    }

    static checkStatusEvent = () => (
      document.querySelectorAll('.checkbox').forEach((checkbox) => checkbox.addEventListener('change', () => {
        let checkboxStatus;
        let id;
        if (checkbox.id > 0) {
          id = checkbox.id - 1;
        } else {
          id = 0;
        }

        if (checkbox.checked === true) {
          checkboxStatus = true;
        } else if (checkbox.checked !== true) {
          checkboxStatus = false;
        }

        this.changeCompletedTask(checkboxStatus, id);
      }))
    )

    static clearAllTasksCompleted = () => {
      let listOfTasks = UtilityFunction.getTaskFromStorage();

      listOfTasks = listOfTasks.filter((item) => item.completed !== true);
      UtilityFunction.newIndex(listOfTasks);
      UtilityFunction.addTaskToStorage(listOfTasks);
      UtilityFunction.showTasks();
    }
}