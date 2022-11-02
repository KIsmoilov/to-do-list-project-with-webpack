import './index.css';

const toDOLists = [];

const taskOne = {
  description: 'wash the dishes',
  completed: false,
  index: 0,
};

toDOLists.push(taskOne);

const taskTwo = {
  description: 'complete To Do list project',
  completed: false,
  index: 1,
};
toDOLists.push(taskTwo);

const toDoTasksContainer = document.querySelector('.toDoTasksContainer');

function compare(a, b) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
}

toDOLists.sort(compare);

for (let i = 0; i < toDOLists.length; i += 1) {
  const tasks = document.createElement('ul');
  tasks.className = 'tasks';
  tasks.innerHTML = `
  <li><input id="${toDOLists[i].index}" type="checkbox"> 
  <label for="${toDOLists[i].index}">${toDOLists[i].description}</label></li>
  <li><a href=""><i class="fa fa-ellipsis-v icon"></i></a></li>
  `;
  toDoTasksContainer.appendChild(tasks);
}