const projectsLibrary = [];

const projectFactory = (name) => {
  const isProject = true;
  return { name, isProject };
}

export { projectsLibrary, projectFactory };