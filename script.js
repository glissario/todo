// global Variables:
let filterField = null;
let actualFilter = null;
let toDoList = [];

// add Task to List

let addButton = document.querySelector("#addButton");
addButton.addEventListener("click", addListEntry);

let addInput = document.querySelector("#taskInput");
addInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    addListEntry(e);
  }
});

function addListEntry(e) {
  const line = document.createElement("li");
  const checkbox = document.createElement("input");
  const currentLabel = document.createElement("label");

  let input = document.querySelector("#taskInput").value;
  const node = document.createTextNode(input);

  if (node.length < 5) {
    alert("At least 5 characters pls");
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

// -> run the filter
function taskFilter(e) {
  actualToFilter();
  switch (actualFilter) {
    case "0": // all Tasks
      const allTask = document.querySelectorAll(
        ".yourToDo__eventList__listElement"
      );
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
