const LOCAL_STORAGE_PROJECT_KEY = 'todo.projectsLibrary';
const projectsLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];

const projectFactory = (name) => {
  const isProject = true;
  return { name, isProject };
}

export { projectsLibrary, projectFactory, LOCAL_STORAGE_PROJECT_KEY };