// global Variables:
let filterField = null;
let actualFilter = null;
let toDoList = [];
let todos = [];
let initTask = [];

// Eventlistener for addbutton opr input field (keyboard #13)

let addButton = document.querySelector("#addButton");
addButton.addEventListener("click", addListEntry);

let addInput = document.querySelector("#taskInput");
addInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    addListEntry(e);
  }
});

// create new Line and a new object (attributes: id, description, status)
// connect the new element with former list.

function addListEntry(e) {
  let input = document.querySelector("#taskInput").value;
  if (input.length < 5) {
    confirm("At least 5 characters pls");
    return;
  }

  const todoId = input.trim().toLowerCase().replaceAll(" ", "-");

  const newTodo = {
    id: todoId,
    description: input,
    status: false,
  };

  todos.push(newTodo);

  localStorage.setItem("Todo-storage", JSON.stringify(todos));

  const newListElement = document.createElement("li");
  newListElement.todoObj = newTodo;
  newListElement.classList = "yourToDo__eventList__listElement";

  const ncheckbox = document.createElement("input");
  ncheckbox.type = "checkbox";
  ncheckbox.classList = "taskCheckbox";
  ncheckbox.id = "taskCheckbox";

  const ncurrentLabel = document.createElement("label");

  ncurrentLabel.classList = "taskName";
  const nnode = document.createTextNode(input);

  newListElement.appendChild(ncheckbox);
  newListElement.appendChild(ncurrentLabel);
  ncurrentLabel.appendChild(nnode);

  const oldList = document.querySelector("#eventList");
  oldList.appendChild(newListElement);

  input = document.querySelector("#taskInput").value = "";
}

eventList.addEventListener("change", function (e) {
  const newDoneState = e.target.checked;
  const todoObj = e.target.parentElement.todoObj;
  todoObj.status = newDoneState;

  localStorage.setItem("Todo-storage", JSON.stringify(todos));
});

// removeButton and function
// refactored

let removeButton = document.querySelector("#removeButton");
removeButton.addEventListener("click", removeDoneTasks);

function removeDoneTasks() {
  const taskList = document.querySelector(".yourToDo__eventList");
  for (let i = taskList.children.length - 1; i >= 0; i--) {
    let cb = taskList.children[i].todoObj.status;
    if (cb) {
      const index = todos.indexOf(taskList.children[i].todoObj);
      todos.splice(index, 1);
      taskList.children[i].remove();
    }
  }

  localStorage.setItem("Todo-storage", JSON.stringify(todos));
}

// Filter List

// get to know the active Filter
function actualToFilter() {
  filterField = document.querySelectorAll("#filter");
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

function taskFilter(e) {
  actualToFilter();
  switch (actualFilter) {
    case "0": // all Tasks
      const allTask = document.querySelectorAll(
        ".yourToDo__eventList__listElement"
      );
      console.log(allTask);
      for (let i = 0; i < allTask.length; i++) {
        allTask[i].style.display = "";
      }
      break;

    case "1": // show the open, hide the done
      const openTask = document.querySelectorAll(
        ".yourToDo__eventList__listElement"
      );

      for (let i = 0; i < openTask.length; i++) {
        let cb = openTask[i].firstChild;
        if (cb.checked) {
          openTask[i].style.display = "none";
        }
        if (!cb.checked) {
          openTask[i].style.display = "";
        }
      }
      break;

    case "2": // show the done, hide the open
      const doneTask = document.querySelectorAll(
        ".yourToDo__eventList__listElement"
      );

      for (let i = 0; i < doneTask.length; i++) {
        let cb = doneTask[i].firstChild;
        if (!cb.checked) {
          doneTask[i].style.display = "none";
        }
        if (cb.checked) {
          doneTask[i].style.display = "";
        }
      }
      break;
  }
}

// Local storage: init App after refresh
// initTask becomes Array with Tasks as an object from local storage
// initializing the Tasks
// save Array "todos"
initApp();

function initApp() {
  if (localStorage.getItem("Todo-storage") !== null) {
    initTask = JSON.parse(localStorage.getItem("Todo-storage"));
    todos = initTask;

    for (i = 0; i < initTask.length; i++) {
      const line = document.createElement("li");
      line.todoObj = initTask[i];

      const checkbox = document.createElement("input");
      const currentLabel = document.createElement("label");

      const node = document.createTextNode(initTask[i].description);

      checkbox.type = "checkbox";
      checkbox.classList = "taskCheckbox";
      checkbox.id = "taskCheckbox";
      checkbox.checked = initTask[i].status;

      //currentLabel.for = "taskCheckbox";
      currentLabel.classList = "taskName";

      line.classList = "yourToDo__eventList__listElement";
      line.appendChild(checkbox);
      line.appendChild(currentLabel);
      currentLabel.appendChild(node);

      const oldList = document.querySelector("#eventList");
      oldList.appendChild(line);
    }
  }
}
