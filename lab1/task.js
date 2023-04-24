// getting all the elements
const add_task_btn = document.getElementById("add_task_btn");
const next_task_btn = document.getElementById("next_task_btn");

const add_task_input = document.getElementById("add_task_input");
const next_task_input = document.getElementById("next_task_input");
const task_list_input = document.getElementById("task_list_input");

// global tasks array
let tasks = getFromLocalStorage();


// initially updating the task display
updateTaskDisplay();


add_task_btn.addEventListener("click", addTask);
next_task_btn.addEventListener("click", updateNextTask);
task_list_input.addEventListener("change", (e) => {
  tasks = e.target.value.split("\n")
  writeToLocalStorage(JSON.stringify(tasks));
  console.log(tasks)
});


function updateTaskDisplay() {
  if (tasks) {
    task_list_input.value = tasks.join("\n");
  }
}

function updateNextTask() {
    next_task_input.value = tasks[0] || ""
    tasks.shift();
    writeToLocalStorage(JSON.stringify(tasks))
    updateTaskDisplay();
}

function addTask() {
  let newTask = add_task_input.value;
  if(newTask==""){
    alert("Enter a task");  
    return;
  }
  tasks.push(newTask);
  writeToLocalStorage(JSON.stringify(tasks));
  updateTaskDisplay();
  add_task_input.value = "";
}


function writeToLocalStorage(tasks) {
  localStorage.setItem("tasks", tasks);
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
