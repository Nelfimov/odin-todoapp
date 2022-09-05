import contentModule from "./contentmodule";

export default function getContent() {
  contentModule.createNewTaskForm();
}

export function showForm() {
  contentModule.showFullTaskForm();
}

export function hideForm() {
  contentModule.hideFullTaskForm();
}