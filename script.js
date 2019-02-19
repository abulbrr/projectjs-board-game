var selectedTask = {};
var archeivedTasks = [];
var todoList = [];

function $(query) {
  return document.querySelector(query);
}

function archeive() {
  selectedTask.archeived = true;
  render();
}

function edit() {
  var taskTitle = $("#task").value;
  var taskPriority = $("#priority").value;
  selectedTask.title = taskTitle;
  selectedTask.priority = taskPriority;

  render();
}

function createTask(_title, _priority) {
  var task = {
    title: _title,
    priority: _priority,
    selected: false,
    closed: false,
    archeived: false
  };
  return task;
}

function saveTask() {
  var taskTitle = $("#task").value;
  var taskPriority = $("#priority").value;

  let task = createTask(taskTitle, taskPriority);
  todoList.push(task);
  render();
}
function unfinalizeTask() {
  selectedTask.closed = false;
  render();
}

function deleteTask() {
  todoList.splice(todoList.indexOf(selectTask), 1);
  render();
}
function finalizeTask() {
  selectedTask.closed = true;
  render();
}
function selectTask(id) {
  id = id.slice(2);

  todoList.forEach(task => {
    task.selected = false;
  });

  let task = todoList[id];
  selectedTask = task;
  task.selected = true;
  render();
}
function render() {
  var listDiv = $("#todolist");
  listDiv.innerHTML = "";

  let sortedList = todoList.sort((a, b) => {
    return b.priority - a.priority;
  });
  for (let index = 0; index < sortedList.length; index++) {
    const element = sortedList[index];
    if (element.archeived == true) continue;
    listDiv.innerHTML +=
      '<a id="li' +
      index +
      '" onclick="selectTask(this.id)">' +
      element.title +
      " | " +
      element.priority +
      "</a></br>";
    let task = $("#li" + index);
    if (element.selected == true) {
      task.style.backgroundColor = "red";
    }
    if (element.closed == true) {
      task.style.textDecoration = "line-through";
    }
  }

  archeivedDiv = $("#ArcheivedList");

  for (let index = 0; index < sortedList.length; index++) {
    const element = sortedList[index];
    if (element.archeived != true) continue;
    archeivedDiv.innerHTML +=
      '<a id="li' +
      index +
      '" onclick="selectTask(this.id)">' +
      element.title +
      " | " +
      element.priority +
      "</a></br>";
    let task = $("#li" + index);
    if (element.selected == true) {
      task.style.backgroundColor = "red";
    }
    if (element.closed == true) {
      task.style.textDecoration = "line-through";
    }
  }
}
