// global Variables:
let filterField = null;
let actualFilter = null;

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

  checkbox.type = "checkbox";
  checkbox.className = "taskCheckbox";
  checkbox.id = "taskCheckbox";

  currentLabel.for = "taskCheckbox";
  currentLabel.className = "taskName";

  //connect with list element
  line.className = "yourToDo__eventList";
  line.appendChild(checkbox);
  line.appendChild(currentLabel);
  currentLabel.appendChild(node);

  const oldList = document.querySelector("#eventList");
  oldList.appendChild(line);

  input = document.querySelector("#taskInput").value = "";
  taskFilter();
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
taskFilter();

// -> run the filter
function taskFilter() {
  actualToFilter();
  //console.log(actualFilter);
  switch (actualFilter) {
    case "0":
      console.log("all");
      break;
    case "1":
      console.log("open");
      break;
    case "2":
      console.log("done");
      break;
  }
}
