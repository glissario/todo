// global Variables:
let filterField = null;
let actualFilter = null;
let toDoList = [];
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

// create new Line with input (type checkbox) and label element
// connect the new element with former list

function addListEntry(e) {
  const line = document.createElement("li");
  const checkbox = document.createElement("input");
  const currentLabel = document.createElement("label");

  let input = document.querySelector("#taskInput").value;
  const node = document.createTextNode(input);

  if (node.length < 5) {
    confirm("At least 5 characters pls");
    return;
  }

  checkbox.type = "checkbox";
  checkbox.className = "taskCheckbox";
  checkbox.id = "taskCheckbox";

  currentLabel.for = "taskCheckbox";
  currentLabel.className = "taskName";

  //connect with list element
  line.className = "yourToDo__eventList__listElement";
  line.appendChild(checkbox);
  line.appendChild(currentLabel);
  currentLabel.appendChild(node);

  const oldList = document.querySelector("#eventList");
  oldList.appendChild(line);

  //console.log(input);
  toDoList.push(input);
  localStorage.setItem("storageList", JSON.stringify(toDoList));

  input = document.querySelector("#taskInput").value = "";
}

// removeButton and function

let removeButton = document.querySelector("#removeButton");
removeButton.addEventListener("click", removeDoneTasks);

function removeDoneTasks() {
  const doneTask = document.querySelectorAll(
    ".yourToDo__eventList__listElement"
  );

  for (let i = 0; i < doneTask.length; i++) {
    let cb = doneTask[i].firstChild;
    if (cb.checked) {
      const indexToDelete = toDoList.indexOf(doneTask[i].lastChild.innerHTML);
      toDoList.splice(indexToDelete, 1);
      localStorage.setItem("storageList", JSON.stringify(toDoList));
      doneTask[i].remove();
    }
  }
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
// initTask becomes Array with Tasks from local storage
// initializing the Tasks
// save Array "toDoList"
initApp();

function initApp() {
  if (localStorage.getItem("storageList") !== null) {
    initTask = JSON.parse(localStorage.getItem("storageList"));

    for (i = 0; i < initTask.length; i++) {
      const line = document.createElement("li");
      const checkbox = document.createElement("input");
      const currentLabel = document.createElement("label");

      let input = initTask[i];
      const node = document.createTextNode(input);

      checkbox.type = "checkbox";
      checkbox.className = "taskCheckbox";
      checkbox.id = "taskCheckbox";

      currentLabel.for = "taskCheckbox";
      currentLabel.className = "taskName";

      line.className = "yourToDo__eventList__listElement";
      line.appendChild(checkbox);
      line.appendChild(currentLabel);
      currentLabel.appendChild(node);

      const oldList = document.querySelector("#eventList");
      oldList.appendChild(line);

      toDoList.push(initTask[i]);
    }
  }
}
