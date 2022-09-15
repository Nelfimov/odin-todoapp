import menuIcon from '/src/icons/view.svg';
import githubIcon from '/src/icons/github.svg';
import taskModule from '../content/taskmodule';
import { tasksLibrary } from '../content/taskfactory';

const headerModule = (() => {
  const getInitial = () => {
    const leftDiv = '#header>div.left';
    const midDiv = '#header>div.mid';
    const rightDiv = '#header>div.right';

    const menuImgLeft = {
      tag: 'img', id: 'menu', src: menuIcon, addClass: ' nav-icon',
      type: '', text: 'menu', destination: leftDiv,
    };
    const searchInputLeft = {
      tag: 'input', id: 'search', src: '', addClass: ' nav-search',
      type: 'text', text: 'Search', destination: leftDiv,
    };
    const anchorMid = {
      tag: 'a', id: null, src: '#', addClass: '',
      type: '', text: '', destination: midDiv,
    };
    const spanAppNameMid = {
      tag: 'span', id: null, src: '', addClass: '',
      type: '', text: 'TODO APP', destination: midDiv,
    };
    const anchorRight = {
      tag: 'a', id: null, src: 'https://github.com/nelfimov/', addClass: '',
      type: '', text: '', destination: rightDiv,
    };
    const githubImgRight = {
      tag: 'img', id: null, src: githubIcon, addClass: ' nav-icon',
      type: '', text: 'github', destination: rightDiv,
    };
    const spanGithub = {
      tag: 'span', id: null, src: '', addClass: '',
      type: '', text: 'Github', destination: rightDiv,
    };
    const initialHeader = [
      menuImgLeft, searchInputLeft, anchorMid, spanAppNameMid,
      anchorRight, githubImgRight, spanGithub,
    ];
    initialHeader.forEach((item) => createHeaderItem(item));
  }

  const createHeaderItem = (item) => {
    const element = document.createElement(item.tag);
    element.className = 'nav' + item.addClass;
    if (item.id) element.id = item.id;
    if (item.id === 'menu') {
      element.addEventListener('click', () => {
        toggleMenu();
      })
    };
    if (item.id === 'search') {
      element.addEventListener('input', () => {
        searchTask();
      });
    };
    if (item.tag === 'img') {
      element.src = item.src;
      element.alt = item.text;
    };
    if (item.tag === 'input') {
      element.placeholder = item.text;
      element.type = item.type;
      element.name = item.id;
    };
    if (item.tag === 'a') {
      element.href = item.src;
    };
    if (item.tag === 'span') {
      element.textContent = item.text;
    };
    const destiny = document.querySelector(item.destination);
    if (destiny.querySelector('a.nav')) {
      destiny.querySelector('a.nav').appendChild(element);
    } else {
      document.querySelector(item.destination).appendChild(element);
    };
    return element;
  };

  const toggleMenu = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
  }

  const searchTask = () => {
    const value = document.getElementById('search').value;
    const regex = new RegExp(value, 'gi');
    const filterTitle = tasksLibrary.filter((task) => regex.test(task.title));
    const filterDescription = tasksLibrary.filter((task) => regex.test(task.description));
    if (value !== '') {
      const filteredLibrary = filterTitle.concat(filterDescription);
      taskModule.showFiltered(filteredLibrary);
    } else {
      taskModule.getInitial();
    };
  };

  return { getInitial };
})();

export default headerModule;