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
/* harmony import */ var _taskfactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskfactory */ "./src/content/taskfactory.js");
/* harmony import */ var _taskmodule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskmodule */ "./src/content/taskmodule.js");




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
      element.addEventListener('click', () => _taskmodule__WEBPACK_IMPORTED_MODULE_2__["default"].createNewTask());
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
    document.querySelectorAll('#div-new-task .hidden').forEach((node) => {
      node.classList.remove('hidden');
    })
  };

  const DOMhideFullTaskForm = () => {
    document.querySelectorAll('#div-new-task .for-hide').forEach((item) => item.classList.add('hidden'));
  };

  return { getInitial, hideFullTaskForm: DOMhideFullTaskForm, showFullTaskForm: DOMshowFullTaskForm, DOMcreateProjectOption, DOMcreateProjectEmptyOption };
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
    _contentmodule__WEBPACK_IMPORTED_MODULE_4__["default"].hideFullTaskForm();
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
      menuImgLeft, searchInputLeft, anchorMid, spanAppNameMid, anchorRight,
      githubImgRight, spanGithub,
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
      element.addEventListener('input', (e) => {
        searchTask();
      })
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
    const filterTitle = _content_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.filter((task) => {
      return regex.test(task.title);
    });
    const filterDescription = _content_taskfactory__WEBPACK_IMPORTED_MODULE_3__.tasksLibrary.filter((task) => {
      return regex.test(task.description);
    });
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

  return { getInitial, createItem: DOMcreateItem };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN6TTVCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZnFCO0FBQzRCO0FBQ0c7QUFDQTtBQUNOOztBQUU5QztBQUNBLEVBQUUsdUVBQXVCO0FBQ3pCLEVBQUUseUVBQXdCO0FBQzFCLEVBQUUseUVBQXdCO0FBQzFCLEVBQUUsc0VBQXFCO0FBQ3ZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL3N0eWxlLmNzcz9lMzIwIiwid2VicGFjazovL29kaW4tdG9kb2FwcC8uL3NyYy9jb250ZW50L2NvbnRlbnRtb2R1bGUuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL2NvbnRlbnQvdGFza2ZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvYXBwLy4vc3JjL2NvbnRlbnQvdGFza21vZHVsZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvaGVhZGVyL2hlYWRlcm1vZHVsZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvc2lkZWJhci9wcm9qZWN0ZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvc2lkZWJhci9zaWRlYmFybW9kdWxlLmpzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kb2FwcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9vZGluLXRvZG9hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgcHJvamVjdHNMaWJyYXJ5IH0gZnJvbSBcIi4uL3NpZGViYXIvcHJvamVjdGZhY3RvcnlcIjtcbmltcG9ydCB7IHRhc2tzTGlicmFyeSB9IGZyb20gXCIuL3Rhc2tmYWN0b3J5XCI7XG5pbXBvcnQgdGFza01vZHVsZSBmcm9tIFwiLi90YXNrbW9kdWxlXCI7XG5cbmNvbnN0IGNvbnRlbnRNb2R1bGUgPSAoKCkgPT4ge1xuICBjb25zdCBkaXZDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcblxuICBjb25zdCBnZXRJbml0aWFsID0gKCkgPT4ge1xuICAgIERPTWNyZWF0ZUhlYWRsaW5lKCdJbmJveCcpO1xuICAgIGNvbnN0IGRpdklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgT2JqZWN0LmFzc2lnbihkaXZJbnB1dCwge1xuICAgICAgaWQ6ICdkaXYtbmV3LXRhc2snLFxuICAgICAgY2xhc3NOYW1lOiAndGFzay1jcmVhdGlvbicsXG4gICAgfSk7XG4gICAgZGl2Q29udGVudC5hcHBlbmRDaGlsZChkaXZJbnB1dCk7XG4gICAgY29uc3QgaW5pdGlhbElucHV0cyA9IFtcbiAgICAgIHsgdGFnOiAnaW5wdXQnLCBpZDogJ25ldy10YXNrLXRpdGxlJywgdHlwZTogJ3RleHQnLCB0ZXh0OiAnQWRkIG5ldyB0YXNrJywgYWRkQ2xhc3M6ICcnIH0sXG4gICAgICB7IHRhZzogJ3RleHRhcmVhJywgaWQ6ICduZXctdGFzay1kZXNjcmlwdGlvbicsIHR5cGU6ICcnLCB0ZXh0OiAnRGVzY3JpcHRpb24nLCBhZGRDbGFzczogJyBmb3ItaGlkZSBoaWRkZW4nIH0sXG4gICAgICB7IHRhZzogJ2lucHV0JywgaWQ6ICduZXctdGFzay1kYXRlJywgdHlwZTogJ2RhdGUnLCB0ZXh0OiAnRHVlIGRhdGUnLCBhZGRDbGFzczogJyBmb3ItaGlkZSBoaWRkZW4gZW1wdHknIH0sXG4gICAgICB7IHRhZzogJ2J1dHRvbicsIGlkOiAnbmV3LXRhc2stcHJpb3JpdHknLCB0eXBlOiAnJywgdGV4dDogJ05vcm1hbCBwcmlvcml0eScsIGFkZENsYXNzOiAnIGZvci1oaWRlIGhpZGRlbicgfSxcbiAgICAgIHsgdGFnOiAnc2VsZWN0JywgaWQ6ICduZXctdGFzay1wcm9qZWN0JywgdHlwZTogJycsIHRleHQ6ICdTZWxlY3QgcHJvamVjdCcsIGFkZENsYXNzOiAnIGZvci1oaWRlIGhpZGRlbiBlbXB0eScgfSxcbiAgICAgIHsgdGFnOiAnYnV0dG9uJywgaWQ6ICduZXctdGFzay1idXR0b24nLCB0eXBlOiAnJywgdGV4dDogJ0NyZWF0ZSBuZXcgdGFzaycsIGFkZENsYXNzOiAnIGZvci1oaWRlIGhpZGRlbicgfSxcbiAgICBdO1xuICAgIGluaXRpYWxJbnB1dHMuZm9yRWFjaCgoaXRlbSkgPT4gY3JlYXRlTmV3VGFza0Zvcm0oaXRlbSkpO1xuICAgIERPTWNyZWF0ZVByb2plY3RFbXB0eU9wdGlvbigpO1xuICAgIHByb2plY3RzTGlicmFyeS5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICBET01jcmVhdGVQcm9qZWN0T3B0aW9uKHByb2plY3QpO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBET01oaWRlRnVsbFRhc2tGb3JtKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlTmV3VGFza0Zvcm0gPSAoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGRpdklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpdi1uZXctdGFzaycpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0ZW0udGFnKTtcbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIHtcbiAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgY2xhc3NOYW1lOiAnbmV3LXRhc2snICsgaXRlbS5hZGRDbGFzcyxcbiAgICAgIHBsYWNlaG9sZGVyOiBpdGVtLnRleHQsXG4gICAgfSk7XG4gICAgaWYgKGl0ZW0udGFnID09PSAnaW5wdXQnKSBlbGVtZW50LnR5cGUgPSBpdGVtLnR5cGU7XG4gICAgaWYgKGl0ZW0udGFnID09PSAnYnV0dG9uJykgZWxlbWVudC50ZXh0Q29udGVudCA9IGl0ZW0udGV4dDtcbiAgICBpZiAoaXRlbS5pZCA9PT0gJ25ldy10YXNrLXByaW9yaXR5Jykge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCd0b3AnKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvcCcpXG4gICAgICAgICAgPyBlbGVtZW50LnRleHRDb250ZW50ID0gJ1RvcCBwcmlvcml0eSdcbiAgICAgICAgICA6IGVsZW1lbnQudGV4dENvbnRlbnQgPSAnTm9ybWFsIHByaW9yaXR5JztcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKGl0ZW0uaWQgPT09ICduZXctdGFzay10aXRsZScpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB7XG4gICAgICAgIERPTXNob3dGdWxsVGFza0Zvcm0oKTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgaWYgKGl0ZW0uaWQgPT09ICduZXctdGFzay1idXR0b24nKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGFza01vZHVsZS5jcmVhdGVOZXdUYXNrKCkpO1xuICAgIH07XG4gICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICBsZXQgbW0gPSB0b2RheS5nZXRNb250aCgpICsgMTtcbiAgICAgIGlmIChtbSA8IDEwKSBtbSA9ICcwJyArIG1tO1xuICAgICAgbGV0IGRkID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgICAgaWYgKGRkIDwgMTApIGRkID0gJzAnICsgZGQ7XG4gICAgICBjb25zdCB5eXl5ID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbiAgICAgIGVsZW1lbnQudmFsdWUgPSBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XG4gICAgfTtcbiAgICBkaXZJbnB1dC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBjb25zdCBET01jcmVhdGVQcm9qZWN0RW1wdHlPcHRpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgZW1wdHlPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICBPYmplY3QuYXNzaWduKGVtcHR5T3B0aW9uLCB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICB0ZXh0Q29udGVudDogJ1NlbGVjdCBwcm9qZWN0JyxcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIHNlbGVjdGVkOiB0cnVlLFxuICAgIH0pO1xuICAgIGlmIChwcm9qZWN0c0xpYnJhcnkubGVuZ3RoID4gMCkgZW1wdHlPcHRpb24udGV4dENvbnRlbnQgPSAnTm8gcHJvamVjdCc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLXByb2plY3QnKS5hcHBlbmRDaGlsZChlbXB0eU9wdGlvbik7XG4gICAgcmV0dXJuIGVtcHR5T3B0aW9uO1xuICB9O1xuXG4gIGNvbnN0IERPTWNyZWF0ZVByb2plY3RPcHRpb24gPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1wcm9qZWN0Jyk7XG4gICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgT2JqZWN0LmFzc2lnbihvcHRpb24sIHtcbiAgICAgIHZhbHVlOiBwcm9qZWN0Lm5hbWUsXG4gICAgICB0ZXh0Q29udGVudDogcHJvamVjdC5uYW1lLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgc2VsZWN0ZWQ6IGZhbHNlLFxuICAgIH0pO1xuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgIHJldHVybiBvcHRpb247XG4gIH07XG5cbiAgY29uc3QgRE9NY3JlYXRlSGVhZGxpbmUgPSAoc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgaGVhZGxpbmVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBPYmplY3QuYXNzaWduKGhlYWRsaW5lRGl2LCB7XG4gICAgICBpZDogJ2Rpdi1jb250ZW50LWhlYWRsaW5lJyxcbiAgICB9KVxuICAgIGNvbnN0IGhlYWRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBoZWFkbGluZS50ZXh0Q29udGVudCA9IHN0cmluZyB8fCAnVG9kYXknO1xuICAgIGhlYWRsaW5lRGl2LmFwcGVuZENoaWxkKGhlYWRsaW5lKTtcbiAgICBkaXZDb250ZW50LnByZXBlbmQoaGVhZGxpbmVEaXYpO1xuICAgIHJldHVybiBoZWFkbGluZURpdjtcbiAgfTtcblxuICBjb25zdCBET01zaG93RnVsbFRhc2tGb3JtID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNkaXYtbmV3LXRhc2sgLmhpZGRlbicpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfSlcbiAgfTtcblxuICBjb25zdCBET01oaWRlRnVsbFRhc2tGb3JtID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNkaXYtbmV3LXRhc2sgLmZvci1oaWRlJykuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0SW5pdGlhbCwgaGlkZUZ1bGxUYXNrRm9ybTogRE9NaGlkZUZ1bGxUYXNrRm9ybSwgc2hvd0Z1bGxUYXNrRm9ybTogRE9Nc2hvd0Z1bGxUYXNrRm9ybSwgRE9NY3JlYXRlUHJvamVjdE9wdGlvbiwgRE9NY3JlYXRlUHJvamVjdEVtcHR5T3B0aW9uIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50TW9kdWxlOyIsImNvbnN0IExPQ0FMX1NUT1JBR0VfVEFTS19LRVkgPSAndG9kby50YXNrc0xpYnJhcnknO1xubGV0IHRhc2tzTGlicmFyeSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9UQVNLX0tFWSkpIHx8IFtdO1xuXG5jb25zdCB0YXNrRmFjdG9yeSA9ICh0aXRsZSwgZGVzY3JpcHRpb25Jbml0aWFsLCBkdWVEYXRlLCBmaW5pc2hlZCwgcHJpb3JpdHksIHByb2plY3ROYW1lKSA9PiB7XG4gIGxldCBwcm9qZWN0O1xuICBpZiAocHJvamVjdE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHByb2plY3QgPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHByb2plY3QgPSBwcm9qZWN0TmFtZS5uYW1lO1xuICB9XG4gIGxldCBkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uSW5pdGlhbCB8fCBudWxsO1xuICByZXR1cm4geyB0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIGZpbmlzaGVkLCBwcmlvcml0eSwgcHJvamVjdCB9O1xufVxuXG5leHBvcnQgeyB0YXNrRmFjdG9yeSwgdGFza3NMaWJyYXJ5LCBMT0NBTF9TVE9SQUdFX1RBU0tfS0VZIH07IiwiaW1wb3J0IHRhc2tVbmNvbXBsZXRlSWNvbiBmcm9tICcvc3JjL2ljb25zL3Rhc2tfdW5jb21wbGV0ZS5zdmcnO1xuaW1wb3J0IHRhc2tDb21wbGV0ZUljb24gZnJvbSAnL3NyYy9pY29ucy90YXNrX2NvbXBsZXRlLnN2Zyc7XG5pbXBvcnQgYmluSWNvbiBmcm9tICcvc3JjL2ljb25zL2Jpbi5zdmcnO1xuaW1wb3J0IHsgTE9DQUxfU1RPUkFHRV9UQVNLX0tFWSwgdGFza3NMaWJyYXJ5LCB0YXNrRmFjdG9yeSB9IGZyb20gJy4vdGFza2ZhY3RvcnknO1xuaW1wb3J0IGNvbnRlbnRNb2R1bGUgZnJvbSAnLi9jb250ZW50bW9kdWxlJztcbmltcG9ydCB7IHByb2plY3RzTGlicmFyeSB9IGZyb20gJy4uL3NpZGViYXIvcHJvamVjdGZhY3RvcnknO1xuXG5jb25zdCB0YXNrTW9kdWxlID0gKCgpID0+IHtcbiAgY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgY29uc3QgZ2V0SW5pdGlhbCA9ICgpID0+IHtcbiAgICBET01nZXRPckNyZWF0ZVRhc2tMaXN0RGl2KCkuaW5uZXJIVE1MID0gJyc7XG4gICAgdGFza3NMaWJyYXJ5LmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBET01jcmVhdGVUYXNrRGl2KHRhc2ssIGluZGV4KTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBzaG93RmlsdGVyZWQgPSAobGlicmFyeSkgPT4ge1xuICAgIERPTWdldE9yQ3JlYXRlVGFza0xpc3REaXYoKS5pbm5lckhUTUwgPSAnJztcbiAgICBsaWJyYXJ5LmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBET01jcmVhdGVUYXNrRGl2KHRhc2ssIGluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IERPTWdldE9yQ3JlYXRlVGFza0xpc3REaXYgPSAoKSA9PiB7XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWxpc3QnKTtcbiAgICBpZiAoZGl2ID09PSBudWxsKSB7XG4gICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGl2LCB7XG4gICAgICAgIGlkOiAndGFzay1saXN0JyxcbiAgICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWxpc3QnLFxuICAgICAgfSk7XG4gICAgICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGRpdik7XG4gICAgfTtcbiAgICByZXR1cm4gZGl2O1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZU5ld1Rhc2sgPSAoKSA9PiB7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stdGl0bGUnKS52YWx1ZTtcbiAgICBpZiAodGl0bGUgPT09ICcnKSByZXR1cm4gYWxlcnQoJ1lvdSBoYXZlIHRvIHNwZWNpZnkgdGl0bGUnKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1kZXNjcmlwdGlvbicpLnZhbHVlO1xuICAgIGxldCBpbnB1dERhdGUgPSBuZXcgRGF0ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stZGF0ZScpLnZhbHVlKTtcbiAgICBpZiAoaW5wdXREYXRlID09PSAnJykgcmV0dXJuIGFsZXJ0KCdZb3UgaGF2ZSB0byBzcGVjaWZ5IGR1ZSBkYXRlJyk7XG4gICAgaWYgKGlucHV0RGF0ZSA8IG5ldyBEYXRlKG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpKSByZXR1cm4gYWxlcnQoJ0RhdGUgY2Fubm90IGJlIGluIHRoZSBwYXN0Jyk7XG4gICAgaW5wdXREYXRlID0gbmV3IERhdGUoaW5wdXREYXRlLnRvRGF0ZVN0cmluZygpKTtcbiAgICBsZXQgcHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stcHJpb3JpdHknKS50ZXh0Q29udGVudDtcbiAgICBwcmlvcml0eSA9PT0gJ05vcm1hbCBwcmlvcml0eScgPyBwcmlvcml0eSA9IGZhbHNlIDogcHJpb3JpdHkgPSB0cnVlO1xuICAgIGNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stcHJvamVjdCcpLnZhbHVlO1xuICAgIGNvbnN0IGZpbmRQcm9qZWN0ID0gcHJvamVjdHNMaWJyYXJ5LmZpbHRlcigocHJvamVjdCkgPT4ge1xuICAgICAgcmV0dXJuIHByb2plY3QubmFtZSA9PT0gcHJvamVjdFNlbGVjdDtcbiAgICB9KTtcbiAgICBjb25zdCBuZXdUYXNrID0gdGFza0ZhY3RvcnkodGl0bGUsIGRlc2NyaXB0aW9uLCBpbnB1dERhdGUsIGZhbHNlLCBwcmlvcml0eSwgZmluZFByb2plY3RbMF0pO1xuICAgIHRhc2tzTGlicmFyeS5wdXNoKG5ld1Rhc2spO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfVEFTS19LRVksIEpTT04uc3RyaW5naWZ5KHRhc2tzTGlicmFyeSkpO1xuICAgIHRhc2tNb2R1bGUuZ2V0T3JDcmVhdGVUYXNrTGlzdERpdigpLmlubmVySFRNTCA9ICcnO1xuICAgIHRhc2tzTGlicmFyeS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgdGFza01vZHVsZS5jcmVhdGVUYXNrRGl2KHRhc2ssIGluZGV4KVxuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay10aXRsZScpLnZhbHVlID0gJyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrLWRlc2NyaXB0aW9uJykudmFsdWUgPSAnJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stcHJvamVjdCcpLnZhbHVlID0gJyc7XG4gICAgY29udGVudE1vZHVsZS5oaWRlRnVsbFRhc2tGb3JtKCk7XG4gIH07XG5cblxuICBjb25zdCBET01jcmVhdGVUYXNrRGl2ID0gKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1haW5EaXYuY2xhc3NOYW1lID0gJ3Rhc2sgdGFzay1pdGVtJztcbiAgICBpZiAodGFzay5wcmlvcml0eSA9PT0gdHJ1ZSkgbWFpbkRpdi5jbGFzc0xpc3QuYWRkKCdwcmlvcml0eScpO1xuICAgIGxldCBzdGF0dXNTcmMgPSB0YXNrVW5jb21wbGV0ZUljb247XG4gICAgaWYgKHRhc2suZmluaXNoZWQgPT09IHRydWUpIHtcbiAgICAgIG1haW5EaXYuY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XG4gICAgICBzdGF0dXNTcmMgPSB0YXNrQ29tcGxldGVJY29uO1xuICAgIH07XG5cbiAgICBjb25zdCBzdGF0dXNJY29uID0gbmV3IEltYWdlKCk7XG4gICAgT2JqZWN0LmFzc2lnbihzdGF0dXNJY29uLCB7XG4gICAgICBjbGFzc05hbWU6ICd0YXNrIHRhc2staWNvbiB0YXNrLWNvbXBsZXRlJyxcbiAgICAgIHNyYzogc3RhdHVzU3JjLFxuICAgIH0pO1xuICAgIHN0YXR1c0ljb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2snLCBpbmRleCk7XG4gICAgc3RhdHVzSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGZpbmlzaFRhc2soaW5kZXgpKTtcblxuICAgIGNvbnN0IHN1YkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIE9iamVjdC5hc3NpZ24oc3ViRGl2LCB7XG4gICAgICBjbGFzc05hbWU6ICd0YXNrIHRhc2stY29udGVudCcsXG4gICAgfSk7XG4gICAgY29uc3QgdGl0bGVQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIE9iamVjdC5hc3NpZ24odGl0bGVQLCB7XG4gICAgICB0ZXh0Q29udGVudDogdGFzay50aXRsZSxcbiAgICAgIGNsYXNzTmFtZTogJ3Rhc2sgdGFzay1jb250ZW50LXRpdGxlJyxcbiAgICB9KTtcbiAgICBjb25zdCBkZXNjcmlwdGlvblAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgT2JqZWN0LmFzc2lnbihkZXNjcmlwdGlvblAsIHtcbiAgICAgIHRleHRDb250ZW50OiB0YXNrLmRlc2NyaXB0aW9uLFxuICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWNvbnRlbnQtZGVzY3JpcHRpb24nLFxuICAgIH0pO1xuICAgIHN1YkRpdi5hcHBlbmQodGl0bGVQLCBkZXNjcmlwdGlvblApO1xuICAgIGlmICh0YXNrLnByb2plY3QgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHByb2plY3RQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgT2JqZWN0LmFzc2lnbihwcm9qZWN0UCwge1xuICAgICAgICB0ZXh0Q29udGVudDogdGFzay5wcm9qZWN0LFxuICAgICAgICBjbGFzc05hbWU6ICd0YXNrIHRhc2stY29udGVudC1wcm9qZWN0JyxcbiAgICAgIH0pO1xuICAgICAgc3ViRGl2LmFwcGVuZChwcm9qZWN0UCk7XG4gICAgfTtcbiAgICAvLyBEdWUgdGltZVxuICAgIGNvbnN0IHRpbWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBPYmplY3QuYXNzaWduKHRpbWVEaXYsIHtcbiAgICAgIGNsYXNzTmFtZTogJ3Rhc2sgdGFzay1jb250ZW50LXRpbWUnLFxuICAgIH0pO1xuICAgIGNvbnN0IHRpbWVQID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGNvbnN0IHRhc2tEYXRlID0gbmV3IERhdGUodGFzay5kdWVEYXRlKTtcbiAgICBsZXQgZGF5ID0gdGFza0RhdGUuZ2V0RGF0ZSgpO1xuICAgIGlmIChkYXkgPCAxMCkgZGF5ID0gJzAnICsgZGF5O1xuICAgIGxldCBtb250aCA9IHRhc2tEYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgIGlmIChtb250aCA8IDEwKSBtb250aCA9ICcwJyArIG1vbnRoO1xuICAgIGNvbnN0IHllYXIgPSB0YXNrRGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGxldCB0YXNrRGF0ZVN0cmluZztcbiAgICBpZiAoeWVhciA+IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSkpIHtcbiAgICAgIHRhc2tEYXRlU3RyaW5nID0gYCR7ZGF5fS8ke21vbnRofS8ke3llYXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFza0RhdGVTdHJpbmcgPSBgJHtkYXl9LyR7bW9udGh9YDtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbih0aW1lUCwge1xuICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWNvbnRlbnQtdGltZScsXG4gICAgICB0ZXh0Q29udGVudDogdGFza0RhdGVTdHJpbmcsXG4gICAgfSk7XG4gICAgaWYgKHRhc2tEYXRlIDw9IG5ldyBEYXRlKG5ldyBEYXRlKCkudG9EYXRlU3RyaW5nKCkpKSB7XG4gICAgICB0aW1lUC5jbGFzc0xpc3QuYWRkKCdvdmVyZHVlJyk7XG4gICAgfTtcbiAgICB0aW1lRGl2LmFwcGVuZENoaWxkKHRpbWVQKTtcbiAgICAvLyBEZWxldGUgdGFzayBpY29uXG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IG5ldyBJbWFnZSgpO1xuICAgIE9iamVjdC5hc3NpZ24oZGVsZXRlSWNvbiwge1xuICAgICAgY2xhc3NOYW1lOiAndGFzayB0YXNrLWljb24gdGFzay1kZWxldGUnLFxuICAgICAgc3JjOiBiaW5JY29uLFxuICAgIH0pO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdkYXRhLXRhc2snLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGRlbGV0ZVRhc2soaW5kZXgpKTtcblxuICAgIG1haW5EaXYuYXBwZW5kKHN0YXR1c0ljb24sIHN1YkRpdiwgdGltZURpdiwgZGVsZXRlSWNvbik7XG4gICAgRE9NZ2V0T3JDcmVhdGVUYXNrTGlzdERpdigpLnByZXBlbmQobWFpbkRpdik7XG4gICAgcmV0dXJuIG1haW5EaXY7XG4gIH07XG5cbiAgY29uc3QgZmluaXNoVGFzayA9IChpbmRleCkgPT4ge1xuICAgIGxldCBzdGF0dXMgPSB0YXNrc0xpYnJhcnlbaW5kZXhdLmZpbmlzaGVkO1xuICAgIHN0YXR1cyA9PT0gdHJ1ZSA/IHN0YXR1cyA9IGZhbHNlIDogc3RhdHVzID0gdHJ1ZTtcbiAgICB0YXNrc0xpYnJhcnlbaW5kZXhdLmZpbmlzaGVkID0gc3RhdHVzO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfVEFTS19LRVksIEpTT04uc3RyaW5naWZ5KHRhc2tzTGlicmFyeSkpO1xuICAgIGdldEluaXRpYWwoKTtcbiAgICByZXR1cm4gdGFza3NMaWJyYXJ5W2luZGV4XTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVUYXNrID0gKGluZGV4KSA9PiB7XG4gICAgdGFza3NMaWJyYXJ5LnNwbGljZShpbmRleCwgMSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9UQVNLX0tFWSwgSlNPTi5zdHJpbmdpZnkodGFza3NMaWJyYXJ5KSk7XG4gICAgZ2V0SW5pdGlhbCgpO1xuICB9XG5cbiAgcmV0dXJuIHsgZ2V0T3JDcmVhdGVUYXNrTGlzdERpdjogRE9NZ2V0T3JDcmVhdGVUYXNrTGlzdERpdiwgY3JlYXRlTmV3VGFzaywgY3JlYXRlVGFza0RpdjogRE9NY3JlYXRlVGFza0RpdiwgZ2V0SW5pdGlhbCwgc2hvd0ZpbHRlcmVkIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB0YXNrTW9kdWxlO1xuIiwiaW1wb3J0IG1lbnVJY29uIGZyb20gJy9zcmMvaWNvbnMvdmlldy5zdmcnO1xuaW1wb3J0IGdpdGh1Ykljb24gZnJvbSAnL3NyYy9pY29ucy9naXRodWIuc3ZnJztcbmltcG9ydCB0YXNrTW9kdWxlIGZyb20gJy4uL2NvbnRlbnQvdGFza21vZHVsZSc7XG5pbXBvcnQgeyB0YXNrc0xpYnJhcnkgfSBmcm9tICcuLi9jb250ZW50L3Rhc2tmYWN0b3J5JztcblxuY29uc3QgaGVhZGVyTW9kdWxlID0gKCgpID0+IHtcbiAgY29uc3QgZ2V0SW5pdGlhbCA9ICgpID0+IHtcbiAgICBjb25zdCBsZWZ0RGl2ID0gJyNoZWFkZXI+ZGl2LmxlZnQnO1xuICAgIGNvbnN0IG1pZERpdiA9ICcjaGVhZGVyPmRpdi5taWQnO1xuICAgIGNvbnN0IHJpZ2h0RGl2ID0gJyNoZWFkZXI+ZGl2LnJpZ2h0JztcblxuICAgIGNvbnN0IG1lbnVJbWdMZWZ0ID0ge1xuICAgICAgdGFnOiAnaW1nJywgaWQ6ICdtZW51Jywgc3JjOiBtZW51SWNvbiwgYWRkQ2xhc3M6ICcgbmF2LWljb24nLFxuICAgICAgdHlwZTogJycsIHRleHQ6ICdtZW51JywgZGVzdGluYXRpb246IGxlZnREaXYsXG4gICAgfTtcbiAgICBjb25zdCBzZWFyY2hJbnB1dExlZnQgPSB7XG4gICAgICB0YWc6ICdpbnB1dCcsIGlkOiAnc2VhcmNoJywgc3JjOiAnJywgYWRkQ2xhc3M6ICcgbmF2LXNlYXJjaCcsXG4gICAgICB0eXBlOiAndGV4dCcsIHRleHQ6ICdTZWFyY2gnLCBkZXN0aW5hdGlvbjogbGVmdERpdixcbiAgICB9O1xuICAgIGNvbnN0IGFuY2hvck1pZCA9IHtcbiAgICAgIHRhZzogJ2EnLCBpZDogbnVsbCwgc3JjOiAnIycsIGFkZENsYXNzOiAnJyxcbiAgICAgIHR5cGU6ICcnLCB0ZXh0OiAnJywgZGVzdGluYXRpb246IG1pZERpdixcbiAgICB9O1xuICAgIGNvbnN0IHNwYW5BcHBOYW1lTWlkID0ge1xuICAgICAgdGFnOiAnc3BhbicsIGlkOiBudWxsLCBzcmM6ICcnLCBhZGRDbGFzczogJycsXG4gICAgICB0eXBlOiAnJywgdGV4dDogJ1RPRE8gQVBQJywgZGVzdGluYXRpb246IG1pZERpdixcbiAgICB9O1xuICAgIGNvbnN0IGFuY2hvclJpZ2h0ID0ge1xuICAgICAgdGFnOiAnYScsIGlkOiBudWxsLCBzcmM6ICdodHRwczovL2dpdGh1Yi5jb20vbmVsZmltb3YvJywgYWRkQ2xhc3M6ICcnLFxuICAgICAgdHlwZTogJycsIHRleHQ6ICcnLCBkZXN0aW5hdGlvbjogcmlnaHREaXYsXG4gICAgfTtcbiAgICBjb25zdCBnaXRodWJJbWdSaWdodCA9IHtcbiAgICAgIHRhZzogJ2ltZycsIGlkOiBudWxsLCBzcmM6IGdpdGh1Ykljb24sIGFkZENsYXNzOiAnIG5hdi1pY29uJyxcbiAgICAgIHR5cGU6ICcnLCB0ZXh0OiAnZ2l0aHViJywgZGVzdGluYXRpb246IHJpZ2h0RGl2LFxuICAgIH07XG4gICAgY29uc3Qgc3BhbkdpdGh1YiA9IHtcbiAgICAgIHRhZzogJ3NwYW4nLCBpZDogbnVsbCwgc3JjOiAnJywgYWRkQ2xhc3M6ICcnLFxuICAgICAgdHlwZTogJycsIHRleHQ6ICdHaXRodWInLCBkZXN0aW5hdGlvbjogcmlnaHREaXYsXG4gICAgfTtcbiAgICBjb25zdCBpbml0aWFsSGVhZGVyID0gW1xuICAgICAgbWVudUltZ0xlZnQsIHNlYXJjaElucHV0TGVmdCwgYW5jaG9yTWlkLCBzcGFuQXBwTmFtZU1pZCwgYW5jaG9yUmlnaHQsXG4gICAgICBnaXRodWJJbWdSaWdodCwgc3BhbkdpdGh1YixcbiAgICBdO1xuICAgIGluaXRpYWxIZWFkZXIuZm9yRWFjaCgoaXRlbSkgPT4gY3JlYXRlSGVhZGVySXRlbShpdGVtKSk7XG4gIH1cblxuICBjb25zdCBjcmVhdGVIZWFkZXJJdGVtID0gKGl0ZW0pID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdGVtLnRhZyk7XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnbmF2JyArIGl0ZW0uYWRkQ2xhc3M7XG4gICAgaWYgKGl0ZW0uaWQpIGVsZW1lbnQuaWQgPSBpdGVtLmlkO1xuICAgIGlmIChpdGVtLmlkID09PSAnbWVudScpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICAgIH0pXG4gICAgfTtcbiAgICBpZiAoaXRlbS5pZCA9PT0gJ3NlYXJjaCcpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICBzZWFyY2hUYXNrKCk7XG4gICAgICB9KVxuICAgIH07XG4gICAgaWYgKGl0ZW0udGFnID09PSAnaW1nJykge1xuICAgICAgZWxlbWVudC5zcmMgPSBpdGVtLnNyYztcbiAgICAgIGVsZW1lbnQuYWx0ID0gaXRlbS50ZXh0O1xuICAgIH07XG4gICAgaWYgKGl0ZW0udGFnID09PSAnaW5wdXQnKSB7XG4gICAgICBlbGVtZW50LnBsYWNlaG9sZGVyID0gaXRlbS50ZXh0O1xuICAgICAgZWxlbWVudC50eXBlID0gaXRlbS50eXBlO1xuICAgICAgZWxlbWVudC5uYW1lID0gaXRlbS5pZDtcbiAgICB9O1xuICAgIGlmIChpdGVtLnRhZyA9PT0gJ2EnKSB7XG4gICAgICBlbGVtZW50LmhyZWYgPSBpdGVtLnNyYztcbiAgICB9O1xuICAgIGlmIChpdGVtLnRhZyA9PT0gJ3NwYW4nKSB7XG4gICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gaXRlbS50ZXh0O1xuICAgIH07XG4gICAgY29uc3QgZGVzdGlueSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbS5kZXN0aW5hdGlvbik7XG4gICAgaWYgKGRlc3RpbnkucXVlcnlTZWxlY3RvcignYS5uYXYnKSkge1xuICAgICAgZGVzdGlueS5xdWVyeVNlbGVjdG9yKCdhLm5hdicpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0uZGVzdGluYXRpb24pLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlTWVudSA9ICgpID0+IHtcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICB9XG5cbiAgY29uc3Qgc2VhcmNoVGFzayA9ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2gnKS52YWx1ZTtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAodmFsdWUsICdnaScpO1xuICAgIGNvbnN0IGZpbHRlclRpdGxlID0gdGFza3NMaWJyYXJ5LmZpbHRlcigodGFzaykgPT4ge1xuICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QodGFzay50aXRsZSk7XG4gICAgfSk7XG4gICAgY29uc3QgZmlsdGVyRGVzY3JpcHRpb24gPSB0YXNrc0xpYnJhcnkuZmlsdGVyKCh0YXNrKSA9PiB7XG4gICAgICByZXR1cm4gcmVnZXgudGVzdCh0YXNrLmRlc2NyaXB0aW9uKTtcbiAgICB9KTtcbiAgICBpZiAodmFsdWUgIT09ICcnKSB7XG4gICAgICBjb25zdCBmaWx0ZXJlZExpYnJhcnkgPSBmaWx0ZXJUaXRsZS5jb25jYXQoZmlsdGVyRGVzY3JpcHRpb24pO1xuICAgICAgdGFza01vZHVsZS5zaG93RmlsdGVyZWQoZmlsdGVyZWRMaWJyYXJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFza01vZHVsZS5nZXRJbml0aWFsKCk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4geyBnZXRJbml0aWFsIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBoZWFkZXJNb2R1bGU7IiwiY29uc3QgTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSA9ICd0b2RvLnByb2plY3RzTGlicmFyeSc7XG5jb25zdCBwcm9qZWN0c0xpYnJhcnkgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfUFJPSkVDVF9LRVkpKSB8fCBbXTtcblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAobmFtZSkgPT4ge1xuICBjb25zdCBpc1Byb2plY3QgPSB0cnVlO1xuICByZXR1cm4geyBuYW1lLCBpc1Byb2plY3QgfTtcbn1cblxuZXhwb3J0IHsgcHJvamVjdHNMaWJyYXJ5LCBwcm9qZWN0RmFjdG9yeSwgTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSB9OyIsImltcG9ydCBleHBhbmRJY29uIGZyb20gJy9zcmMvaWNvbnMvZXhwYW5kX21vcmUuc3ZnJztcbmltcG9ydCBwbHVzSWNvbiBmcm9tICcvc3JjL2ljb25zL3BsdXMuc3ZnJztcbmltcG9ydCBtaW51c0ljb24gZnJvbSAnL3NyYy9pY29ucy9taW51cy5zdmcnO1xuaW1wb3J0IGluY29tZUljb24gZnJvbSAnL3NyYy9pY29ucy9pbmJveC5zdmcnO1xuaW1wb3J0IHRvZGF5SWNvbiBmcm9tICcvc3JjL2ljb25zL2NhbGVuZGFyX3RvZGF5LnN2Zyc7XG5pbXBvcnQgYWhlYWRJY29uIGZyb20gJy9zcmMvaWNvbnMvY2FsZW5kYXJfbW9udGguc3ZnJztcbmltcG9ydCBwcm9qZWN0SWNvbiBmcm9tICcvc3JjL2ljb25zL3Byb2plY3Quc3ZnJztcbmltcG9ydCB7IHByb2plY3RzTGlicmFyeSwgTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSwgcHJvamVjdEZhY3RvcnkgfSBmcm9tICcuL3Byb2plY3RmYWN0b3J5JztcbmltcG9ydCB7IHRhc2tzTGlicmFyeSB9IGZyb20gJy4uL2NvbnRlbnQvdGFza2ZhY3RvcnknO1xuaW1wb3J0IHRhc2tNb2R1bGUgZnJvbSAnLi4vY29udGVudC90YXNrbW9kdWxlJztcbmltcG9ydCBjb250ZW50TW9kdWxlIGZyb20gJy4uL2NvbnRlbnQvY29udGVudG1vZHVsZSc7XG5cbmNvbnN0IHNpZGViYXJNb2R1bGUgPSAoKCkgPT4ge1xuICBjb25zdCBzaWRlYmFyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXInKTtcblxuICBjb25zdCBnZXRJbml0aWFsID0gKCkgPT4ge1xuICAgIERPTWNyZWF0ZUhlYWRlcnMoKTtcbiAgICBjb25zdCBtYWluSW5pdGlhbFJvd3MgPSBbXG4gICAgICBbJ0FsbCcsIGluY29tZUljb24sIGZhbHNlLCAnYWN0aXZlJ10sXG4gICAgICBbJ1RvZGF5JywgdG9kYXlJY29uLCBmYWxzZSwgJyddLFxuICAgICAgWydBaGVhZCcsIGFoZWFkSWNvbiwgZmFsc2UsICcnXSxcbiAgICBdO1xuICAgIG1haW5Jbml0aWFsUm93cy5mb3JFYWNoKChpdGVtKSA9PiBET01jcmVhdGVJdGVtKC4uLml0ZW0pKTtcbiAgICBwcm9qZWN0c0xpYnJhcnkuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IERPTWNyZWF0ZUl0ZW0ocHJvamVjdC5uYW1lLCBwcm9qZWN0SWNvbiwgcHJvamVjdC5pc1Byb2plY3QsICcnLCBpbmRleCkpO1xuICB9O1xuXG4gIGNvbnN0IERPTWNyZWF0ZUl0ZW0gPSAodGV4dCwgaWNvbiwgaXNQcm9qZWN0LCBhZGRDbGFzcywgcHJvamVjdEluZGV4KSA9PiB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIE9iamVjdC5hc3NpZ24obGksIHtcbiAgICAgIGNsYXNzTmFtZTogJ3NpZGViYXIgc2lkZWJhci1pdGVtICcgKyBhZGRDbGFzcyxcbiAgICB9KTtcbiAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzaWRlYmFyIGxpJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXYtY29udGVudC1oZWFkbGluZT5oMicpXG4gICAgICAgIC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgfSk7XG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBPYmplY3QuYXNzaWduKHNwYW4sIHtcbiAgICAgIHRleHRDb250ZW50OiB0ZXh0LFxuICAgICAgY2xhc3NOYW1lOiAnc2lkZWJhciBzaWRlYmFyLXNwYW4nLFxuICAgIH0pO1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgT2JqZWN0LmFzc2lnbihpbWFnZSwge1xuICAgICAgY2xhc3NOYW1lOiAnc2lkZWJhciBzaWRlYmFyLWljb24nLFxuICAgICAgc3JjOiBpY29uLFxuICAgIH0pO1xuXG4gICAgaWYgKHRleHQgPT09ICdBbGwnKSB7XG4gICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdGFza01vZHVsZS5nZXRJbml0aWFsKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmICh0ZXh0ID09PSAnVG9kYXknKSB7XG4gICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRMaWJyYXJ5ID0gdGFza3NMaWJyYXJ5LmZpbHRlcigodGFzaykgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpLnRvRGF0ZVN0cmluZygpID09PSBuZXcgRGF0ZShuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhc2tNb2R1bGUuc2hvd0ZpbHRlcmVkKGZpbHRlcmVkTGlicmFyeSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZExpYnJhcnk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGlmICh0ZXh0ID09PSAnQWhlYWQnKSB7XG4gICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRMaWJyYXJ5ID0gdGFza3NMaWJyYXJ5LmZpbHRlcigodGFzaykgPT4ge1xuICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0YXNrLmR1ZURhdGUpLnRvRGF0ZVN0cmluZygpICE9PSBuZXcgRGF0ZShuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKS50b0RhdGVTdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhc2tNb2R1bGUuc2hvd0ZpbHRlcmVkKGZpbHRlcmVkTGlicmFyeSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZExpYnJhcnk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgbGkuYXBwZW5kKGltYWdlLCBzcGFuKTtcblxuICAgIGxldCB1bDtcbiAgICBpZiAoaXNQcm9qZWN0KSB7XG4gICAgICB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLXByb2plY3Q+dWwnKTtcbiAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZExpYnJhcnkgPSB0YXNrc0xpYnJhcnkuZmlsdGVyKCh0YXNrKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRhc2sucHJvamVjdCA9PT0gbGkudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0YXNrTW9kdWxlLnNob3dGaWx0ZXJlZChmaWx0ZXJlZExpYnJhcnkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpLmlkID0gYCR7dGV4dC50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLW1haW4+dWwnKTtcbiAgICB9O1xuICAgIGlmIChpc1Byb2plY3QpIHtcbiAgICAgIGNvbnN0IGRlbGV0ZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKGRlbGV0ZUltYWdlLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3NpZGViYXIgc2lkZWJhci1pY29uIHNpZGViYXItZGVsZXRlLXByb2plY3QnLFxuICAgICAgICBzcmM6IG1pbnVzSWNvbixcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlSW1hZ2Uuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3QnLCBwcm9qZWN0SW5kZXgpO1xuICAgICAgZGVsZXRlSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkZWxldGVQcm9qZWN0KHByb2plY3RJbmRleCkpO1xuICAgICAgbGkuYXBwZW5kKGRlbGV0ZUltYWdlKTtcbiAgICB9O1xuICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgfTtcblxuICBjb25zdCBET01jcmVhdGVIZWFkZXJzID0gKCkgPT4ge1xuICAgIGxldCBzaWRlYmFyRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXItbWFpbicpO1xuICAgIGlmIChzaWRlYmFyRGl2ID09PSBudWxsKSBET01jcmVhdGVEaXYoZmFsc2UpO1xuICAgIGxldCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZGViYXItcHJvamVjdCcpO1xuICAgIGlmIChwcm9qZWN0RGl2ID09PSBudWxsKSBET01jcmVhdGVEaXYodHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgRE9NY3JlYXRlRGl2ID0gKGlzUHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgaWYgKGlzUHJvamVjdCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihkaXYsIHtcbiAgICAgICAgaWQ6ICdzaWRlYmFyLXByb2plY3QnLFxuICAgICAgfSlcbiAgICAgIGNvbnN0IGhlYWRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgIGhlYWRsaW5lLnRleHRDb250ZW50ID0gJ1Byb2plY3RzJztcbiAgICAgIGNvbnN0IGRpdkhlYWRsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXZIZWFkbGluZS5jbGFzc05hbWUgPSAnc2lkZWJhciBzaWRlYmFyLWhlYWRsaW5lJztcbiAgICAgIGNvbnN0IGltYWdlRXhwYW5kID0gbmV3IEltYWdlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKGltYWdlRXhwYW5kLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3NpZGViYXIgc2lkZWJhci1pY29uIHNpZGViYXItZXhwYW5kLWljb24nLFxuICAgICAgICBzcmM6IGV4cGFuZEljb24sXG4gICAgICB9KVxuICAgICAgY29uc3QgaW1hZ2VQbHVzID0gbmV3IEltYWdlKCk7XG4gICAgICBPYmplY3QuYXNzaWduKGltYWdlUGx1cywge1xuICAgICAgICBjbGFzc05hbWU6ICdzaWRlYmFyIHNpZGViYXItaWNvbiBzaWRlYmFyLXBsdXNwcm9qZWN0LWljb24nLFxuICAgICAgICBzcmM6IHBsdXNJY29uLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBuZXdQcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgT2JqZWN0LmFzc2lnbihuZXdQcm9qZWN0SW5wdXQsIHtcbiAgICAgICAgaWQ6ICduZXctcHJvamVjdC1pbnB1dCcsXG4gICAgICAgIGNsYXNzTmFtZTogJ25hdi1zZWFyY2ggaGlkZGVuJyxcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBwbGFjZWhvbGRlcjogJ1Byb2plY3QgbmFtZScsXG4gICAgICB9KTtcbiAgICAgIG5ld1Byb2plY3RJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgIGNyZWF0ZVByb2plY3QobmV3UHJvamVjdElucHV0LnZhbHVlKTtcbiAgICAgICAgICBuZXdQcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgICBuZXdQcm9qZWN0SW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG5ld1Byb2plY3RJbnB1dC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgIH0pO1xuICAgICAgZGl2SGVhZGxpbmUuYXBwZW5kKGltYWdlRXhwYW5kLCBoZWFkbGluZSwgaW1hZ2VQbHVzLCBuZXdQcm9qZWN0SW5wdXQpO1xuICAgICAgbGV0IHJvdGF0aW9uID0gMDtcbiAgICAgIGltYWdlRXhwYW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgIHJvdGF0aW9uICs9IDE4MDtcbiAgICAgICAgICBpZiAocm90YXRpb24gPT09IDM2MCkgcm90YXRpb24gPSAwO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyLWV4cGFuZC1pY29uJylcbiAgICAgICAgICAgIC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7cm90YXRpb259ZGVnKWA7XG4gICAgICAgIH0pKCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLXByb2plY3Q+dWwnKVxuICAgICAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRkZW4nKTtcbiAgICAgIH0pO1xuICAgICAgaW1hZ2VQbHVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBuZXdQcm9qZWN0SW5wdXQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICB9KTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChkaXZIZWFkbGluZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oZGl2LCB7XG4gICAgICAgIGlkOiAnc2lkZWJhci1tYWluJyxcbiAgICAgIH0pXG4gICAgfVxuICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpKTtcbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKGRpdik7XG4gICAgcmV0dXJuIGRpdjtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHZhbHVlKSA9PiB7XG4gICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0RmFjdG9yeSh2YWx1ZSk7XG4gICAgcHJvamVjdHNMaWJyYXJ5LnB1c2gobmV3UHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9QUk9KRUNUX0tFWSwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNMaWJyYXJ5KSk7XG4gICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2lkZWJhci1wcm9qZWN0PnVsJyk7XG4gICAgaWYgKHVsICE9PSBudWxsKSB1bC5pbm5lckhUTUwgPSAnJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stcHJvamVjdCcpLmlubmVySFRNTCA9ICcnO1xuICAgIGNvbnRlbnRNb2R1bGUuRE9NY3JlYXRlUHJvamVjdEVtcHR5T3B0aW9uKCk7XG4gICAgcHJvamVjdHNMaWJyYXJ5LmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICBET01jcmVhdGVJdGVtKHByb2plY3QubmFtZSwgcHJvamVjdEljb24sIHByb2plY3QuaXNQcm9qZWN0LCAnJywgaW5kZXgpO1xuICAgICAgY29udGVudE1vZHVsZS5ET01jcmVhdGVQcm9qZWN0T3B0aW9uKHByb2plY3QpO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXdQcm9qZWN0O1xuICB9O1xuXG4gIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAoaW5kZXgpID0+IHtcbiAgICBwcm9qZWN0c0xpYnJhcnkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1BST0pFQ1RfS0VZLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0xpYnJhcnkpKTtcbiAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWRlYmFyLXByb2plY3Q+dWwnKTtcbiAgICBpZiAodWwgIT09IG51bGwpIHVsLmlubmVySFRNTCA9ICcnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1wcm9qZWN0JykuaW5uZXJIVE1MID0gJyc7XG4gICAgY29udGVudE1vZHVsZS5ET01jcmVhdGVQcm9qZWN0RW1wdHlPcHRpb24oKTtcbiAgICBwcm9qZWN0c0xpYnJhcnkuZm9yRWFjaCgocHJvamVjdCwgcHJvamVjdEluZGV4KSA9PiB7XG4gICAgICBET01jcmVhdGVJdGVtKHByb2plY3QubmFtZSwgcHJvamVjdEljb24sIHByb2plY3QuaXNQcm9qZWN0LCAnJywgcHJvamVjdEluZGV4KTtcbiAgICAgIGNvbnRlbnRNb2R1bGUuRE9NY3JlYXRlUHJvamVjdE9wdGlvbjtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBnZXRJbml0aWFsLCBjcmVhdGVJdGVtOiBET01jcmVhdGVJdGVtIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlYmFyTW9kdWxlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGhlYWRlck1vZHVsZSBmcm9tICcuL2hlYWRlci9oZWFkZXJtb2R1bGUnO1xuaW1wb3J0IHNpZGViYXJNb2R1bGUgZnJvbSAnLi9zaWRlYmFyL3NpZGViYXJtb2R1bGUnO1xuaW1wb3J0IGNvbnRlbnRNb2R1bGUgZnJvbSAnLi9jb250ZW50L2NvbnRlbnRtb2R1bGUnO1xuaW1wb3J0IHRhc2tNb2R1bGUgZnJvbSAnLi9jb250ZW50L3Rhc2ttb2R1bGUnO1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBoZWFkZXJNb2R1bGUuZ2V0SW5pdGlhbCgpO1xuICBzaWRlYmFyTW9kdWxlLmdldEluaXRpYWwoKTtcbiAgY29udGVudE1vZHVsZS5nZXRJbml0aWFsKCk7XG4gIHRhc2tNb2R1bGUuZ2V0SW5pdGlhbCgpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==