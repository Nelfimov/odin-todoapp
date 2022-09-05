import expandIcon from '/src/icons/expand_more.svg';
import plusIcon from '/src/icons/plus.svg';

const sidebarModule = (() => {
  const sidebarDiv = document.getElementById('sidebar');

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
      divHeadline.append(imageExpand, headline, imagePlus);
      let rotation = 0;
      divHeadline.addEventListener('click', () => {
        (() => {
          rotation += 180;
          if (rotation === 360) rotation = 0;
          document.querySelector('.sidebar-expand-icon').style.transform = `rotate(${rotation}deg)`;
        })();
        document.querySelector('#sidebar-project>ul').classList.toggle('hidden');
      });
      div.appendChild(divHeadline);
    } else {
      Object.assign(div, {
        id: 'sidebar-main',
      })
    }
    sidebarDiv.appendChild(div);
    return div;
  }

  const createList = (isProject) => {
    let divTarget;
    if (isProject) {
      divTarget = document.getElementById('sidebar-project');
    } else {
      divTarget = document.getElementById('sidebar-main');
    }
    if (divTarget == null) divTarget = createDiv(isProject);
    const list = document.createElement('ul');
    divTarget.appendChild(list);
    return list;
  }

  const createItem = (text, icon, isProject) => {
    const li = document.createElement('li');
    Object.assign(li, {
      className: 'sidebar sidebar-item',
    });
    text === 'Inbox' ? li.classList.add('active') : null;
    li.addEventListener('click', () => {
      document.querySelectorAll('#sidebar li').forEach((item) => {
        item.classList.remove('active');
      });
      li.classList.add('active');
    })
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

    if (isProject) {
      destinationUl = document.querySelector('#sidebar-project>ul');
    } else {
      li.id = `${text.toLowerCase()}`;
      destinationUl = document.querySelector('#sidebar-main>ul');
    }
    li.append(image, span);
    if (destinationUl == undefined) destinationUl = createList(isProject);
    destinationUl.appendChild(li);
  }

  return { createItem };
})();

export default sidebarModule;