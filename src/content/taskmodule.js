import taskUncompleteIcon from '/src/icons/task_uncomplete.svg';

const taskModule = (() => {
  const contentDiv = document.getElementById('content');

  const getOrCreateTaskListDiv = () => {
    let div = document.getElementById('task-list');
    if (div === null) {
      div = document.createElement('div');
      Object.assign(div, {
        id: 'task-list',
        className: 'task task-list',
      });
      contentDiv.appendChild(div);
      return div;
    }
  };

  const createTaskDiv = (task, index) => {
    // TODO: project div
    const mainDiv = document.createElement('div');
    Object.assign(mainDiv, {
      'data-task': index,
      className: 'task task-item',
    });
    const completeIcon = new Image();
    Object.assign(completeIcon, {
      className: 'task task-icon',
      src: taskUncompleteIcon,
    });

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

    const timeDiv = document.createElement('div');
    Object.assign(timeDiv, {
      className: 'task task-content-time',
    });
    const timeP = document.createElement('p');
    Object.assign(timeP, {
      className: 'task task-content-time',
      textContent: task.dueDate,
    });
    timeDiv.appendChild(timeP);
    mainDiv.append(completeIcon, subDiv, timeDiv);
    getOrCreateTaskListDiv().prepend(mainDiv);
    return mainDiv;
  }
  return { getOrCreateTaskListDiv, createTaskDiv };
})();

export default taskModule;
