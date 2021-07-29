// global Variables:
let filterField = null;
let actualFilter = null;
let toDoList = [];
let todos = [];
let initTask = [];
const filterEvent = document.querySelector('#radioOptions');
const eventList = document.querySelector('#eventList');
// class Todo -> construktor
class Todo {
  constructor(desc) {
    this.description = desc;
    this.done = false;
  }
}
// Eventlistener for addbutton opr input field (keyboard #13)
let addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addListEntry);
let addInput = document.querySelector('#taskInput');
addInput.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    addListEntry(e);
  }
});

// create new Line and a new object (attributes: id, description, status)
// connect the new element with former list.
// getting the right label color

/*function labelColor() {
  const labelColor = document.querySelectorAll(".label-color");
  for (let i = 0; i < 3; i++) {
    if (labelColor[i].checked) {
      color = labelColor[i].classList[1];
      return color;
    }
  }
}*/

function createRedColorButton() {
  const changeColorButton1 = document.createElement("button");
  changeColorButton1.classList = "color-button1";
  return changeColorButton1;
}

function createOrangeColorButton() {
  const changeColorButton1 = document.createElement("button");
  changeColorButton1.classList = "color-button2";
  return changeColorButton1;
}

function createGreenColorButton() {
  const changeColorButton1 = document.createElement("button");
  changeColorButton1.classList = "color-button3";
  return changeColorButton1;
}

function addListEntry(e) {
  let input = document.querySelector('#taskInput').value;
  if (input.length < 5) {
    confirm('At least 5 characters pls');
    return;
  }

  const newTodo = new Todo(input);

  todos.push(newTodo);
  localStorage.setItem('Todo-storage', JSON.stringify(todos));
  
  const newListElement = document.createElement('li');
  newListElement.todoObj = newTodo;
  
  addElementListFromObj(newTodo);

  PostRestData(newTodo);
  getRestID();

  input = document.querySelector('#taskInput').value = '';

}

eventList.addEventListener("change", function (e) {
  const newDoneState = e.target.checked;
  const todoObj = e.target.parentElement.todoObj;
  todoObj.done = newDoneState;
  PutRestData(todoObj);
  localStorage.setItem("Todo-storage", JSON.stringify(todos));
});

// removeButton and function
// refactored
let removeButton = document.querySelector('#removeButton');
removeButton.addEventListener('click', removeDoneTasks);
function removeDoneTasks() {
  const taskList = document.querySelector('.yourToDo__eventList');
  for (let i = taskList.children.length - 1; i >= 0; i--) {
    let cb = taskList.children[i].todoObj.done;
    if (cb) {
      deleteRestData(taskList.children[i].todoObj);

      const index = todos.indexOf(taskList.children[i].todoObj);
      todos.splice(index, 1);
      taskList.children[i].remove();
    }
  }
  localStorage.setItem('Todo-storage', JSON.stringify(todos));
}
// Filter List
// get to know the active Filter
function actualToFilter() {
  filterField = document.querySelectorAll('#filter');
  for (let i = 0; i < 3; i++) {
    if (filterField[i].checked) {
      actualFilter = filterField[i].value;
    }
  }
}
// -> run the filter:
// case distinction of values parent-radiobutton
// show all/open/done
// not refactured yet
filterEvent.addEventListener('change', function (e) {
  actualToFilter();
  switch (actualFilter) {
    case 'all': // all Tasks
      const allTask = document.querySelectorAll(
        '.yourToDo__eventList__listElement'
      );
      for (let i = 0; i < allTask.length; i++) {
        allTask[i].style.display = '';
      }
      break;
    case 'open': // show the open, hide the done
      const openTask = document.querySelectorAll(
        '.yourToDo__eventList__listElement'
      );
      for (let i = 0; i < openTask.length; i++) {
        let cb = openTask[i].firstChild;
        if (cb.checked) {
          openTask[i].style.display = 'none';
        }
        if (!cb.checked) {
          openTask[i].style.display = '';
        }
      }
      break;
    case 'done': // show the done, hide the open
      const doneTask = document.querySelectorAll(
        '.yourToDo__eventList__listElement'
      );
      for (let i = 0; i < doneTask.length; i++) {
        let cb = doneTask[i].firstChild;
        if (!cb.checked) {
          doneTask[i].style.display = 'none';
        }
        if (cb.checked) {
          doneTask[i].style.display = '';
        }
      }
      break;
  }
});
/*function sort() {

  let todoList = [];
  todoList = document.querySelectorAll('.yourToDo__eventList__listElement');
  const oldList = document.querySelector('#eventList');
  for (let i = oldList.children.length - 1; i >= 0; i--) {
    oldList.children[i].remove();
  }
  todos.forEach(function (todo) {
    if (todo.labelClass === 'bg-color1') {
      newElement = addElementListFromObj(todo);

      oldList.appendChild(newElement);
    }
  });
  todos.forEach(function (todo) {
    if (todo.labelClass === 'bg-color2') {
      newElement = addElementListFromObj(todo);
      oldList.appendChild(newElement);
    }
  });
  todos.forEach(function (todo) {
    if (todo.labelClass === 'bg-color3') {
      newElement = addElementListFromObj(todo);
      oldList.appendChild(newElement);
    }
  });

}

} */
// Local storage: init App after refresh
// initTask becomes Array with Tasks as an object from local storage
// initializing the Tasks
// save Array "todos" -- commented out cause of using REST-data
/*
initApp();
function initApp() {
  if (localStorage.getItem('Todo-storage') !== null) {
    initTask = JSON.parse(localStorage.getItem('Todo-storage'));
    todos = initTask;
    for (i = 0; i < initTask.length; i++) {
      const line = document.createElement('li');
      line.todoObj = initTask[i];
      const checkbox = document.createElement('input');
      const currentLabel = document.createElement('label');
      const node = document.createTextNode(initTask[i].description);
      checkbox.type = 'checkbox';
      checkbox.classList = 'taskCheckbox';
      checkbox.id = 'taskCheckbox';
      checkbox.checked = initTask[i].status;
      //currentLabel.for = "taskCheckbox";
      currentLabel.classList = 'taskName';
      //line.classList = "yourToDo__eventList__listElement";
      line.classList =
        initTask[i].labelClass + ' ' + 'yourToDo__eventList__listElement';
      line.appendChild(checkbox);
      line.appendChild(currentLabel);
      currentLabel.appendChild(node);
      const oldList = document.querySelector('#eventList');

      addElementListFromObj(initTask[i]);
      const line = document.createElement("li");
      line.todoObj = initTask[i];
      addElementListFromObj(initTask[i]);
      const oldList = document.querySelector("#eventList");

      oldList.appendChild(line);
      sort();
    }
  }
}



*/
// get an element, type todoObl -> return a Node to add it to the DOM.


function addElementListFromObj(element) {
  const line = document.createElement('li');
  line.todoObj = element;
  const checkbox = document.createElement('input');
  const currentLabel = document.createElement('label');
  const node = document.createTextNode(element.description);

  checkbox.type = 'checkbox';
  checkbox.classList = 'taskCheckbox';
  checkbox.id = 'taskCheckbox';
  checkbox.checked = element.done;
  checkbox.setAttribute('data-test', 'cb-remove');
  line.appendChild(checkbox);

  currentLabel.classList = 'taskName';
  line.classList =
    element.labelClass + ' ' + 'yourToDo__eventList__listElement';
  currentLabel.setAttribute('data-test', 'task');
  
  const colorButton1 = createRedColorButton();
  const colorButton2 = createOrangeColorButton();
  const colorButton3 = createGreenColorButton();

  line.appendChild(currentLabel);
  currentLabel.appendChild(node);
  line.appendChild(colorButton1);
  line.appendChild(colorButton2);
  line.appendChild(colorButton3);

  const oldList = document.querySelector("#eventList");
  oldList.appendChild(line);
}

function getRestID() {
  fetch("http://localhost:4730/todos")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const lastElement = document.querySelector(
        ".yourToDo__eventList"
      ).lastChild;

      data.forEach(function (item) {
        if (item.description.includes(lastElement.todoObj.description)) {
          console.log("hurray" + item.id);
          lastElement.todoObj.id = item.id;
        }
      });
    });
}
GetRestData();

function GetRestData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  //var raw = JSON.stringify({
  //  description: "Learn PA",
  //  done: false,
  //});

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://localhost:4730/todos/", requestOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      todos = data;

      for (i = 0; i < data.length; i++) {
        const newListElement = document.createElement("li");
        newListElement.todoObj = addElementListFromObj(data[i]);
      }
    });
}

function PostRestData(element) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(element),
    redirect: "follow",
  };

  fetch("http://localhost:4730/todos/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function deleteRestData(element) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(element),
    redirect: "follow",
  };

  const delLink = "http://localhost:4730/todos/" + element.id;

  fetch(delLink, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

function PutRestData(element) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(element),
    redirect: "follow",
  };

  const changeLink = "http://localhost:4730/todos/" + element.id;

  fetch(changeLink, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
/*
constructor(desc, todoid, label) {
  this.description = desc;
  this.status = false;
  this.id = todoid;
  this.labelClass = label;
}
*/
