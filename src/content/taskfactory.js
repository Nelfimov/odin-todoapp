const tasksLibrary = [];

const taskFactory = (title, description, dueDate, finished, priority, project) => {
  const project = project || null;
  const description = description || null;
  return { title, description, dueDate, finished, priority, project };
}

export default taskFactory;
export { tasksLibrary };