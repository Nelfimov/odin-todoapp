import './style.css';
import getContent, { showForm, hideForm } from './content/contentdom';
import headerModule from './header/headermodule';
import sidebarModule from './sidebar/sidebarmodule';

document.onload = headerModule.getInitial();
document.onload = sidebarModule.getInitial();
document.onload = getContent();

document.getElementById('new-task-title').addEventListener('focus', () => showForm());
window.addEventListener('keyup', (e) => {
  if (e.key == 'Escape') hideForm();
});