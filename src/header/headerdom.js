import menuIcon from '/src/icons/view.svg'
import githubIcon from '/src/icons/github.svg'

export default function getHeader() {
  getLeft();
  getMid();
  getRight();
}

function getLeft() {
  const left = document.querySelector('#header>div.left');
  // Adding image
  const Img = new Image();
  Object.assign(Img, {
    src: menuIcon,
    alt: 'menu',
    className: 'nav-icon',
    id: 'menu',
  })
  // Adding inputs
  const inputSearch = document.createElement('input');
  Object.assign(inputSearch, {
    type: 'text',
    name: 'search',
    id: 'search',
    className: 'nav-search',
    placeholder: 'Search',
  })
  // Adding to parent
  left.append(Img, inputSearch);
}

function getMid() {
  const midDiv = document.querySelector('#header>div.mid');
  // Anchor
  const anchor = document.createElement('a');
  Object.assign(anchor, {
    href: '#',
    className: 'nav',
  });
  // Span
  const name = document.createElement('span');
  Object.assign(name, {
    textContent: 'TODO APP BY NELFIMOV',
    className: 'nav',
  });
  // Append to parent
  anchor.appendChild(name);
  midDiv.appendChild(anchor);
}

function getRight() {
  const rightDiv = document.querySelector('#header>div.right');
  // Anchor
  const anchor = document.createElement('a');
  Object.assign(anchor, {
    href: 'https://github.com/nelfimov/',
    className: 'nav',
  });
  // Image
  const Img = new Image();
  Object.assign(Img, {
    src: githubIcon,
    alt: 'github',
    className: 'nav-icon',
  });
  // Span
  const spanGithub = document.createElement('span');
  spanGithub.textContent = 'Github';
  // Append to parent
  anchor.append(Img, spanGithub);
  rightDiv.appendChild(anchor);
}