// Define UI Vars
const form = document.querySelector('#name-form');
const nameList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-names');
const filter = document.querySelector('#filter');
const nameInput = document.querySelector('#names');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getNames);
  // Add task event
  form.addEventListener('submit', addName);
  // Remove task event
  taskList.addEventListener('click', removeName);
  // Clear task event
  clearBtn.addEventListener('click', clearNames);
  // Filter tasks event
  filter.addEventListener('keyup', filterNames);
}

// Get Tasks from LS
function getNames() {
  let names;
  if(localStorage.getItem('names') === null){
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }

  names.forEach(function(name){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(name));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addName(e) {
  if(nameInput.value === '') {
    alert('Add a Person');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(nameInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  nameList.appendChild(li);

  // Store in LS
  storeNamesInLocalStorage(nameInput.value);

  // Clear input
  nameInput.value = '';

  e.preventDefault();
}

// Store Task
function storeNameInLocalStorage(name) {
  let names;
  if(localStorage.getItem('names') === null){
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }

  names.push(name);

  localStorage.setItem('names', JSON.stringify(names));
}

// Remove Task
function removeName(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you are going to take them off the list?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeNameFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeNameFromLocalStorage(nameItem) {
  let names;
  if(localStorage.getItem('names') === null){
    names = [];
  } else {
    names = JSON.parse(localStorage.getItem('names'));
  }

  names.forEach(function(name, index){
    if(nameItem.textContent === name){
      names.splice(index, 1);
    }
  });

  localStorage.setItem('names', JSON.stringify(names));
}

// Clear Tasks
function clearNames() {
  // taskList.innerHTML = '';

  // Faster
  while(nameList.firstChild) {
    nameList.removeChild(nameList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearNamesFromLocalStorage();
}

// Clear Tasks from LS
function clearNamesFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterNames(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(name){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      name.style.display = 'block';
    } else {
      name.style.display = 'none';
    }
  });
}