import './style.css';
import headerModule from './header/headermodule';
import sidebarModule from './sidebar/sidebarmodule';
import contentModule from './content/contentmodule';
import taskModule from './content/taskmodule';
import { taskFactory, tasksLibrary } from './content/taskfactory';
import { projectFactory, projectsLibrary } from './sidebar/projectfactory';

const today = new Date();
const mm = String(today.getMonth() + 1);
const dd = String(today.getDate());
const yyyy = String(today.getFullYear());

const taskExample = taskFactory(
  'New task', 'Description', `${yyyy}-${mm}-${dd}`, false, false, '',
);
tasksLibrary.push(taskExample);

const projectExample = projectFactory('Default');
projectsLibrary.push(projectExample);

document.onload = headerModule.getInitial();
document.onload = sidebarModule.getInitial();
document.onload = contentModule.getInitial();
document.onload = taskModule.getInitial();
