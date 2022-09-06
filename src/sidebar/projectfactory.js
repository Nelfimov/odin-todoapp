const projectFactory = (name) => {
  isProject = true;
  return { name, isProject };
}

export default projectFactory;