import menuIcon from './icons/view.svg'
import githubIcon from './icons/github.svg'

export default function getHeader() {
  getLeft();
  getMid();
  getRight();
}

function getLeft() {
  const left = document.querySelector('#header>div.left');
  // Adding image
  const Img = new Image();
  Img.src = menuIcon;
  Img.alt = 'menu';
  Img.classList.add('nav-icon');
  // Adding inputs
  const inputSearch = document.createElement('input');
  inputSearch.type = 'text';
  inputSearch.name = 'search';
  inputSearch.id = 'search';
  inputSearch.classList.add('nav-search');
  inputSearch.placeholder = 'Search';
  // Adding to parent
  left.appendChild(Img);
  left.appendChild(inputSearch);
}

function getMid() {
  const midDiv = document.querySelector('#header>div.mid');
  // Anchor
  const anchor = document.createElement('a');
  anchor.href = '#';
  anchor.classList.add('nav');
  // Span
  const name = document.createElement('span');
  name.textContent = 'TODO APP BY NELFIMOV';
  name.classList.add('nav');
  // Append to parent
  anchor.appendChild(name);
  midDiv.appendChild(anchor);
}

function getRight() {
  const rightDiv = document.querySelector('#header>div.right');
  // Anchor
  const anchor = document.createElement('a');
  anchor.href = 'https://github.com/nelfimov/';
  anchor.classList.add('nav');
  // Image
  const Img = new Image();
  Img.src = githubIcon;
  Img.alt = 'github';
  Img.classList.add('nav-icon');
  // Span
  const spanGithub = document.createElement('span');
  spanGithub.textContent = 'Github';
  // Append to parent
  anchor.appendChild(Img);
  anchor.appendChild(spanGithub);
  rightDiv.appendChild(anchor);
}