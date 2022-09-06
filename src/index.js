import './style.css';
import headerModule from './header/headermodule';
import sidebarModule from './sidebar/sidebarmodule';
import contentModule from './content/contentmodule';

document.onload = headerModule.getInitial();
document.onload = sidebarModule.getInitial();
document.onload = contentModule.getInitial();
