document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskButton.addEventListener("click", () => {
    const taskTest = todoInput.value.trim();
    if (taskTest == "") return;

    const newTask = {
      id: Date.now(),
      text: taskTest,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = ""; //clear input
    // console.log(tasks);
  });

  function renderTask(task) {
    //Dynamic Rendering	renderTask() generates DOM elements at runtime.
    // console.log(task.text);
    const li = document.createElement("li"); //rendering the task from local storage
    li.setAttribute("data-id", task.id); //aria tag
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span>${task.text}</span>
      <button>delete</button>`;
    todoList.appendChild(li);

    li.addEventListener("click", (e) => {
      //line throgh when task complete and clicking on task
      if (e.target.tagName == "BUTTON") return;
      li.classList.toggle("completed");
      task.completed = !task.completed;
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      //delete the task if want to delete
      e.stopPropagation(); //prevent event bubbling
      tasks = tasks.filter((t) => t.id != task.id);
      saveTask();
      li.remove();
    });
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
