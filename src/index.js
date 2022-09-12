import './style.css';
import headerModule from './header/headermodule';
import sidebarModule from './sidebar/sidebarmodule';
import contentModule from './content/contentmodule';
import taskModule from './content/taskmodule';
import { taskFactory, tasksLibrary } from './content/taskfactory';
import { projectFactory, projectsLibrary } from './sidebar/projectfactory';

const today = new Date();
let mm = today.getMonth() + 1;
if (mm < 10) mm = '0' + mm;
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
const yyyy = today.getFullYear();

const projectExample1 = projectFactory('Default');
projectsLibrary.push(projectExample1);

const projectExample2 = projectFactory('Another default');
projectsLibrary.push(projectExample2);

const taskExample1 = taskFactory(
  'New task', 'Description', `${yyyy}-${mm}-${dd}`, false, false, projectExample2,
);
tasksLibrary.push(taskExample1);

const taskExample2 = taskFactory(
  'New task', 'Description', `${yyyy}-${mm}-${dd}`, false, false, projectExample1,
);
tasksLibrary.push(taskExample2);


window.onload = headerModule.getInitial();
window.onload = sidebarModule.getInitial();
window.onload = contentModule.getInitial();
document.onload = taskModule.getInitial();
window.onload = () => {
  document.getElementById('new-task-date').value = `${yyyy}-${mm}-${dd}`;
};
