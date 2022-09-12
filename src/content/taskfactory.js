const tasksLibrary = [];

const taskFactory = (title, descriptionInitial, dueDate, finished, priority, projectName) => {
  let project = projectName.name || null;
  let description = descriptionInitial || null;
  return { title, description, dueDate, finished, priority, project };
}

export { taskFactory, tasksLibrary };