import './index.css';
import Methods from './methods.js';

const inputForm = document.getElementById('inputForm');
const addTask = document.getElementById('addTask');

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  Methods.addTasks(addTask.value);
  addTask.value = '';
});

Methods.showTasks();