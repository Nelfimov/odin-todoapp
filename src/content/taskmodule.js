import taskUncompleteIcon from './icons/task_uncomplete.svg';

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

  const createTaskDiv = (task) => {
    const mainDiv = document.createElement('div');
    Object.assign(mainDiv, {
      'data-task': '1',
      className: 'task task-item',
    });
    const completeIcon = new Image();
    Object.assign(completeIcon, {
      className: 'task-icon',
      src: taskUncompleteIcon,
    })
    getOrCreateTaskListDiv.prepend(mainDiv);
  }
  return { getOrCreateTaskListDiv, createTaskDiv };
})();