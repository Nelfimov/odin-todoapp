import taskUncompleteIcon from '/src/icons/task_uncomplete.svg';
import taskCompleteIcon from '/src/icons/task_complete.svg';
import { tasksLibrary } from './taskfactory';
import binIcon from '/src/icons/bin.svg';

const taskModule = (() => {
  const contentDiv = document.getElementById('content');

  const getInitial = () => {
    getOrCreateTaskListDiv().innerHTML = '';
    tasksLibrary.forEach((task, index) => {
      createTaskDiv(task, index);
    });
  };

  const showFiltered = (library) => {
    getOrCreateTaskListDiv().innerHTML = '';
    library.forEach((task, index) => {
      createTaskDiv(task, index);
    });
  }

  const getOrCreateTaskListDiv = () => {
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

  const createTaskDiv = (task, index) => {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'task task-item';
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
    let day = task.dueDate.getDate();
    if (day < 10) day = '0' + day;
    let month = task.dueDate.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = task.dueDate.getFullYear();
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
    getOrCreateTaskListDiv().prepend(mainDiv);
    return mainDiv;
  };

  const finishTask = (index) => {
    let status = tasksLibrary[index].finished;
    status === true ? status = false : status = true;
    tasksLibrary[index].finished = status;
    console.log(tasksLibrary);
    getInitial();
    return tasksLibrary[index];
  };

  const deleteTask = (index) => {
    tasksLibrary.splice(index, 1);
    console.log(tasksLibrary);
    getInitial();
  }

  return { getOrCreateTaskListDiv, createTaskDiv, getInitial, showFiltered };
})();

export default taskModule;
