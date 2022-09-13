import { taskFactory, tasksLibrary } from "./taskfactory";
import { projectsLibrary } from "../sidebar/projectfactory";
import taskModule from "./taskmodule";

const contentModule = (() => {
  const divContent = document.getElementById('content');

  const getInitial = () => {
    createHeadline('Inbox');
    const divInput = document.createElement('div');
    Object.assign(divInput, {
      id: 'div-new-task',
      className: 'task-creation',
    });
    divContent.appendChild(divInput);
    const initialInputs = [
      { tag: 'input', id: 'new-task-title', type: 'text', text: 'Add new task', addClass: '' },
      { tag: 'textarea', id: 'new-task-description', type: '', text: 'Description', addClass: ' for-hide hidden' },
      { tag: 'input', id: 'new-task-date', type: 'date', text: 'Due date', addClass: ' for-hide hidden empty' },
      { tag: 'button', id: 'new-task-priority', type: '', text: 'Normal priority', addClass: ' for-hide hidden' },
      { tag: 'select', id: 'new-task-project', type: '', text: 'Select project', addClass: ' for-hide hidden empty' },
      { tag: 'button', id: 'new-task-button', type: '', text: 'Create new task', addClass: ' for-hide hidden' },
    ];
    initialInputs.forEach((item) => createNewTaskForm(item));
    createProjectEmptyOption();
    projectsLibrary.forEach((project) => {
      createProjectOption(project);
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') hideFullTaskForm();
    });
  };

  const createNewTaskForm = (item) => {
    const divInput = document.getElementById('div-new-task');
    const element = document.createElement(item.tag);
    Object.assign(element, {
      id: item.id,
      className: 'new-task' + item.addClass,
      placeholder: item.text,
    });
    if (item.tag === 'input') element.type = item.type;
    if (item.tag === 'button') element.textContent = item.text;
    if (item.id === 'new-task-priority') {
      element.addEventListener('click', () => {
        element.classList.toggle('top');
        element.classList.contains('top')
          ? element.textContent = 'Top priority'
          : element.textContent = 'Normal priority';
      });
    };
    if (item.id === 'new-task-title') {
      element.addEventListener('focus', () => {
        showFullTaskForm();
      });
    };
    if (item.id === 'new-task-button') {
      element.addEventListener('click', createNewTask);
    };
    divInput.appendChild(element);
    return element;
  };

  const createNewTask = () => {
    const title = document.getElementById('new-task-title').value;
    if (title === '') return alert('You have to specify title');
    const description = document.getElementById('new-task-description').value;
    const inputDate = new Date(document.getElementById('new-task-date').value);
    if (inputDate === '') return alert('You have to specify due date');
    if (inputDate < new Date(new Date().toDateString())) return alert('Date cannot be in the past');
    let priority = document.getElementById('new-task-priority').textContent;
    priority === 'Normal priority' ? priority = false : priority = true;
    const project = document.getElementById('new-task-project').value;
    let newTask = taskFactory(title, description, inputDate, false, priority, project);
    tasksLibrary.push(newTask);
    taskModule.getOrCreateTaskListDiv().innerHTML = '';
    tasksLibrary.forEach((task, index) => {
      taskModule.createTaskDiv(task, index)
    });
    document.getElementById('new-task-title').value = '';
    document.getElementById('new-task-description').value = '';
    document.getElementById('new-task-priority').textContent = '';
    document.getElementById('new-task-project').value = '';
    hideFullTaskForm();
  };

  const createProjectEmptyOption = () => {
    const emptyOption = document.createElement('option');
    Object.assign(emptyOption, {
      value: '',
      textContent: 'Select project',
      disabled: true,
      selected: true,
    });
    document.getElementById('new-task-project').appendChild(emptyOption);
    return emptyOption;
  };

  const createProjectOption = (project) => {
    const option = document.createElement('option');
    Object.assign(option, {
      value: project.name,
      textContent: project.name,
      disabled: false,
      selected: false,
    });
    document.getElementById('new-task-project').appendChild(option);
    return option;
  };

  const createHeadline = (string) => {
    const headlineDiv = document.createElement('div');
    Object.assign(headlineDiv, {
      id: 'div-content-headline',
    })
    const headline = document.createElement('h2');
    headline.textContent = string || 'Today';
    headlineDiv.appendChild(headline);
    divContent.prepend(headlineDiv);
    return headlineDiv;
  };

  const showFullTaskForm = () => {
    document.querySelectorAll('#div-new-task .hidden').forEach((node) => {
      node.classList.remove('hidden');
    })
  };

  const hideFullTaskForm = () => {
    document.querySelectorAll('#div-new-task .for-hide').forEach((item) => item.classList.add('hidden'));
  };

  return { getInitial };
})();

export default contentModule;