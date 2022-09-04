import './style.css';
import getHeader from './header/headerdom';
import getSidebar from './sidebar/sidebardom';
import menu from './header/headerlogic';


document.onload = getHeader();
document.onload = getSidebar();

document.getElementById('menu').addEventListener('click', () => menu());