const LOCAL_STORAGE_TASK_KEY = 'todo.tasksLibrary';
let tasksLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

const taskFactory = (title, descriptionInitial, dueDate, finished, priority, projectName) => {
  let project;
  if (projectName === undefined) {
    project = null;
  } else {
    project = projectName.name;
  }
  let description = descriptionInitial || null;
  return { title, description, dueDate, finished, priority, project };
}

export { taskFactory, tasksLibrary, LOCAL_STORAGE_TASK_KEY };