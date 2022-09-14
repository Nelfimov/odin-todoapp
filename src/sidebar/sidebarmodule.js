import expandIcon from '/src/icons/expand_more.svg';
import plusIcon from '/src/icons/plus.svg';
import minusIcon from '/src/icons/minus.svg';
import incomeIcon from '/src/icons/inbox.svg';
import todayIcon from '/src/icons/calendar_today.svg';
import aheadIcon from '/src/icons/calendar_month.svg';
import projectIcon from '/src/icons/project.svg';
import { projectsLibrary, LOCAL_STORAGE_PROJECT_KEY, projectFactory } from './projectfactory';
import { tasksLibrary } from '../content/taskfactory';
import taskModule from '../content/taskmodule';

const sidebarModule = (() => {
  const sidebarDiv = document.getElementById('sidebar');

  const getInitial = () => {
    createHeaders();
    const mainInitialRows = [
      ['All', incomeIcon, false, 'active'],
      ['Today', todayIcon, false, ''],
      ['Ahead', aheadIcon, false, ''],
    ];
    mainInitialRows.forEach((item) => createItem(...item));
    projectsLibrary.forEach((project, index) => createItem(project.name, projectIcon, project.isProject, '', index));
  };

  const createItem = (text, icon, isProject, addClass, projectIndex) => {
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
    let destinationUl;

    if (text === 'All') {
      li.addEventListener('click', () => {
        taskModule.getInitial();
      });
    };
    if (text === 'Today') {
      li.addEventListener('click', () => {
        const filteredLibrary = tasksLibrary.filter((task) => {
          return task.dueDate.toDateString() === new Date().toDateString();
        });
        taskModule.showFiltered(filteredLibrary);
        return filteredLibrary;
      });
    };
    if (text === 'Ahead') {
      li.addEventListener('click', () => {
        const filteredLibrary = tasksLibrary.filter((task) => {
          return task.dueDate.toDateString() !== new Date().toDateString();
        });
        taskModule.showFiltered(filteredLibrary);
        return filteredLibrary;
      });
    }

    if (isProject) {
      destinationUl = document.querySelector('#sidebar-project>ul');
      li.addEventListener('click', () => {
        const filteredLibrary = tasksLibrary.filter((task) => {
          return task.project === li.textContent;
        });
        taskModule.showFiltered(filteredLibrary);
      });
    } else {
      li.id = `${text.toLowerCase()}`;
      destinationUl = document.querySelector('#sidebar-main>ul');
    };
    li.append(image, span);
    if (isProject) {
      const deleteImage = new Image();
      Object.assign(deleteImage, {
        className: 'sidebar sidebar-icon sidebar-delete-project',
        src: minusIcon,
      });
      deleteImage.setAttribute('data-project', projectIndex);
      deleteImage.addEventListener('click', () => deleteProject(projectIndex));
      li.append(deleteImage);
    };
    if (destinationUl == undefined) destinationUl = createList(isProject);
    destinationUl.appendChild(li);
  };

  const createHeaders = () => {
    let sidebarDiv = document.getElementById('sidebar-main');
    if (sidebarDiv === null) createDiv(false);
    let projectDiv = document.getElementById('sidebar-project');
    if (projectDiv === null) createDiv(true);
  };

  const createDiv = (isProject) => {
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
        src: expandIcon,
      })
      const imagePlus = new Image();
      Object.assign(imagePlus, {
        className: 'sidebar sidebar-icon sidebar-plusproject-icon',
        src: plusIcon,
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
          createNewProject(newProjectInput.value);
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
    sidebarDiv.appendChild(div);
    return div;
  };

  const createList = (isProject) => {
    let divTarget;
    if (isProject) {
      divTarget = document.getElementById('sidebar-project');
    } else {
      divTarget = document.getElementById('sidebar-main');
    }
    const list = document.createElement('ul');
    divTarget.appendChild(list);
    return list;
  };

  const createNewProject = (value) => {
    let newProject = projectFactory(value);
    projectsLibrary.push(newProject);
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projectsLibrary));
    const ul = document.querySelector('#sidebar-project>ul');
    if (ul !== null) ul.innerHTML = '';
    projectsLibrary.forEach((project, index) => createItem(project.name, projectIcon, project.isProject, '', index));
    return newProject;
  };

  const deleteProject = (index) => {
    projectsLibrary.splice(index, 1);
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projectsLibrary));
    document.querySelector('#sidebar-project>ul').innerHTML = '';
    projectsLibrary.forEach((project, projectIndex) => createItem(project.name, projectIcon, project.isProject, '', projectIndex));
  };

  return { getInitial, createItem };
})();

export default sidebarModule;