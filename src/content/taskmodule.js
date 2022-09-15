import taskUncompleteIcon from '/src/icons/task_uncomplete.svg';
import taskCompleteIcon from '/src/icons/task_complete.svg';
import binIcon from '/src/icons/bin.svg';
import { LOCAL_STORAGE_TASK_KEY, tasksLibrary, taskFactory } from './taskfactory';
import contentModule from './contentmodule';
import { projectsLibrary } from '../sidebar/projectfactory';

const taskModule = (() => {
  const contentDiv = document.getElementById('content');

  const getInitial = () => {
    DOMgetOrCreateTaskListDiv().innerHTML = '';
    tasksLibrary.forEach((task, index) => {
      DOMcreateTaskDiv(task, index);
    });
  };

  const showFiltered = (library) => {
    DOMgetOrCreateTaskListDiv().innerHTML = '';
    library.forEach((task, index) => {
      DOMcreateTaskDiv(task, index);
    });
  }

  const DOMgetOrCreateTaskListDiv = () => {
    let div = document.getElementById('task-list');
    if (div === null) {
      div = document.createElement('div');
      Object.assign(div, {
        id: 'task-list',
        className: 'task task-list',
      });
      contentDiv.appendChild(div);
    };
    return div;
  };

  const createNewTask = () => {
    const title = document.getElementById('new-task-title').value;
    if (title === '') return alert('You have to specify title');
    const description = document.getElementById('new-task-description').value;
    let inputDate = new Date(document.getElementById('new-task-date').value);
    if (inputDate === '') return alert('You have to specify due date');
    if (inputDate < new Date(new Date().toDateString())) return alert('Date cannot be in the past');
    inputDate = new Date(inputDate.toDateString());
    let priority = document.getElementById('new-task-priority').textContent;
    priority === 'Normal priority' ? priority = false : priority = true;
    const projectSelect = document.getElementById('new-task-project').value;
    const findProject = projectsLibrary.filter((project) => {
      return project.name === projectSelect;
    });
    const newTask = taskFactory(title, description, inputDate, false, priority, findProject[0]);
    tasksLibrary.push(newTask);
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksLibrary));
    taskModule.getOrCreateTaskListDiv().innerHTML = '';
    tasksLibrary.forEach((task, index) => {
      taskModule.createTaskDiv(task, index)
    });
    document.getElementById('new-task-title').value = '';
    document.getElementById('new-task-description').value = '';
    document.getElementById('new-task-project').value = '';
    contentModule.DOMhideFullTaskForm();
  };


  const DOMcreateTaskDiv = (task, index) => {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'task task-item';
    if (task.priority === true) mainDiv.classList.add('priority');
    let statusSrc = taskUncompleteIcon;
    if (task.finished === true) {
      mainDiv.classList.add('completed');
      statusSrc = taskCompleteIcon;
    };

    const statusIcon = new Image();
    Object.assign(statusIcon, {
      className: 'task task-icon task-complete',
      src: statusSrc,
    });
    statusIcon.setAttribute('data-task', index);
    statusIcon.addEventListener('click', () => finishTask(index));

    const subDiv = document.createElement('div');
    Object.assign(subDiv, {
      className: 'task task-content',
    });
    const titleP = document.createElement('p');
    Object.assign(titleP, {
      textContent: task.title,
      className: 'task task-content-title',
    });
    const descriptionP = document.createElement('p');
    Object.assign(descriptionP, {
      textContent: task.description,
      className: 'task task-content-description',
    });
    subDiv.append(titleP, descriptionP);
    if (task.project !== null) {
      const projectP = document.createElement('p');
      Object.assign(projectP, {
        textContent: task.project,
        className: 'task task-content-project',
      });
      subDiv.append(projectP);
    };
    // Due time
    const timeDiv = document.createElement('div');
    Object.assign(timeDiv, {
      className: 'task task-content-time',
    });
    const timeP = document.createElement('p');
    const taskDate = new Date(task.dueDate);
    let day = taskDate.getDate();
    if (day < 10) day = '0' + day;
    let month = taskDate.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = taskDate.getFullYear();
    let taskDateString;
    if (year > new Date(new Date().getFullYear())) {
      taskDateString = `${day}/${month}/${year}`;
    } else {
      taskDateString = `${day}/${month}`;
    }
    Object.assign(timeP, {
      className: 'task task-content-time',
      textContent: taskDateString,
    });
    if (taskDate <= new Date(new Date().toDateString())) {
      timeP.classList.add('overdue');
    };
    timeDiv.appendChild(timeP);
    // Delete task icon
    const deleteIcon = new Image();
    Object.assign(deleteIcon, {
      className: 'task task-icon task-delete',
      src: binIcon,
    });
    deleteIcon.setAttribute('data-task', index);
    deleteIcon.addEventListener('click', () => deleteTask(index));

    mainDiv.append(statusIcon, subDiv, timeDiv, deleteIcon);
    DOMgetOrCreateTaskListDiv().prepend(mainDiv);
    return mainDiv;
  };

  const finishTask = (index) => {
    let status = tasksLibrary[index].finished;
    status === true ? status = false : status = true;
    tasksLibrary[index].finished = status;
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksLibrary));
    getInitial();
    return tasksLibrary[index];
  };

  const deleteTask = (index) => {
    tasksLibrary.splice(index, 1);
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasksLibrary));
    getInitial();
  }

  return { getOrCreateTaskListDiv: DOMgetOrCreateTaskListDiv, createNewTask, createTaskDiv: DOMcreateTaskDiv, getInitial, showFiltered };
})();

export default taskModule;
