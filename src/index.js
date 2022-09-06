import './style.css';
import headerModule from './header/headermodule';
import sidebarModule from './sidebar/sidebarmodule';
import contentModule from './content/contentmodule';
import taskFactory from './content/taskfactory';
import taskModule from './content/taskmodule';

document.onload = headerModule.getInitial();
document.onload = sidebarModule.getInitial();
document.onload = contentModule.getInitial();

const taskExample = taskFactory(
  'New task', 'Description', '21.12.1993', false, false, '',
);

console.log(taskExample);

taskModule.createTaskDiv(taskExample, 1);