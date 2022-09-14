import './style.css';
import headerModule from './header/headermodule';
import sidebarModule from './sidebar/sidebarmodule';
import contentModule from './content/contentmodule';
import taskModule from './content/taskmodule';

window.onload = () => {
  headerModule.getInitial();
  sidebarModule.getInitial();
  contentModule.getInitial();
  taskModule.getInitial();
};
