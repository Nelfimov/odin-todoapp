import incomeIcon from '/src/icons/inbox.svg';
import todayIcon from '/src/icons/calendar_today.svg';
import aheadIcon from '/src/icons/calendar_month.svg';
import projectIcon from '/src/icons/project.svg';
import sidebarModule from './sidebarmodule';

export default function getSidebar() {
  getInitialSidebar();
}

function getInitialSidebar() {
  const mainInitialRows = [
    ['Inbox', incomeIcon, false],
    ['Today', todayIcon, false],
    ['Ahead', aheadIcon, false],
    ['Default', projectIcon, true],
  ]
  mainInitialRows.forEach((item) => sidebarModule.createItem(...item));
}
