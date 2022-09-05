import './style.css';
import getHeader from './header/headerdom';
import getSidebar from './sidebar/sidebardom';
import getContent, { showForm, hideForm } from './content/contentdom';
import menu from './header/headermenu';

document.onload = getHeader();
document.onload = getSidebar();
document.onload = getContent();

document.getElementById('menu').addEventListener('click', () => menu());
document.getElementById('new-task-title').addEventListener('focus', () => showForm());
window.addEventListener('keyup', (e) => {
  if (e.key == 'Escape') hideForm();
});