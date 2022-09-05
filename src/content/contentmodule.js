import plusIcon from '/src/icons/plus.svg';

const contentModule = (() => {
  const divContent = document.getElementById('content');

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
  }

  const createNewTaskForm = () => {
    createHeadline('Inbox');
    const divInput = document.createElement('div');
    Object.assign(divInput, {
      id: 'div-new-task',
      className: 'task-creation',
    });
    const inputs = [
      ['input', 'new-task-title', 'text', 'Add new task', ''],
      ['textarea', 'new-task-description', '', 'Description', ''],
      ['input', 'new-task-date', 'date', 'Due date', ' empty'],
      ['button', 'new-task-priority', '', 'Normal priority', ''],
      ['select', 'new-task-project', '', 'Select project', ' empty'],
      ['button', 'new-task-button', '', 'Create new task', ''],
    ];
    inputs.forEach((element) => {
      let newInput;
      newInput = document.createElement(element[0]);
      Object.assign(newInput, {
        id: element[1],
        className: 'new-task' + element[4],
        placeholder: element[3],
      });
      if (element[0] === 'input') newInput.type = element[2];
      if (element[0] === 'button') newInput.textContent = element[3];
      if (element[1] === 'new-task-priority') {
        newInput.addEventListener('click', () => {
          newInput.classList.toggle('top');
          newInput.classList.contains('top')
            ? newInput.textContent = 'Top priority'
            : newInput.textContent = 'Normal priority';
        })
      }
      inputs.indexOf(element) > 0 ? newInput.classList.add('hidden') : null;
      divInput.appendChild(newInput);
    });
    const emptyOption = document.createElement('option');
    Object.assign(emptyOption, {
      value: '',
      textContent: 'Select project',
      disabled: true,
      selected: true,
    });
    divContent.appendChild(divInput);
    document.getElementById('new-task-project').appendChild(emptyOption);
    return divInput;
  }

  const showFullTaskForm = () => {
    document.querySelectorAll('#div-new-task .hidden').forEach((node) => {
      node.classList.remove('hidden');
    })
  }

  const hideFullTaskForm = () => {
    document.getElementById('new-task-description').classList.add('hidden');
    document.getElementById('new-task-date').classList.add('hidden');
    document.getElementById('new-task-priority').classList.add('hidden');
    document.getElementById('new-task-project').classList.add('hidden');
    document.getElementById('new-task-button').classList.add('hidden');
  }

  return { createNewTaskForm, showFullTaskForm, hideFullTaskForm };
})();

export default contentModule;