/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/content/contentmodule.js":
/*!**************************************!*\
  !*** ./src/content/contentmodule.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sidebar_projectfactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sidebar/projectfactory */ "./src/sidebar/projectfactory.js");
/* harmony import */ var _taskmodule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskmodule */ "./src/content/taskmodule.js");



const contentModule = (() => {
  const divContent = document.getElementById('content');

  const getInitial = () => {
    DOMcreateHeadline('Inbox');
    const divInput = document.createElement('div');
    Object.assign(divInput, {
      id: 'div-new-task',
      className: 'task-creation',
    });
    divContent.appendChild(divInput);
    const initialInputs = [
      { tag: 'input', id: 'new-task-title', type: 'text', text: 'Add new task', addClass: '' },
      { tag: 'textarea', id: 'new-task-description', type: '', text: 'Description', addClass: ' for-hide hidden' },
      { tag: 'input', id: 'new-task-date', type: 'date', text: 'Due date', addClass: ' for-hide hidden empty' },
      { tag: 'button', id: 'new-task-priority', type: '', text: 'Normal priority', addClass: ' for-hide hidden' },
      { tag: 'select', id: 'new-task-project', type: '', text: 'Select project', addClass: ' for-hide hidden empty' },
      { tag: 'button', id: 'new-task-button', type: '', text: 'Create new task', addClass: ' for-hide hidden' },
    ];
    initialInputs.forEach((item) => createNewTaskForm(item));
    DOMcreateProjectEmptyOption();
    _sidebar_projectfactory__WEBPACK_IMPORTED_MODULE_0__.projectsLibrary.forEach((project) => {
      DOMcreateProjectOption(project);
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') DOMhideFullTaskForm();
    });
  };

  const createNewTaskForm = (item) => {
    const divInput = document.getElementById('div-new-task');
    const element = document.createElement(item.tag);
    Object.assign(element, {
      id: item.id,
      className: 'new-task' + item.addClass,
      placeholder: item.text,
    });
    if (item.tag === 'input') element.type = item.type;
    if (item.tag === 'button') element.textContent = item.text;
    if (item.id === 'new-task-priority') {
      element.addEventListener('click', () => {
        element.classList.toggle('top');
        element.classList.contains('top')
          ? element.textContent = 'Top priority'
          : element.textContent = 'Normal priority';
      });
    };
    if (item.id === 'new-task-title') {
      element.addEventListener('focus', () => {
        DOMshowFullTaskForm();
      });
    };
    if (item.id === 'new-task-button') {
      element.addEventListener('click', () => _taskmodule__WEBPACK_IMPORTED_MODULE_1__["default"].createNewTask());
    };
    if (item.type === 'date') {
      const today = new Date();
      let mm = today.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      let dd = today.getDate();
      if (dd < 10) dd = '0' + dd;
      const yyyy = today.getFullYear();
      element.value = `${yyyy}-${mm}-${dd}`;
    };
    divInput.appendChild(element);
    return element;
  };

  const DOMcreateProjectEmptyOption = () => {
    const emptyOption = document.createElement('option');
    Object.assign(emptyOption, {
      value: '',
      textContent: 'Select project',
      disabled: false,
      selected: true,
    });
    if (_sidebar_projectfactory__WEBPACK_IMPORTED_MODULE_0__.projectsLibrary.length > 0) emptyOption.textContent = 'No project';
    document.getElementById('new-task-project').appendChild(emptyOption);
    return emptyOption;
  };

  const DOMcreateProjectOption = (project) => {
    const select = document.getElementById('new-task-project');
    const option = document.createElement('option');
    Object.assign(option, {
      value: project.name,
      textContent: project.name,
      disabled: false,
      selected: false,
    });
    select.appendChild(option);
    return option;
  };

  const DOMcreateHeadline = (string) => {
    const headlineDiv = document.createElement('div');
    Object.assign(headlineDiv, {
      id: 'div-content-headline',
    })
    const headline = document.createElement('h2');
    headline.textContent = string || 'Today';
    headlineDiv.appendChild(headline);
    divContent.prepend(headlineDiv);
    return headlineDiv;
  };

  const DOMshowFullTaskForm = () => {
    document.querySelectorAll('#div-new-task .hidden')
      .forEach((node) => node.classList.remove('hidden'));
  };

  const DOMhideFullTaskForm = () => {
    document.querySelectorAll('#div-new-task .for-hide')
      .forEach((item) => item.classList.add('hidden'));
  };

  return { getInitial, DOMhideFullTaskForm, DOMshowFullTaskForm, DOMcreateProjectOption, DOMcreateProjectEmptyOption };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (contentModule);

/***/ }),

/***/ "./src/content/taskfactory.js":
/*!************************************!*\
  !*** ./src/content/taskfactory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOCAL_STORAGE_TASK_KEY": () => (/* binding */ LOCAL_STORAGE_TASK_KEY),
/* harmony export */   "taskFactory": () => (/* binding */ taskFactory),
/* harmony export */   "tasksLibrary": () => (/* binding */ tasksLibrary)
/* harmony export */ });
const LOCAL_STORAGE_TASK_KEY = 'todo.tasksLibrary';
let tasksLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || [];

const taskFactory = (title, descriptionInitial, dueDate, finished, priority, projectName) => {
  let project;
  if (projectName === undefined) {
    project = null;
  } else {
    project = projectName.name;
  }
  let description = descriptionInitial || null;
  return { title, description, dueDate, finished, priority, project };
}



/***/ }),

/***/ "./src/content/taskmodule.js":
/*!***********************************!*\
  !*** ./src/content/taskmodule.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_icons_task_uncomplete_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/icons/task_uncomplete.svg */ "./src/icons/task_uncomplete.svg");
/* harmony import */ var _src_icons_task_complete_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../src/icons/task_complete.svg */ "./src/icons/task_complete.svg");
/* harmony import */ var _src_icons_bin_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../src/icons/bin.svg */ "./src/icons/bin.svg");
/* harmony import */ var _taskfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskfactory */ "./src/content/taskfactory.js");
/* harmony import */ var _contentmodule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contentmodule */ "./src/content/contentmodule.js");
/* harmony import */ var _sidebar_projectfactory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sidebar/projectfactory */ "./src/sidebar/projectfactory.js");







const taskModule = (() => {
  const contentDiv = document.getElementById('content');

  const getInitial = () => {
    DOMgetOrCreateTaskListDiv().innerHTML = '';
    _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.forEach((task, index) => {
      DOMcreateTaskDiv(task, index);
    });
  };

  const showFiltered = (library) => {
    DOMgetOrCreateTaskListDiv().innerHTML = '';
    library.forEach((task, index) => {
      DOMcreateTaskDiv(task, index);
    });
  }

  const DOMgetOrCreateTaskListDiv = () => {
    let div = document.getElementById('task-list');
    if (div === null) {
      div = document.createElement('div');
      Object.assign(div, {
        id: 'task-list',
        className: 'task task-list',
      });
      contentDiv.appendChild(div);
    };
    return div;
  };

  const createNewTask = () => {
    const title = document.getElementById('new-task-title').value;
    if (title === '') return alert('You have to specify title');
    const description = document.getElementById('new-task-description').value;
    let inputDate = new Date(document.getElementById('new-task-date').value);
    if (inputDate === '') return alert('You have to specify due date');
    if (inputDate < new Date(new Date().toDateString())) return alert('Date cannot be in the past');
    inputDate = new Date(inputDate.toDateString());
    let priority = document.getElementById('new-task-priority').textContent;
    priority === 'Normal priority' ? priority = false : priority = true;
    const projectSelect = document.getElementById('new-task-project').value;
    const findProject = _sidebar_projectfactory__WEBPACK_IMPORTED_MODULE_5__.projectsLibrary.filter((project) => {
      return project.name === projectSelect;
    });
    const newTask = (0,_taskfactory__WEBPACK_IMPORTED_MODULE_3__.taskFactory)(title, description, inputDate, false, priority, findProject[0]);
    _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.push(newTask);
    localStorage.setItem(_taskfactory__WEBPACK_IMPORTED_MODULE_3__.LOCAL_STORAGE_TASK_KEY, JSON.stringify(_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary));
    taskModule.getOrCreateTaskListDiv().innerHTML = '';
    _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.forEach((task, index) => {
      taskModule.createTaskDiv(task, index)
    });
    document.getElementById('new-task-title').value = '';
    document.getElementById('new-task-description').value = '';
    document.getElementById('new-task-project').value = '';
    _contentmodule__WEBPACK_IMPORTED_MODULE_4__["default"].DOMhideFullTaskForm();
  };


  const DOMcreateTaskDiv = (task, index) => {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'task task-item';
    if (task.priority === true) mainDiv.classList.add('priority');
    let statusSrc = _src_icons_task_uncomplete_svg__WEBPACK_IMPORTED_MODULE_0__;
    if (task.finished === true) {
      mainDiv.classList.add('completed');
      statusSrc = _src_icons_task_complete_svg__WEBPACK_IMPORTED_MODULE_1__;
    };

    const statusIcon = new Image();
    Object.assign(statusIcon, {
      className: 'task task-icon task-complete',
      src: statusSrc,
    });
    statusIcon.setAttribute('data-task', index);
    statusIcon.addEventListener('click', () => finishTask(index));

    const subDiv = document.createElement('div');
    Object.assign(subDiv, {
      className: 'task task-content',
    });
    const titleP = document.createElement('p');
    Object.assign(titleP, {
      textContent: task.title,
      className: 'task task-content-title',
    });
    const descriptionP = document.createElement('p');
    Object.assign(descriptionP, {
      textContent: task.description,
      className: 'task task-content-description',
    });
    subDiv.append(titleP, descriptionP);
    if (task.project !== null) {
      const projectP = document.createElement('p');
      Object.assign(projectP, {
        textContent: task.project,
        className: 'task task-content-project',
      });
      subDiv.append(projectP);
    };
    // Due time
    const timeDiv = document.createElement('div');
    Object.assign(timeDiv, {
      className: 'task task-content-time',
    });
    const timeP = document.createElement('p');
    const taskDate = new Date(task.dueDate);
    let day = taskDate.getDate();
    if (day < 10) day = '0' + day;
    let month = taskDate.getMonth() + 1;
    if (month < 10) month = '0' + month;
    const year = taskDate.getFullYear();
    let taskDateString;
    if (year > new Date(new Date().getFullYear())) {
      taskDateString = `${day}/${month}/${year}`;
    } else {
      taskDateString = `${day}/${month}`;
    }
    Object.assign(timeP, {
      className: 'task task-content-time',
      textContent: taskDateString,
    });
    if (taskDate <= new Date(new Date().toDateString())) {
      timeP.classList.add('overdue');
    };
    timeDiv.appendChild(timeP);
    // Delete task icon
    const deleteIcon = new Image();
    Object.assign(deleteIcon, {
      className: 'task task-icon task-delete',
      src: _src_icons_bin_svg__WEBPACK_IMPORTED_MODULE_2__,
    });
    deleteIcon.setAttribute('data-task', index);
    deleteIcon.addEventListener('click', () => deleteTask(index));

    mainDiv.append(statusIcon, subDiv, timeDiv, deleteIcon);
    DOMgetOrCreateTaskListDiv().prepend(mainDiv);
    return mainDiv;
  };

  const finishTask = (index) => {
    let status = _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary[index].finished;
    status === true ? status = false : status = true;
    _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary[index].finished = status;
    localStorage.setItem(_taskfactory__WEBPACK_IMPORTED_MODULE_3__.LOCAL_STORAGE_TASK_KEY, JSON.stringify(_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary));
    getInitial();
    return _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary[index];
  };

  const deleteTask = (index) => {
    _taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.splice(index, 1);
    localStorage.setItem(_taskfactory__WEBPACK_IMPORTED_MODULE_3__.LOCAL_STORAGE_TASK_KEY, JSON.stringify(_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary));
    getInitial();
  }

  return { getOrCreateTaskListDiv: DOMgetOrCreateTaskListDiv, createNewTask, createTaskDiv: DOMcreateTaskDiv, getInitial, showFiltered };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskModule);


/***/ }),

/***/ "./src/header/headermodule.js":
/*!************************************!*\
  !*** ./src/header/headermodule.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_icons_view_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/icons/view.svg */ "./src/icons/view.svg");
/* harmony import */ var _src_icons_github_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../src/icons/github.svg */ "./src/icons/github.svg");
/* harmony import */ var _content_taskmodule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../content/taskmodule */ "./src/content/taskmodule.js");
/* harmony import */ var _content_taskfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../content/taskfactory */ "./src/content/taskfactory.js");





const headerModule = (() => {
  const getInitial = () => {
    const leftDiv = '#header>div.left';
    const midDiv = '#header>div.mid';
    const rightDiv = '#header>div.right';

    const menuImgLeft = {
      tag: 'img', id: 'menu', src: _src_icons_view_svg__WEBPACK_IMPORTED_MODULE_0__, addClass: ' nav-icon',
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
      tag: 'img', id: null, src: _src_icons_github_svg__WEBPACK_IMPORTED_MODULE_1__, addClass: ' nav-icon',
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
    const filterTitle = _content_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.filter((task) => regex.test(task.title));
    const filterDescription = _content_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.filter((task) => regex.test(task.description));
    if (value !== '') {
      const filteredLibrary = filterTitle.concat(filterDescription);
      _content_taskmodule__WEBPACK_IMPORTED_MODULE_2__["default"].showFiltered(filteredLibrary);
    } else {
      _content_taskmodule__WEBPACK_IMPORTED_MODULE_2__["default"].getInitial();
    };
  };

  return { getInitial };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (headerModule);

/***/ }),

/***/ "./src/sidebar/projectfactory.js":
/*!***************************************!*\
  !*** ./src/sidebar/projectfactory.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LOCAL_STORAGE_PROJECT_KEY": () => (/* binding */ LOCAL_STORAGE_PROJECT_KEY),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "projectsLibrary": () => (/* binding */ projectsLibrary)
/* harmony export */ });
const LOCAL_STORAGE_PROJECT_KEY = 'todo.projectsLibrary';
const projectsLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];

const projectFactory = (name) => {
  const isProject = true;
  return { name, isProject };
}



/***/ }),

/***/ "./src/sidebar/sidebarmodule.js":
/*!**************************************!*\
  !*** ./src/sidebar/sidebarmodule.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_icons_expand_more_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../src/icons/expand_more.svg */ "./src/icons/expand_more.svg");
/* harmony import */ var _src_icons_plus_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../src/icons/plus.svg */ "./src/icons/plus.svg");
/* harmony import */ var _src_icons_minus_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../src/icons/minus.svg */ "./src/icons/minus.svg");
/* harmony import */ var _src_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../src/icons/inbox.svg */ "./src/icons/inbox.svg");
/* harmony import */ var _src_icons_calendar_today_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../src/icons/calendar_today.svg */ "./src/icons/calendar_today.svg");
/* harmony import */ var _src_icons_calendar_month_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../src/icons/calendar_month.svg */ "./src/icons/calendar_month.svg");
/* harmony import */ var _src_icons_project_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../src/icons/project.svg */ "./src/icons/project.svg");
/* harmony import */ var _projectfactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./projectfactory */ "./src/sidebar/projectfactory.js");
/* harmony import */ var _content_taskfactory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../content/taskfactory */ "./src/content/taskfactory.js");
/* harmony import */ var _content_taskmodule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../content/taskmodule */ "./src/content/taskmodule.js");
/* harmony import */ var _content_contentmodule__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../content/contentmodule */ "./src/content/contentmodule.js");












const sidebarModule = (() => {
  const sidebarDiv = document.getElementById('sidebar');

  const getInitial = () => {
    DOMcreateHeaders();
    const mainInitialRows = [
      ['All', _src_icons_inbox_svg__WEBPACK_IMPORTED_MODULE_3__, false, 'active'],
      ['Today', _src_icons_calendar_today_svg__WEBPACK_IMPORTED_MODULE_4__, false, ''],
      ['Ahead', _src_icons_calendar_month_svg__WEBPACK_IMPORTED_MODULE_5__, false, ''],
    ];
    mainInitialRows.forEach((item) => DOMcreateItem(...item));
    _projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary.forEach((project, index) => DOMcreateItem(project.name, _src_icons_project_svg__WEBPACK_IMPORTED_MODULE_6__, project.isProject, '', index));
  };

  const DOMcreateItem = (text, icon, isProject, addClass, projectIndex) => {
    const li = document.createElement('li');
    Object.assign(li, {
      className: 'sidebar sidebar-item ' + addClass,
    });
    li.addEventListener('click', () => {
      document.querySelectorAll('#sidebar li').forEach((item) => {
        item.classList.remove('active');
      });
      li.classList.add('active');
      document.querySelector('#div-content-headline>h2')
        .textContent = text;
    });
    const span = document.createElement('span');
    Object.assign(span, {
      textContent: text,
      className: 'sidebar sidebar-span',
    });
    const image = new Image();
    Object.assign(image, {
      className: 'sidebar sidebar-icon',
      src: icon,
    });

    if (text === 'All') {
      li.addEventListener('click', () => {
        _content_taskmodule__WEBPACK_IMPORTED_MODULE_9__["default"].getInitial();
      });
    };
    if (text === 'Today') {
      li.addEventListener('click', () => {
        const filteredLibrary = _content_taskfactory__WEBPACK_IMPORTED_MODULE_8__.tasksLibrary.filter((task) => {
          return new Date(task.dueDate).toDateString() === new Date(new Date().toDateString()).toDateString();
        });
        _content_taskmodule__WEBPACK_IMPORTED_MODULE_9__["default"].showFiltered(filteredLibrary);
        return filteredLibrary;
      });
    };
    if (text === 'Ahead') {
      li.addEventListener('click', () => {
        const filteredLibrary = _content_taskfactory__WEBPACK_IMPORTED_MODULE_8__.tasksLibrary.filter((task) => {
          return new Date(task.dueDate).toDateString() !== new Date(new Date().toDateString()).toDateString();
        });
        _content_taskmodule__WEBPACK_IMPORTED_MODULE_9__["default"].showFiltered(filteredLibrary);
        return filteredLibrary;
      });
    }
    li.append(image, span);

    let ul;
    if (isProject) {
      ul = document.querySelector('#sidebar-project>ul');
      li.addEventListener('click', () => {
        const filteredLibrary = _content_taskfactory__WEBPACK_IMPORTED_MODULE_8__.tasksLibrary.filter((task) => {
          return task.project === li.textContent;
        });
        _content_taskmodule__WEBPACK_IMPORTED_MODULE_9__["default"].showFiltered(filteredLibrary);
      });
    } else {
      li.id = `${text.toLowerCase()}`;
      ul = document.querySelector('#sidebar-main>ul');
    };
    if (isProject) {
      const deleteImage = new Image();
      Object.assign(deleteImage, {
        className: 'sidebar sidebar-icon sidebar-delete-project',
        src: _src_icons_minus_svg__WEBPACK_IMPORTED_MODULE_2__,
      });
      deleteImage.setAttribute('data-project', projectIndex);
      deleteImage.addEventListener('click', () => deleteProject(projectIndex));
      li.append(deleteImage);
    };
    ul.appendChild(li);
  };

  const DOMcreateHeaders = () => {
    let sidebarDiv = document.getElementById('sidebar-main');
    if (sidebarDiv === null) DOMcreateDiv(false);
    let projectDiv = document.getElementById('sidebar-project');
    if (projectDiv === null) DOMcreateDiv(true);
  };

  const DOMcreateDiv = (isProject) => {
    const div = document.createElement('div');

    if (isProject) {
      Object.assign(div, {
        id: 'sidebar-project',
      })
      const headline = document.createElement('h3');
      headline.textContent = 'Projects';
      const divHeadline = document.createElement('div');
      divHeadline.className = 'sidebar sidebar-headline';
      const imageExpand = new Image();
      Object.assign(imageExpand, {
        className: 'sidebar sidebar-icon sidebar-expand-icon',
        src: _src_icons_expand_more_svg__WEBPACK_IMPORTED_MODULE_0__,
      })
      const imagePlus = new Image();
      Object.assign(imagePlus, {
        className: 'sidebar sidebar-icon sidebar-plusproject-icon',
        src: _src_icons_plus_svg__WEBPACK_IMPORTED_MODULE_1__,
      });
      const newProjectInput = document.createElement('input');
      Object.assign(newProjectInput, {
        id: 'new-project-input',
        className: 'nav-search hidden',
        type: 'text',
        placeholder: 'Project name',
      });
      newProjectInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          createProject(newProjectInput.value);
          newProjectInput.value = '';
          newProjectInput.classList.toggle('hidden');
        };
        if (e.key === 'Escape') newProjectInput.classList.toggle('hidden');
      });
      divHeadline.append(imageExpand, headline, imagePlus, newProjectInput);
      let rotation = 0;
      imageExpand.addEventListener('click', () => {
        (() => {
          rotation += 180;
          if (rotation === 360) rotation = 0;
          document.querySelector('.sidebar-expand-icon')
            .style.transform = `rotate(${rotation}deg)`;
        })();
        document.querySelector('#sidebar-project>ul')
          .classList.toggle('hidden');
      });
      imagePlus.addEventListener('click', () => {
        newProjectInput.classList.toggle('hidden');
      });
      div.appendChild(divHeadline);
    } else {
      Object.assign(div, {
        id: 'sidebar-main',
      })
    }
    div.appendChild(document.createElement('ul'));
    sidebarDiv.appendChild(div);
    return div;
  };

  const createProject = (value) => {
    let newProject = (0,_projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectFactory)(value);
    _projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary.push(newProject);
    localStorage.setItem(_projectfactory__WEBPACK_IMPORTED_MODULE_7__.LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(_projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary));
    const ul = document.querySelector('#sidebar-project>ul');
    if (ul !== null) ul.innerHTML = '';
    document.getElementById('new-task-project').innerHTML = '';
    _content_contentmodule__WEBPACK_IMPORTED_MODULE_10__["default"].DOMcreateProjectEmptyOption();
    _projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary.forEach((project, index) => {
      DOMcreateItem(project.name, _src_icons_project_svg__WEBPACK_IMPORTED_MODULE_6__, project.isProject, '', index);
      _content_contentmodule__WEBPACK_IMPORTED_MODULE_10__["default"].DOMcreateProjectOption(project);
    });
    return newProject;
  };

  const deleteProject = (index) => {
    _projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary.splice(index, 1);
    localStorage.setItem(_projectfactory__WEBPACK_IMPORTED_MODULE_7__.LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(_projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary));
    const ul = document.querySelector('#sidebar-project>ul');
    if (ul !== null) ul.innerHTML = '';
    document.getElementById('new-task-project').innerHTML = '';
    _content_contentmodule__WEBPACK_IMPORTED_MODULE_10__["default"].DOMcreateProjectEmptyOption();
    _projectfactory__WEBPACK_IMPORTED_MODULE_7__.projectsLibrary.forEach((project, projectIndex) => {
      DOMcreateItem(project.name, _src_icons_project_svg__WEBPACK_IMPORTED_MODULE_6__, project.isProject, '', projectIndex);
      _content_contentmodule__WEBPACK_IMPORTED_MODULE_10__["default"].DOMcreateProjectOption;
    });
  };

  return { getInitial };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sidebarModule);

/***/ }),

/***/ "./src/icons/bin.svg":
/*!***************************!*\
  !*** ./src/icons/bin.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3270f2c93c8c138fa6cc.svg";

/***/ }),

/***/ "./src/icons/calendar_month.svg":
/*!**************************************!*\
  !*** ./src/icons/calendar_month.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "71b6bd16e42fbae8c856.svg";

/***/ }),

/***/ "./src/icons/calendar_today.svg":
/*!**************************************!*\
  !*** ./src/icons/calendar_today.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f69a750931abcd1a215f.svg";

/***/ }),

/***/ "./src/icons/expand_more.svg":
/*!***********************************!*\
  !*** ./src/icons/expand_more.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a039304cb66d6d94ca57.svg";

/***/ }),

/***/ "./src/icons/github.svg":
/*!******************************!*\
  !*** ./src/icons/github.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "550985caaa8859d4b95f.svg";

/***/ }),

/***/ "./src/icons/inbox.svg":
/*!*****************************!*\
  !*** ./src/icons/inbox.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "70c1c8efb43a33828bc1.svg";

/***/ }),

/***/ "./src/icons/minus.svg":
/*!*****************************!*\
  !*** ./src/icons/minus.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "260546d7dd2eaed533a4.svg";

/***/ }),

/***/ "./src/icons/plus.svg":
/*!****************************!*\
  !*** ./src/icons/plus.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "44c328fc3dd9b206b4c4.svg";

/***/ }),

/***/ "./src/icons/project.svg":
/*!*******************************!*\
  !*** ./src/icons/project.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "61253ddd220c2641b0d0.svg";

/***/ }),

/***/ "./src/icons/task_complete.svg":
/*!*************************************!*\
  !*** ./src/icons/task_complete.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "14bbc5f5696b9b261bfc.svg";

/***/ }),

/***/ "./src/icons/task_uncomplete.svg":
/*!***************************************!*\
  !*** ./src/icons/task_uncomplete.svg ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "db880e01a83d878a9455.svg";

/***/ }),

/***/ "./src/icons/view.svg":
/*!****************************!*\
  !*** ./src/icons/view.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "a5e4c55e4f43e45539ab.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _header_headermodule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header/headermodule */ "./src/header/headermodule.js");
/* harmony import */ var _sidebar_sidebarmodule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sidebar/sidebarmodule */ "./src/sidebar/sidebarmodule.js");
/* harmony import */ var _content_contentmodule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./content/contentmodule */ "./src/content/contentmodule.js");
/* harmony import */ var _content_taskmodule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/taskmodule */ "./src/content/taskmodule.js");






window.onload = () => {
  _header_headermodule__WEBPACK_IMPORTED_MODULE_1__["default"].getInitial();
  _sidebar_sidebarmodule__WEBPACK_IMPORTED_MODULE_2__["default"].getInitial();
  _content_contentmodule__WEBPACK_IMPORTED_MODULE_3__["default"].getInitial();
  _content_taskmodule__WEBPACK_IMPORTED_MODULE_4__["default"].getInitial();
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ3pNNUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmcUI7QUFDNEI7QUFDRztBQUNBO0FBQ047O0FBRTlDO0FBQ0EsRUFBRSx1RUFBdUI7QUFDekIsRUFBRSx5RUFBd0I7QUFDMUIsRUFBRSx5RUFBd0I7QUFDMUIsRUFBRSxzRUFBcUI7QUFDdkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvc3R5bGUuY3NzP2UzMjAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL2NvbnRlbnQvY29udGVudG1vZHVsZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvY29udGVudC90YXNrZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvY29udGVudC90YXNrbW9kdWxlLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9oZWFkZXIvaGVhZGVybW9kdWxlLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9zaWRlYmFyL3Byb2plY3RmYWN0b3J5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9zaWRlYmFyL3NpZGViYXJtb2R1bGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBwcm9qZWN0c0xpYnJhcnkgfSBmcm9tIFwiLi4vc2lkZWJhci9wcm9qZWN0ZmFjdG9yeVwiO1xuaW1wb3J0IHRhc2tNb2R1bGUgZnJvbSBcIi4vdGFza21vZHVsZVwiO1xuXG5jb25zdCBjb250ZW50TW9kdWxlID0gKCgpID0+IHtcbiAgY29uc3QgZGl2Q29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgY29uc3QgZ2V0SW5pdGlhbCA9ICgpID0+IHtcbiAgICBET01jcmVhdGVIZWFkbGluZSgnSW5ib3gnKTtcbiAgICBjb25zdCBkaXZJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIE9iamVjdC5hc3NpZ24oZGl2SW5wdXQsIHtcbiAgICAgIGlkOiAnZGl2LW5ldy10YXNrJyxcbiAgICAgIGNsYXNzTmFtZTogJ3Rhc2stY3JlYXRpb24nLFxuICAgIH0pO1xuICAgIGRpdkNvbnRlbnQuYXBwZW5kQ2hpbGQoZGl2SW5wdXQpO1xuICAgIGNvbnN0IGluaXRpYWxJbnB1dHMgPSBbXG4gICAgICB7IHRhZzogJ2lucHV0JywgaWQ6ICduZXctdGFzay10aXRsZScsIHR5cGU6ICd0ZXh0JywgdGV4dDogJ0FkZCBuZXcgdGFzaycsIGFkZENsYXNzOiAnJyB9LFxuICAgICAgeyB0YWc6ICd0ZXh0YXJlYScsIGlkOiAnbmV3LXRhc2stZGVzY3JpcHRpb24nLCB0eXBlOiAnJywgdGV4dDogJ0Rlc2NyaXB0aW9uJywgYWRkQ2xhc3M6ICcgZm9yLWhpZGUgaGlkZGVuJyB9LFxuICAgICAgeyB0YWc6ICdpbnB1dCcsIGlkOiAnbmV3LXRhc2stZGF0ZScsIHR5cGU6ICdkYXRlJywgdGV4dDogJ0R1ZSBkYXRlJywgYWRkQ2xhc3M6ICcgZm9yLWhpZGUgaGlkZGVuIGVtcHR5JyB9LFxuICAgICAgeyB0YWc6ICdidXR0b24nLCBpZDogJ25ldy10YXNrLXByaW9yaXR5JywgdHlwZTogJycsIHRleHQ6ICdOb3JtYWwgcHJpb3JpdHknLCBhZGRDbGFzczogJyBmb3ItaGlkZSBoaWRkZW4nIH0sXG4gICAgICB7IHRhZzogJ3NlbGVjdCcsIGlkOiAnbmV3LXRhc2stcHJvamVjdCcsIHR5cGU6ICcnLCB0ZXh0OiAnU2VsZWN0IHByb2plY3QnLCBhZGRDbGFzczogJyBmb3ItaGlkZSBoaWRkZW4gZW1wdHknIH0sXG4gICAgICB7IHRhZzogJ2J1dHRvbicsIGlkOiAnbmV3LXRhc2stYnV0dG9uJywgdHlwZTogJycsIHRleHQ6ICdDcmVhdGUgbmV3IHRhc2snLCBhZGRDbGFzczogJyBmb3ItaGlkZSBoaWRkZW4nIH0sXG4gICAgXTtcbiAgICBpbml0aWFsSW5wdXRzLmZvckVhY2goKGl0ZW0pID0+IGNyZWF0ZU5ld1Rhc2tGb3JtKGl0ZW0pKTtcbiAgICBET01jcmVhdGVQcm9qZWN0RW1wdHlPcHRpb24oKTtcbiAgICBwcm9qZWN0c0xpYnJhcnkuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgRE9NY3JlYXRlUHJvamVjdE9wdGlvbihwcm9qZWN0KTtcbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgRE9NaGlkZUZ1bGxUYXNrRm9ybSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZU5ld1Rhc2tGb3JtID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBkaXZJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXYtbmV3LXRhc2snKTtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLnRhZyk7XG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LCB7XG4gICAgICBpZDogaXRlbS5pZCxcbiAgICAgIGNsYXNzTmFtZTogJ25ldy10YXNrJyArIGl0ZW0uYWRkQ2xhc3MsXG4gICAgICBwbGFjZWhvbGRlcjogaXRlbS50ZXh0LFxuICAgIH0pO1xuICAgIGlmIChpdGVtLnRhZyA9PT0gJ2lucHV0JykgZWxlbWVudC50eXBlID0gaXRlbS50eXBlO1xuICAgIGlmIChpdGVtLnRhZyA9PT0gJ2J1dHRvbicpIGVsZW1lbnQudGV4dENvbnRlbnQgPSBpdGVtLnRleHQ7XG4gICAgaWYgKGl0ZW0uaWQgPT09ICduZXctdGFzay1wcmlvcml0eScpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgndG9wJyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b3AnKVxuICAgICAgICAgID8gZWxlbWVudC50ZXh0Q29udGVudCA9ICdUb3AgcHJpb3JpdHknXG4gICAgICAgICAgOiBlbGVtZW50LnRleHRDb250ZW50ID0gJ05vcm1hbCBwcmlvcml0eSc7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChpdGVtLmlkID09PSAnbmV3LXRhc2stdGl0bGUnKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4ge1xuICAgICAgICBET01zaG93RnVsbFRhc2tGb3JtKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChpdGVtLmlkID09PSAnbmV3LXRhc2stYnV0dG9uJykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRhc2tNb2R1bGUuY3JlYXRlTmV3VGFzaygpKTtcbiAgICB9O1xuICAgIGlmIChpdGVtLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgbGV0IG1tID0gdG9kYXkuZ2V0TW9udGgoKSArIDE7XG4gICAgICBpZiAobW0gPCAxMCkgbW0gPSAnMCcgKyBtbTtcbiAgICAgIGxldCBkZCA9IHRvZGF5LmdldERhdGUoKTtcbiAgICAgIGlmIChkZCA8IDEwKSBkZCA9ICcwJyArIGRkO1xuICAgICAgY29uc3QgeXl5eSA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XG4gICAgICBlbGVtZW50LnZhbHVlID0gYCR7eXl5eX0tJHttbX0tJHtkZH1gO1xuICAgIH07XG4gICAgZGl2SW5wdXQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgRE9NY3JlYXRlUHJvamVjdEVtcHR5T3B0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGVtcHR5T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgT2JqZWN0LmFzc2lnbihlbXB0eU9wdGlvbiwge1xuICAgICAgdmFsdWU6ICcnLFxuICAgICAgdGV4dENvbnRlbnQ6ICdTZWxlY3QgcHJvamVjdCcsXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBzZWxlY3RlZDogdHJ1ZSxcbiAgICB9KTtcbiAgICBpZiAocHJvamVjdHNMaWJyYXJ5Lmxlbmd0aCA+IDApIGVtcHR5T3B0aW9uLnRleHRDb250ZW50ID0gJ05vIHByb2plY3QnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1wcm9qZWN0JykuYXBwZW5kQ2hpbGQoZW1wdHlPcHRpb24pO1xuICAgIHJldHVybiBlbXB0eU9wdGlvbjtcbiAgfTtcblxuICBjb25zdCBET01jcmVhdGVQcm9qZWN0T3B0aW9uID0gKHByb2plY3QpID0+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stcHJvamVjdCcpO1xuICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIE9iamVjdC5hc3NpZ24ob3B0aW9uLCB7XG4gICAgICB2YWx1ZTogcHJvamVjdC5uYW1lLFxuICAgICAgdGV4dENvbnRlbnQ6IHByb2plY3QubmFtZSxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNlbGVjdGVkOiBmYWxzZSxcbiAgICB9KTtcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICByZXR1cm4gb3B0aW9uO1xuICB9O1xuXG4gIGNvbnN0IERPTWNyZWF0ZUhlYWRsaW5lID0gKHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGhlYWRsaW5lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgT2JqZWN0LmFzc2lnbihoZWFkbGluZURpdiwge1xuICAgICAgaWQ6ICdkaXYtY29udGVudC1oZWFkbGluZScsXG4gICAgfSlcbiAgICBjb25zdCBoZWFkbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgaGVhZGxpbmUudGV4dENvbnRlbnQgPSBzdHJpbmcgfHwgJ1RvZGF5JztcbiAgICBoZWFkbGluZURpdi5hcHBlbmRDaGlsZChoZWFkbGluZSk7XG4gICAgZGl2Q29udGVudC5wcmVwZW5kKGhlYWRsaW5lRGl2KTtcbiAgICByZXR1cm4gaGVhZGxpbmVEaXY7XG4gIH07XG5cbiAgY29uc3QgRE9Nc2hvd0Z1bGxUYXNrRm9ybSA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjZGl2LW5ldy10YXNrIC5oaWRkZW4nKVxuICAgICAgLmZvckVhY2goKG5vZGUpID0+IG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykpO1xuICB9O1xuXG4gIGNvbnN0IERPTWhpZGVGdWxsVGFza0Zvcm0gPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnI2Rpdi1uZXctdGFzayAuZm9yLWhpZGUnKVxuICAgICAgLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJykpO1xuICB9O1xuXG4gIHJldHVybiB7IGdldEluaXRpYWwsIERPTWhpZGVGdWxsVGFza0Zvcm0sIERPTXNob3dGdWxsVGFza0Zvcm0sIERPTWNyZWF0ZVByb2plY3RPcHRpb24sIERPTWNyZWF0ZVByb2plY3RFbXB0eU9wdGlvbiB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGVudE1vZHVsZTsiLCJjb25zdCBMT0NBTF9TVE9SQUdFX1RBU0tfS0VZID0gJ3RvZG8udGFza3NMaWJyYXJ5JztcbmxldCB0YXNrc0xpYnJhcnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfVEFTS19LRVkpKSB8fCBbXTtcblxuY29uc3QgdGFza0ZhY3RvcnkgPSAodGl0bGUsIGRlc2NyaXB0aW9uSW5pdGlhbCwgZHVlRGF0ZSwgZmluaXNoZWQsIHByaW9yaXR5LCBwcm9qZWN0TmFtZSkgPT4ge1xuICBsZXQgcHJvamVjdDtcbiAgaWYgKHByb2plY3ROYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICBwcm9qZWN0ID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0ID0gcHJvamVjdE5hbWUubmFtZTtcbiAgfVxuICBsZXQgZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbkluaXRpYWwgfHwgbnVsbDtcbiAgcmV0dXJuIHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBmaW5pc2hlZCwgcHJpb3JpdHksIHByb2plY3QgfTtcbn1cblxuZXhwb3J0IHsgdGFza0ZhY3RvcnksIHRhc2tzTGlicmFyeSwgTE9DQUxfU1RPUkFHRV9UQVNLX0tFWSB9OyIsImltcG9ydCB0YXNrVW5jb21wbGV0ZUljb24gZnJvbSAnL3NyYy9pY29ucy90YXNrX3VuY29tcGxldGUuc3ZnJztcbmltcG9ydCB0YXNrQ29tcGxldGVJY29uIGZyb20gJy9zcmMvaWNvbnMvdGFza19jb21wbGV0ZS5zdmcnO1xuaW1wb3J0IGJpbkljb24gZnJvbSAnL3NyYy9pY29ucy9iaW4uc3ZnJztcbmltcG9ydCB7IExPQ0FMX1NUT1JBR0VfVEFTS19LRVksIHRhc2tzTGlicmFyeSwgdGFza0ZhY3RvcnkgfSBmcm9tICcuL3Rhc2tmYWN0b3J5JztcbmltcG9ydCBjb250ZW50TW9kdWxlIGZyb20gJy4vY29udGVudG1vZHVsZSc7XG5pbXBvcnQgeyBwcm9qZWN0c0xpYnJhcnkgfSBmcm9tICcuLi9zaWRlYmFyL3Byb2plY3RmYWN0b3J5JztcblxuY29uc3QgdGFza01vZHVsZSA9ICgoKSA9PiB7XG4gIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuXG4gIGNvbnN0IGdldEluaXRpYWwgPSAoKSA9PiB7XG4gICAgRE9NZ2V0T3JDcmVhdGVUYXNrTGlzdERpdigpLmlubmVySFRNTCA9ICcnO1xuICAgIHRhc2tzTGlicmFyeS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgRE9NY3JlYXRlVGFza0Rpdih0YXNrLCBpbmRleCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2hvd0ZpbHRlcmVkID0gKGxpYnJhcnkpID0+IHtcbiAgICBET01nZXRPckNyZWF0ZVRhc2tMaXN0RGl2KCkuaW5uZXJIVE1MID0gJyc7XG4gICAgbGlicmFyeS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgRE9NY3JlYXRlVGFza0Rpdih0YXNrLCBpbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBET01nZXRPckNyZWF0ZVRhc2tMaXN0RGl2ID0gKCkgPT4ge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1saXN0Jyk7XG4gICAgaWYgKGRpdiA9PT0gbnVsbCkge1xuICAgICAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBPYmplY3QuYXNzaWduKGRpdiwge1xuICAgICAgICBpZDogJ3Rhc2stbGlzdCcsXG4gICAgICAgIGNsYXNzTmFtZTogJ3Rhc2sgdGFzay1saXN0JyxcbiAgICAgIH0pO1xuICAgICAgY29udGVudERpdi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIH07XG4gICAgcmV0dXJuIGRpdjtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVOZXdUYXNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLXRpdGxlJykudmFsdWU7XG4gICAgaWYgKHRpdGxlID09PSAnJykgcmV0dXJuIGFsZXJ0KCdZb3UgaGF2ZSB0byBzcGVjaWZ5IHRpdGxlJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stZGVzY3JpcHRpb24nKS52YWx1ZTtcbiAgICBsZXQgaW5wdXREYXRlID0gbmV3IERhdGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLWRhdGUnKS52YWx1ZSk7XG4gICAgaWYgKGlucHV0RGF0ZSA9PT0gJycpIHJldHVybiBhbGVydCgnWW91IGhhdmUgdG8gc3BlY2lmeSBkdWUgZGF0ZScpO1xuICAgIGlmIChpbnB1dERhdGUgPCBuZXcgRGF0ZShuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKSkgcmV0dXJuIGFsZXJ0KCdEYXRlIGNhbm5vdCBiZSBpbiB0aGUgcGFzdCcpO1xuICAgIGlucHV0RGF0ZSA9IG5ldyBEYXRlKGlucHV0RGF0ZS50b0RhdGVTdHJpbmcoKSk7XG4gICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLXByaW9yaXR5JykudGV4dENvbnRlbnQ7XG4gICAgcHJpb3JpdHkgPT09ICdOb3JtYWwgcHJpb3JpdHknID8gcHJpb3JpdHkgPSBmYWxzZSA6IHByaW9yaXR5ID0gdHJ1ZTtcbiAgICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLXByb2plY3QnKS52YWx1ZTtcbiAgICBjb25zdCBmaW5kUHJvamVjdCA9IHByb2plY3RzTGlicmFyeS5maWx0ZXIoKHByb2plY3QpID0+IHtcbiAgICAgIHJldHVybiBwcm9qZWN0Lm5hbWUgPT09IHByb2plY3RTZWxlY3Q7XG4gICAgfSk7XG4gICAgY29uc3QgbmV3VGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgaW5wdXREYXRlLCBmYWxzZSwgcHJpb3JpdHksIGZpbmRQcm9qZWN0WzBdKTtcbiAgICB0YXNrc0xpYnJhcnkucHVzaChuZXdUYXNrKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1RBU0tfS0VZLCBKU09OLnN0cmluZ2lmeSh0YXNrc0xpYnJhcnkpKTtcbiAgICB0YXNrTW9kdWxlLmdldE9yQ3JlYXRlVGFza0xpc3REaXYoKS5pbm5lckhUTUwgPSAnJztcbiAgICB0YXNrc0xpYnJhcnkuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIHRhc2tNb2R1bGUuY3JlYXRlVGFza0Rpdih0YXNrLCBpbmRleClcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stdGl0bGUnKS52YWx1ZSA9ICcnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1kZXNjcmlwdGlvbicpLnZhbHVlID0gJyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLXByb2plY3QnKS52YWx1ZSA9ICcnO1xuICAgIGNvbnRlbnRNb2R1bGUuRE9NaGlkZUZ1bGxUYXNrRm9ybSgpO1xuICB9O1xuXG5cbiAgY29uc3QgRE9NY3JlYXRlVGFza0RpdiA9ICh0YXNrLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtYWluRGl2LmNsYXNzTmFtZSA9ICd0YXNrIHRhc2staXRlbSc7XG4gICAgaWYgKHRhc2sucHJpb3JpdHkgPT09IHRydWUpIG1haW5EaXYuY2xhc3NMaXN0LmFkZCgncHJpb3JpdHknKTtcbiAgICBsZXQgc3RhdHVzU3JjID0gdGFza1VuY29tcGxldGVJY29uO1xuICAgIGlmICh0YXNrLmZpbmlzaGVkID09PSB0cnVlKSB7XG4gICAgICBtYWluRGl2LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlZCcpO1xuICAgICAgc3RhdHVzU3JjID0gdGFza0NvbXBsZXRlSWNvbjtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhdHVzSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdHVzSWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWljb24gdGFzay1jb21wbGV0ZScsXG4gICAgICBzcmM6IHN0YXR1c1NyYyxcbiAgICB9KTtcbiAgICBzdGF0dXNJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrJywgaW5kZXgpO1xuICAgIHN0YXR1c0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBmaW5pc2hUYXNrKGluZGV4KSk7XG5cbiAgICBjb25zdCBzdWJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBPYmplY3QuYXNzaWduKHN1YkRpdiwge1xuICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWNvbnRlbnQnLFxuICAgIH0pO1xuICAgIGNvbnN0IHRpdGxlUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBPYmplY3QuYXNzaWduKHRpdGxlUCwge1xuICAgICAgdGV4dENvbnRlbnQ6IHRhc2sudGl0bGUsXG4gICAgICBjbGFzc05hbWU6ICd0YXNrIHRhc2stY29udGVudC10aXRsZScsXG4gICAgfSk7XG4gICAgY29uc3QgZGVzY3JpcHRpb25QID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIE9iamVjdC5hc3NpZ24oZGVzY3JpcHRpb25QLCB7XG4gICAgICB0ZXh0Q29udGVudDogdGFzay5kZXNjcmlwdGlvbixcbiAgICAgIGNsYXNzTmFtZTogJ3Rhc2sgdGFzay1jb250ZW50LWRlc2NyaXB0aW9uJyxcbiAgICB9KTtcbiAgICBzdWJEaXYuYXBwZW5kKHRpdGxlUCwgZGVzY3JpcHRpb25QKTtcbiAgICBpZiAodGFzay5wcm9qZWN0ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBwcm9qZWN0UCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24ocHJvamVjdFAsIHtcbiAgICAgICAgdGV4dENvbnRlbnQ6IHRhc2sucHJvamVjdCxcbiAgICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWNvbnRlbnQtcHJvamVjdCcsXG4gICAgICB9KTtcbiAgICAgIHN1YkRpdi5hcHBlbmQocHJvamVjdFApO1xuICAgIH07XG4gICAgLy8gRHVlIHRpbWVcbiAgICBjb25zdCB0aW1lRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aW1lRGl2LCB7XG4gICAgICBjbGFzc05hbWU6ICd0YXNrIHRhc2stY29udGVudC10aW1lJyxcbiAgICB9KTtcbiAgICBjb25zdCB0aW1lUCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBjb25zdCB0YXNrRGF0ZSA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgbGV0IGRheSA9IHRhc2tEYXRlLmdldERhdGUoKTtcbiAgICBpZiAoZGF5IDwgMTApIGRheSA9ICcwJyArIGRheTtcbiAgICBsZXQgbW9udGggPSB0YXNrRGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICBpZiAobW9udGggPCAxMCkgbW9udGggPSAnMCcgKyBtb250aDtcbiAgICBjb25zdCB5ZWFyID0gdGFza0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBsZXQgdGFza0RhdGVTdHJpbmc7XG4gICAgaWYgKHllYXIgPiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpKSB7XG4gICAgICB0YXNrRGF0ZVN0cmluZyA9IGAke2RheX0vJHttb250aH0vJHt5ZWFyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2tEYXRlU3RyaW5nID0gYCR7ZGF5fS8ke21vbnRofWA7XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24odGltZVAsIHtcbiAgICAgIGNsYXNzTmFtZTogJ3Rhc2sgdGFzay1jb250ZW50LXRpbWUnLFxuICAgICAgdGV4dENvbnRlbnQ6IHRhc2tEYXRlU3RyaW5nLFxuICAgIH0pO1xuICAgIGlmICh0YXNrRGF0ZSA8PSBuZXcgRGF0ZShuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKSkge1xuICAgICAgdGltZVAuY2xhc3NMaXN0LmFkZCgnb3ZlcmR1ZScpO1xuICAgIH07XG4gICAgdGltZURpdi5hcHBlbmRDaGlsZCh0aW1lUCk7XG4gICAgLy8gRGVsZXRlIHRhc2sgaWNvblxuICAgIGNvbnN0IGRlbGV0ZUljb24gPSBuZXcgSW1hZ2UoKTtcbiAgICBPYmplY3QuYXNzaWduKGRlbGV0ZUljb24sIHtcbiAgICAgIGNsYXNzTmFtZTogJ3Rhc2sgdGFzay1pY29uIHRhc2stZGVsZXRlJyxcbiAgICAgIHNyYzogYmluSWNvbixcbiAgICB9KTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnZGF0YS10YXNrJywgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkZWxldGVUYXNrKGluZGV4KSk7XG5cbiAgICBtYWluRGl2LmFwcGVuZChzdGF0dXNJY29uLCBzdWJEaXYsIHRpbWVEaXYsIGRlbGV0ZUljb24pO1xuICAgIERPTWdldE9yQ3JlYXRlVGFza0xpc3REaXYoKS5wcmVwZW5kKG1haW5EaXYpO1xuICAgIHJldHVybiBtYWluRGl2O1xuICB9O1xuXG4gIGNvbnN0IGZpbmlzaFRhc2sgPSAoaW5kZXgpID0+IHtcbiAgICBsZXQgc3RhdHVzID0gdGFza3NMaWJyYXJ5W2luZGV4XS5maW5pc2hlZDtcbiAgICBzdGF0dXMgPT09IHRydWUgPyBzdGF0dXMgPSBmYWxzZSA6IHN0YXR1cyA9IHRydWU7XG4gICAgdGFza3NMaWJyYXJ5W2luZGV4XS5maW5pc2hlZCA9IHN0YXR1cztcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1RBU0tfS0VZLCBKU09OLnN0cmluZ2lmeSh0YXNrc0xpYnJhcnkpKTtcbiAgICBnZXRJbml0aWFsKCk7XG4gICAgcmV0dXJuIHRhc2tzTGlicmFyeVtpbmRleF07XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlVGFzayA9IChpbmRleCkgPT4ge1xuICAgIHRhc2tzTGlicmFyeS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfVEFTS19LRVksIEpTT04uc3RyaW5naWZ5KHRhc2tzTGlicmFyeSkpO1xuICAgIGdldEluaXRpYWwoKTtcbiAgfVxuXG4gIHJldHVybiB7IGdldE9yQ3JlYXRlVGFza0xpc3REaXY6IERPTWdldE9yQ3JlYXRlVGFza0xpc3REaXYsIGNyZWF0ZU5ld1Rhc2ssIGNyZWF0ZVRhc2tEaXY6IERPTWNyZWF0ZVRhc2tEaXYsIGdldEluaXRpYWwsIHNob3dGaWx0ZXJlZCB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdGFza01vZHVsZTtcbiIsImltcG9ydCBtZW51SWNvbiBmcm9tICcvc3JjL2ljb25zL3ZpZXcuc3ZnJztcbmltcG9ydCBnaXRodWJJY29uIGZyb20gJy9zcmMvaWNvbnMvZ2l0aHViLnN2Zyc7XG5pbXBvcnQgdGFza01vZHVsZSBmcm9tICcuLi9jb250ZW50L3Rhc2ttb2R1bGUnO1xuaW1wb3J0IHsgdGFza3NMaWJyYXJ5IH0gZnJvbSAnLi4vY29udGVudC90YXNrZmFjdG9yeSc7XG5cbmNvbnN0IGhlYWRlck1vZHVsZSA9ICgoKSA9PiB7XG4gIGNvbnN0IGdldEluaXRpYWwgPSAoKSA9PiB7XG4gICAgY29uc3QgbGVmdERpdiA9ICcjaGVhZGVyPmRpdi5sZWZ0JztcbiAgICBjb25zdCBtaWREaXYgPSAnI2hlYWRlcj5kaXYubWlkJztcbiAgICBjb25zdCByaWdodERpdiA9ICcjaGVhZGVyPmRpdi5yaWdodCc7XG5cbiAgICBjb25zdCBtZW51SW1nTGVmdCA9IHtcbiAgICAgIHRhZzogJ2ltZycsIGlkOiAnbWVudScsIHNyYzogbWVudUljb24sIGFkZENsYXNzOiAnIG5hdi1pY29uJyxcbiAgICAgIHR5cGU6ICcnLCB0ZXh0OiAnbWVudScsIGRlc3RpbmF0aW9uOiBsZWZ0RGl2LFxuICAgIH07XG4gICAgY29uc3Qgc2VhcmNoSW5wdXRMZWZ0ID0ge1xuICAgICAgdGFnOiAnaW5wdXQnLCBpZDogJ3NlYXJjaCcsIHNyYzogJycsIGFkZENsYXNzOiAnIG5hdi1zZWFyY2gnLFxuICAgICAgdHlwZTogJ3RleHQnLCB0ZXh0OiAnU2VhcmNoJywgZGVzdGluYXRpb246IGxlZnREaXYsXG4gICAgfTtcbiAgICBjb25zdCBhbmNob3JNaWQgPSB7XG4gICAgICB0YWc6ICdhJywgaWQ6IG51bGwsIHNyYzogJyMnLCBhZGRDbGFzczogJycsXG4gICAgICB0eXBlOiAnJywgdGV4dDogJycsIGRlc3RpbmF0aW9uOiBtaWREaXYsXG4gICAgfTtcbiAgICBjb25zdCBzcGFuQXBwTmFtZU1pZCA9IHtcbiAgICAgIHRhZzogJ3NwYW4nLCBpZDogbnVsbCwgc3JjOiAnJywgYWRkQ2xhc3M6ICcnLFxuICAgICAgdHlwZTogJycsIHRleHQ6ICdUT0RPIEFQUCcsIGRlc3RpbmF0aW9uOiBtaWREaXYsXG4gICAgfTtcbiAgICBjb25zdCBhbmNob3JSaWdodCA9IHtcbiAgICAgIHRhZzogJ2EnLCBpZDogbnVsbCwgc3JjOiAnaHR0cHM6Ly9naXRodWIuY29tL25lbGZpbW92LycsIGFkZENsYXNzOiAnJyxcbiAgICAgIHR5cGU6ICcnLCB0ZXh0OiAnJywgZGVzdGluYXRpb246IHJpZ2h0RGl2LFxuICAgIH07XG4gICAgY29uc3QgZ2l0aHViSW1nUmlnaHQgPSB7XG4gICAgICB0YWc6ICdpbWcnLCBpZDogbnVsbCwgc3JjOiBnaXRodWJJY29uLCBhZGRDbGFzczogJyBuYXYtaWNvbicsXG4gICAgICB0eXBlOiAnJywgdGV4dDogJ2dpdGh1YicsIGRlc3RpbmF0aW9uOiByaWdodERpdixcbiAgICB9O1xuICAgIGNvbnN0IHNwYW5HaXRodWIgPSB7XG4gICAgICB0YWc6ICdzcGFuJywgaWQ6IG51bGwsIHNyYzogJycsIGFkZENsYXNzOiAnJyxcbiAgICAgIHR5cGU6ICcnLCB0ZXh0OiAnR2l0aHViJywgZGVzdGluYXRpb246IHJpZ2h0RGl2LFxuICAgIH07XG4gICAgY29uc3QgaW5pdGlhbEhlYWRlciA9IFtcbiAgICAgIG1lbnVJbWdMZWZ0LCBzZWFyY2hJbnB1dExlZnQsIGFuY2hvck1pZCwgc3BhbkFwcE5hbWVNaWQsXG4gICAgICBhbmNob3JSaWdodCwgZ2l0aHViSW1nUmlnaHQsIHNwYW5HaXRodWIsXG4gICAgXTtcbiAgICBpbml0aWFsSGVhZGVyLmZvckVhY2goKGl0ZW0pID0+IGNyZWF0ZUhlYWRlckl0ZW0oaXRlbSkpO1xuICB9XG5cbiAgY29uc3QgY3JlYXRlSGVhZGVySXRlbSA9IChpdGVtKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXRlbS50YWcpO1xuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ25hdicgKyBpdGVtLmFkZENsYXNzO1xuICAgIGlmIChpdGVtLmlkKSBlbGVtZW50LmlkID0gaXRlbS5pZDtcbiAgICBpZiAoaXRlbS5pZCA9PT0gJ21lbnUnKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgICB9KVxuICAgIH07XG4gICAgaWYgKGl0ZW0uaWQgPT09ICdzZWFyY2gnKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICBzZWFyY2hUYXNrKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmIChpdGVtLnRhZyA9PT0gJ2ltZycpIHtcbiAgICAgIGVsZW1lbnQuc3JjID0gaXRlbS5zcmM7XG4gICAgICBlbGVtZW50LmFsdCA9IGl0ZW0udGV4dDtcbiAgICB9O1xuICAgIGlmIChpdGVtLnRhZyA9PT0gJ2lucHV0Jykge1xuICAgICAgZWxlbWVudC5wbGFjZWhvbGRlciA9IGl0ZW0udGV4dDtcbiAgICAgIGVsZW1lbnQudHlwZSA9IGl0ZW0udHlwZTtcbiAgICAgIGVsZW1lbnQubmFtZSA9IGl0ZW0uaWQ7XG4gICAgfTtcbiAgICBpZiAoaXRlbS50YWcgPT09ICdhJykge1xuICAgICAgZWxlbWVudC5ocmVmID0gaXRlbS5zcmM7XG4gICAgfTtcbiAgICBpZiAoaXRlbS50YWcgPT09ICdzcGFuJykge1xuICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcbiAgICB9O1xuICAgIGNvbnN0IGRlc3RpbnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0uZGVzdGluYXRpb24pO1xuICAgIGlmIChkZXN0aW55LnF1ZXJ5U2VsZWN0b3IoJ2EubmF2JykpIHtcbiAgICAgIGRlc3RpbnkucXVlcnlTZWxlY3RvcignYS5uYXYnKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpdGVtLmRlc3RpbmF0aW9uKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9O1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZU1lbnUgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG4gICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgfVxuXG4gIGNvbnN0IHNlYXJjaFRhc2sgPSAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoJykudmFsdWU7XG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKHZhbHVlLCAnZ2knKTtcbiAgICBjb25zdCBmaWx0ZXJUaXRsZSA9IHRhc2tzTGlicmFyeS5maWx0ZXIoKHRhc2spID0+IHJlZ2V4LnRlc3QodGFzay50aXRsZSkpO1xuICAgIGNvbnN0IGZpbHRlckRlc2NyaXB0aW9uID0gdGFza3NMaWJyYXJ5LmZpbHRlcigodGFzaykgPT4gcmVnZXgudGVzdCh0YXNrLmRlc2NyaXB0aW9uKSk7XG4gICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgY29uc3QgZmlsdGVyZWRMaWJyYXJ5ID0gZmlsdGVyVGl0bGUuY29uY2F0KGZpbHRlckRlc2NyaXB0aW9uKTtcbiAgICAgIHRhc2tNb2R1bGUuc2hvd0ZpbHRlcmVkKGZpbHRlcmVkTGlicmFyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2tNb2R1bGUuZ2V0SW5pdGlhbCgpO1xuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0SW5pdGlhbCB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyTW9kdWxlOyIsImNvbnN0IExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVkgPSAndG9kby5wcm9qZWN0c0xpYnJhcnknO1xuY29uc3QgcHJvamVjdHNMaWJyYXJ5ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1BST0pFQ1RfS0VZKSkgfHwgW107XG5cbmNvbnN0IHByb2plY3RGYWN0b3J5ID0gKG5hbWUpID0+IHtcbiAgY29uc3QgaXNQcm9qZWN0ID0gdHJ1ZTtcbiAgcmV0dXJuIHsgbmFtZSwgaXNQcm9qZWN0IH07XG59XG5cbmV4cG9ydCB7IHByb2plY3RzTGlicmFyeSwgcHJvamVjdEZhY3RvcnksIExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVkgfTsiLCJpbXBvcnQgZXhwYW5kSWNvbiBmcm9tICcvc3JjL2ljb25zL2V4cGFuZF9tb3JlLnN2Zyc7XG5pbXBvcnQgcGx1c0ljb24gZnJvbSAnL3NyYy9pY29ucy9wbHVzLnN2Zyc7XG5pbXBvcnQgbWludXNJY29uIGZyb20gJy9zcmMvaWNvbnMvbWludXMuc3ZnJztcbmltcG9ydCBpbmNvbWVJY29uIGZyb20gJy9zcmMvaWNvbnMvaW5ib3guc3ZnJztcbmltcG9ydCB0b2RheUljb24gZnJvbSAnL3NyYy9pY29ucy9jYWxlbmRhcl90b2RheS5zdmcnO1xuaW1wb3J0IGFoZWFkSWNvbiBmcm9tICcvc3JjL2ljb25zL2NhbGVuZGFyX21vbnRoLnN2Zyc7XG5pbXBvcnQgcHJvamVjdEljb24gZnJvbSAnL3NyYy9pY29ucy9wcm9qZWN0LnN2Zyc7XG5pbXBvcnQgeyBwcm9qZWN0c0xpYnJhcnksIExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVksIHByb2plY3RGYWN0b3J5IH0gZnJvbSAnLi9wcm9qZWN0ZmFjdG9yeSc7XG5pbXBvcnQgeyB0YXNrc0xpYnJhcnkgfSBmcm9tICcuLi9jb250ZW50L3Rhc2tmYWN0b3J5JztcbmltcG9ydCB0YXNrTW9kdWxlIGZyb20gJy4uL2NvbnRlbnQvdGFza21vZHVsZSc7XG5pbXBvcnQgY29udGVudE1vZHVsZSBmcm9tICcuLi9jb250ZW50L2NvbnRlbnRtb2R1bGUnO1xuXG5jb25zdCBzaWRlYmFyTW9kdWxlID0gKCgpID0+IHtcbiAgY29uc3Qgc2lkZWJhckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyJyk7XG5cbiAgY29uc3QgZ2V0SW5pdGlhbCA9ICgpID0+IHtcbiAgICBET01jcmVhdGVIZWFkZXJzKCk7XG4gICAgY29uc3QgbWFpbkluaXRpYWxSb3dzID0gW1xuICAgICAgWydBbGwnLCBpbmNvbWVJY29uLCBmYWxzZSwgJ2FjdGl2ZSddLFxuICAgICAgWydUb2RheScsIHRvZGF5SWNvbiwgZmFsc2UsICcnXSxcbiAgICAgIFsnQWhlYWQnLCBhaGVhZEljb24sIGZhbHNlLCAnJ10sXG4gICAgXTtcbiAgICBtYWluSW5pdGlhbFJvd3MuZm9yRWFjaCgoaXRlbSkgPT4gRE9NY3JlYXRlSXRlbSguLi5pdGVtKSk7XG4gICAgcHJvamVjdHNMaWJyYXJ5LmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiBET01jcmVhdGVJdGVtKHByb2plY3QubmFtZSwgcHJvamVjdEljb24sIHByb2plY3QuaXNQcm9qZWN0LCAnJywgaW5kZXgpKTtcbiAgfTtcblxuICBjb25zdCBET01jcmVhdGVJdGVtID0gKHRleHQsIGljb24sIGlzUHJvamVjdCwgYWRkQ2xhc3MsIHByb2plY3RJbmRleCkgPT4ge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBPYmplY3QuYXNzaWduKGxpLCB7XG4gICAgICBjbGFzc05hbWU6ICdzaWRlYmFyIHNpZGViYXItaXRlbSAnICsgYWRkQ2xhc3MsXG4gICAgfSk7XG4gICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjc2lkZWJhciBsaScpLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIH0pO1xuICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2LWNvbnRlbnQtaGVhZGxpbmU+aDInKVxuICAgICAgICAudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgIH0pO1xuICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgT2JqZWN0LmFzc2lnbihzcGFuLCB7XG4gICAgICB0ZXh0Q29udGVudDogdGV4dCxcbiAgICAgIGNsYXNzTmFtZTogJ3NpZGViYXIgc2lkZWJhci1zcGFuJyxcbiAgICB9KTtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIE9iamVjdC5hc3NpZ24oaW1hZ2UsIHtcbiAgICAgIGNsYXNzTmFtZTogJ3NpZGViYXIgc2lkZWJhci1pY29uJyxcbiAgICAgIHNyYzogaWNvbixcbiAgICB9KTtcblxuICAgIGlmICh0ZXh0ID09PSAnQWxsJykge1xuICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRhc2tNb2R1bGUuZ2V0SW5pdGlhbCgpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBpZiAodGV4dCA9PT0gJ1RvZGF5Jykge1xuICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTGlicmFyeSA9IHRhc2tzTGlicmFyeS5maWx0ZXIoKHRhc2spID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGFzay5kdWVEYXRlKS50b0RhdGVTdHJpbmcoKSA9PT0gbmV3IERhdGUobmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0YXNrTW9kdWxlLnNob3dGaWx0ZXJlZChmaWx0ZXJlZExpYnJhcnkpO1xuICAgICAgICByZXR1cm4gZmlsdGVyZWRMaWJyYXJ5O1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBpZiAodGV4dCA9PT0gJ0FoZWFkJykge1xuICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTGlicmFyeSA9IHRhc2tzTGlicmFyeS5maWx0ZXIoKHRhc2spID0+IHtcbiAgICAgICAgICByZXR1cm4gbmV3IERhdGUodGFzay5kdWVEYXRlKS50b0RhdGVTdHJpbmcoKSAhPT0gbmV3IERhdGUobmV3IERhdGUoKS50b0RhdGVTdHJpbmcoKSkudG9EYXRlU3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0YXNrTW9kdWxlLnNob3dGaWx0ZXJlZChmaWx0ZXJlZExpYnJhcnkpO1xuICAgICAgICByZXR1cm4gZmlsdGVyZWRMaWJyYXJ5O1xuICAgICAgfSk7XG4gICAgfVxuICAgIGxpLmFwcGVuZChpbWFnZSwgc3Bhbik7XG5cbiAgICBsZXQgdWw7XG4gICAgaWYgKGlzUHJvamVjdCkge1xuICAgICAgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1wcm9qZWN0PnVsJyk7XG4gICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRMaWJyYXJ5ID0gdGFza3NMaWJyYXJ5LmZpbHRlcigodGFzaykgPT4ge1xuICAgICAgICAgIHJldHVybiB0YXNrLnByb2plY3QgPT09IGxpLnRleHRDb250ZW50O1xuICAgICAgICB9KTtcbiAgICAgICAgdGFza01vZHVsZS5zaG93RmlsdGVyZWQoZmlsdGVyZWRMaWJyYXJ5KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaS5pZCA9IGAke3RleHQudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1tYWluPnVsJyk7XG4gICAgfTtcbiAgICBpZiAoaXNQcm9qZWN0KSB7XG4gICAgICBjb25zdCBkZWxldGVJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihkZWxldGVJbWFnZSwge1xuICAgICAgICBjbGFzc05hbWU6ICdzaWRlYmFyIHNpZGViYXItaWNvbiBzaWRlYmFyLWRlbGV0ZS1wcm9qZWN0JyxcbiAgICAgICAgc3JjOiBtaW51c0ljb24sXG4gICAgICB9KTtcbiAgICAgIGRlbGV0ZUltYWdlLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0JywgcHJvamVjdEluZGV4KTtcbiAgICAgIGRlbGV0ZUltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZGVsZXRlUHJvamVjdChwcm9qZWN0SW5kZXgpKTtcbiAgICAgIGxpLmFwcGVuZChkZWxldGVJbWFnZSk7XG4gICAgfTtcbiAgICB1bC5hcHBlbmRDaGlsZChsaSk7XG4gIH07XG5cbiAgY29uc3QgRE9NY3JlYXRlSGVhZGVycyA9ICgpID0+IHtcbiAgICBsZXQgc2lkZWJhckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyLW1haW4nKTtcbiAgICBpZiAoc2lkZWJhckRpdiA9PT0gbnVsbCkgRE9NY3JlYXRlRGl2KGZhbHNlKTtcbiAgICBsZXQgcHJvamVjdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWRlYmFyLXByb2plY3QnKTtcbiAgICBpZiAocHJvamVjdERpdiA9PT0gbnVsbCkgRE9NY3JlYXRlRGl2KHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IERPTWNyZWF0ZURpdiA9IChpc1Byb2plY3QpID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGlmIChpc1Byb2plY3QpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGl2LCB7XG4gICAgICAgIGlkOiAnc2lkZWJhci1wcm9qZWN0JyxcbiAgICAgIH0pXG4gICAgICBjb25zdCBoZWFkbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICBoZWFkbGluZS50ZXh0Q29udGVudCA9ICdQcm9qZWN0cyc7XG4gICAgICBjb25zdCBkaXZIZWFkbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2SGVhZGxpbmUuY2xhc3NOYW1lID0gJ3NpZGViYXIgc2lkZWJhci1oZWFkbGluZSc7XG4gICAgICBjb25zdCBpbWFnZUV4cGFuZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihpbWFnZUV4cGFuZCwge1xuICAgICAgICBjbGFzc05hbWU6ICdzaWRlYmFyIHNpZGViYXItaWNvbiBzaWRlYmFyLWV4cGFuZC1pY29uJyxcbiAgICAgICAgc3JjOiBleHBhbmRJY29uLFxuICAgICAgfSlcbiAgICAgIGNvbnN0IGltYWdlUGx1cyA9IG5ldyBJbWFnZSgpO1xuICAgICAgT2JqZWN0LmFzc2lnbihpbWFnZVBsdXMsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAnc2lkZWJhciBzaWRlYmFyLWljb24gc2lkZWJhci1wbHVzcHJvamVjdC1pY29uJyxcbiAgICAgICAgc3JjOiBwbHVzSWNvbixcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24obmV3UHJvamVjdElucHV0LCB7XG4gICAgICAgIGlkOiAnbmV3LXByb2plY3QtaW5wdXQnLFxuICAgICAgICBjbGFzc05hbWU6ICduYXYtc2VhcmNoIGhpZGRlbicsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdQcm9qZWN0IG5hbWUnLFxuICAgICAgfSk7XG4gICAgICBuZXdQcm9qZWN0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICBjcmVhdGVQcm9qZWN0KG5ld1Byb2plY3RJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgbmV3UHJvamVjdElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgICAgbmV3UHJvamVjdElucHV0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBuZXdQcm9qZWN0SW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICB9KTtcbiAgICAgIGRpdkhlYWRsaW5lLmFwcGVuZChpbWFnZUV4cGFuZCwgaGVhZGxpbmUsIGltYWdlUGx1cywgbmV3UHJvamVjdElucHV0KTtcbiAgICAgIGxldCByb3RhdGlvbiA9IDA7XG4gICAgICBpbWFnZUV4cGFuZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgKCgpID0+IHtcbiAgICAgICAgICByb3RhdGlvbiArPSAxODA7XG4gICAgICAgICAgaWYgKHJvdGF0aW9uID09PSAzNjApIHJvdGF0aW9uID0gMDtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhci1leHBhbmQtaWNvbicpXG4gICAgICAgICAgICAuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3JvdGF0aW9ufWRlZylgO1xuICAgICAgICB9KSgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1wcm9qZWN0PnVsJylcbiAgICAgICAgICAuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICB9KTtcbiAgICAgIGltYWdlUGx1cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbmV3UHJvamVjdElucHV0LmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgfSk7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQoZGl2SGVhZGxpbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuYXNzaWduKGRpdiwge1xuICAgICAgICBpZDogJ3NpZGViYXItbWFpbicsXG4gICAgICB9KVxuICAgIH1cbiAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKSk7XG4gICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHJldHVybiBkaXY7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlUHJvamVjdCA9ICh2YWx1ZSkgPT4ge1xuICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkodmFsdWUpO1xuICAgIHByb2plY3RzTGlicmFyeS5wdXNoKG5ld1Byb2plY3QpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVksIEpTT04uc3RyaW5naWZ5KHByb2plY3RzTGlicmFyeSkpO1xuICAgIGNvbnN0IHVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZGViYXItcHJvamVjdD51bCcpO1xuICAgIGlmICh1bCAhPT0gbnVsbCkgdWwuaW5uZXJIVE1MID0gJyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLXByb2plY3QnKS5pbm5lckhUTUwgPSAnJztcbiAgICBjb250ZW50TW9kdWxlLkRPTWNyZWF0ZVByb2plY3RFbXB0eU9wdGlvbigpO1xuICAgIHByb2plY3RzTGlicmFyeS5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgRE9NY3JlYXRlSXRlbShwcm9qZWN0Lm5hbWUsIHByb2plY3RJY29uLCBwcm9qZWN0LmlzUHJvamVjdCwgJycsIGluZGV4KTtcbiAgICAgIGNvbnRlbnRNb2R1bGUuRE9NY3JlYXRlUHJvamVjdE9wdGlvbihwcm9qZWN0KTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3UHJvamVjdDtcbiAgfTtcblxuICBjb25zdCBkZWxldGVQcm9qZWN0ID0gKGluZGV4KSA9PiB7XG4gICAgcHJvamVjdHNMaWJyYXJ5LnNwbGljZShpbmRleCwgMSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNMaWJyYXJ5KSk7XG4gICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1wcm9qZWN0PnVsJyk7XG4gICAgaWYgKHVsICE9PSBudWxsKSB1bC5pbm5lckhUTUwgPSAnJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stcHJvamVjdCcpLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnRlbnRNb2R1bGUuRE9NY3JlYXRlUHJvamVjdEVtcHR5T3B0aW9uKCk7XG4gICAgcHJvamVjdHNMaWJyYXJ5LmZvckVhY2goKHByb2plY3QsIHByb2plY3RJbmRleCkgPT4ge1xuICAgICAgRE9NY3JlYXRlSXRlbShwcm9qZWN0Lm5hbWUsIHByb2plY3RJY29uLCBwcm9qZWN0LmlzUHJvamVjdCwgJycsIHByb2plY3RJbmRleCk7XG4gICAgICBjb250ZW50TW9kdWxlLkRPTWNyZWF0ZVByb2plY3RPcHRpb247XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0SW5pdGlhbCB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2lkZWJhck1vZHVsZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBoZWFkZXJNb2R1bGUgZnJvbSAnLi9oZWFkZXIvaGVhZGVybW9kdWxlJztcbmltcG9ydCBzaWRlYmFyTW9kdWxlIGZyb20gJy4vc2lkZWJhci9zaWRlYmFybW9kdWxlJztcbmltcG9ydCBjb250ZW50TW9kdWxlIGZyb20gJy4vY29udGVudC9jb250ZW50bW9kdWxlJztcbmltcG9ydCB0YXNrTW9kdWxlIGZyb20gJy4vY29udGVudC90YXNrbW9kdWxlJztcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgaGVhZGVyTW9kdWxlLmdldEluaXRpYWwoKTtcbiAgc2lkZWJhck1vZHVsZS5nZXRJbml0aWFsKCk7XG4gIGNvbnRlbnRNb2R1bGUuZ2V0SW5pdGlhbCgpO1xuICB0YXNrTW9kdWxlLmdldEluaXRpYWwoKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=