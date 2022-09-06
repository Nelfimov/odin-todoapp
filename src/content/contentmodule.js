const contentModule = (() => {
  const divContent = document.getElementById('content');

  const getInitial = () => {
    const initialInputs = [
      { tag: 'input', id: 'new-task-title', type: 'text', placeholder: 'Add new task', addClass: '' },
      { tag: 'textarea', id: 'new-task-description', type: '', placeholder: 'Description', addClass: ' for-hide hidden' },
      { tag: 'input', id: 'new-task-date', type: 'date', placeholder: 'Due date', addClass: ' for-hide hidden empty' },
      { tag: 'button', id: 'new-task-priority', type: '', placeholder: 'Normal priority', addClass: ' for-hide hidden' },
      { tag: 'select', id: 'new-task-project', type: '', placeholder: 'Select project', addClass: ' for-hide hidden empty' },
      { tag: 'button', id: 'new-task-button', type: '', placeholder: 'Create new task', addClass: ' for-hide hidden' },
    ];
    createNewTaskForm(initialInputs);
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') hideFullTaskForm();
    });
  }

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

  const createNewTaskForm = (array) => {
    createHeadline('Inbox');
    const divInput = document.createElement('div');
    Object.assign(divInput, {
      id: 'div-new-task',
      className: 'task-creation',
    });
    array.forEach((element) => {
      let newInput;
      newInput = document.createElement(element.tag);
      Object.assign(newInput, {
        id: element.id,
        className: 'new-task' + element.addClass,
        placeholder: element.placeholder,
      });
      if (element.tag === 'input') newInput.type = element.type;
      if (element.tag === 'button') newInput.textContent = element.placeholder;
      if (element.id === 'new-task-priority') {
        newInput.addEventListener('click', () => {
          newInput.classList.toggle('top');
          newInput.classList.contains('top')
            ? newInput.textContent = 'Top priority'
            : newInput.textContent = 'Normal priority';
        })
      };
      if (array.indexOf(element) === 0) {
        newInput.addEventListener('focus', () => {
          showFullTaskForm();
        });
      };
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
    document.querySelectorAll('#div-new-task .for-hide').forEach((item) => item.classList.add('hidden'));
  }

  return { getInitial };
})();

export default contentModule;