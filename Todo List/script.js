"use strict";



// Task Class
class Task {
    constructor(taskName, schedule, status, id) {
        this.taskName = taskName;
        this.schedule = schedule;
        this.status = status;
        this.id = id;
    }
}

// Is Edit Control
let isEdit = false;
let editID = 0;

const taskInput = document.querySelector("#input-task");
const schedule = document.querySelector("#select");


// User Input Class
class UserInput {

    // Display tasks on the document
    static displayTask(tasks) {
        document.querySelectorAll(".task-list-item").forEach(item => item.remove());
        tasks.forEach(task => UserInput.addTask(task));
    }

    // Add tasks to the list
    static addTask(task) {
        let checked = task.status == "completed" ? "checked" : "";
        let completed = task.status == "completed" ? "completed" : "";
        if (!isEdit) {
            let taskList = document.querySelector(".task-list");
            let rank = taskList.childElementCount;
            let ul = document.createElement("ul");
            ul.className = `task-list-item ${completed}`;
            ul.innerHTML = `
            <li class="taskName">
                <input type="checkbox" id="${task.id}" ${checked}>
                <label for="${task.id}">${rank}- ${task.taskName}</label>
            </li>
            <li>${task.schedule}</li>
            <li>${task.status}</li>
            <li class="dropdown">
                <i id="delete" class="fa-solid fa-trash-can"></i>
                <i id="edit" class="fa-solid fa-pen"></i>
            </li> 
            `;

            taskList.insertAdjacentElement("beforeend", ul);
        }
        else {
            isEdit = false;           
            UserInput.displayTask(Store.getTask());
        }
    }
    // Delete task from the list
    static deleteTask(task) {
        task.classList.add("danger");
        task.classList.remove("completed");
        setInterval(() => {
            task.remove();
            task.classList.remove("danger");
        }, 500);
        isEdit = false;
        UserInput.displayTask(Store.getTask());
    }

    // Edit task to be list
    static editTask() {
        let tasks = Store.getTask();
        tasks.forEach(task => {
            if(task.id == editID){
                task.taskName = taskInput.value;
                task.schedule = schedule.value;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Clear values of fields
    static clearInput() {
        schedule.value = "Schedule";
        document.querySelector("#filter").value = "";
        taskInput.value = "";
        taskInput.focus();
    }
    // Show alert when event happens
    static alert(message, className) {
        let alert = document.createElement("p");
        let filterGroup = document.querySelector(".filter-group");
        let filterInput = document.querySelector(".filter-input-group");
        alert.className = `alert ${className}`;
        alert.textContent = message;
        filterGroup.insertBefore(alert, filterInput);

        setInterval(() => alert.remove(), 2000);
    }
}


// Task Store Class
class Store {
    // Get tasks from localstorage
    static getTask() {
        let tasks;
        if (!localStorage.getItem("tasks")) {
            tasks = [];
        }
        else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        return tasks;
    }

    // Add task to localstorage
    static addTaskToStore(task) {
        let tasks = Store.getTask();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Remove task from localstorage
    static removeTask(id) {
        let tasks = Store.getTask();
        tasks.forEach((task, index) => {
            if (task.id == id) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Edit task in localstorage
    static setTask(_task){
        let tasks = Store.getTask();
        tasks.forEach(task => {
            if(task.id == _task.firstElementChild.firstElementChild.id){
                if(_task.lastElementChild.previousElementSibling.textContent == "completed"){
                    task.status = "completed";
                }
                else {
                    task.status = "pending";
                }
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Display Tasks When Page Loaded
document.addEventListener("DOMContentLoaded", () => UserInput.displayTask(Store.getTask()));

// Event: Add Task to List
document.querySelector(".input-group").addEventListener("submit", (e) => {
    e.preventDefault();
    let taskName = taskInput.value;
    let plan = schedule.value;
    let tasks = Store.getTask();
    let id = document.querySelectorAll(".task-list-item").length + 1;
    tasks.forEach(task => {
        if(task.id == id){
            id += 1;
        }
    })
    let addNewTask = new Task(taskName, plan, "pending", id);

    if (taskName.trim().length < 10) {
        UserInput.alert("The taskname must be min 10 character", "danger");
    }
    else if (plan == "Schedule") {
        UserInput.alert("Schedule must be chosen!", "warning");
    }
    else if (!isEdit) {
        UserInput.alert("Task Added", "success");
        UserInput.clearInput();
        UserInput.addTask(addNewTask);
        Store.addTaskToStore(addNewTask);
    }
    else {
        UserInput.editTask();
        UserInput.clearInput();
        UserInput.addTask(addNewTask);
    }
});

// Event: Delete Task from List & Edit Task
document.addEventListener("click", (e) => {
    if (e.target.id == "delete") {
        UserInput.deleteTask(e.target.parentElement.parentElement);
        UserInput.alert("Task Removed", "success");
        Store.removeTask(e.target.parentElement.parentElement.firstElementChild.firstElementChild.id);
    }
    else if (e.target.id == "edit") {
        let tasks = Store.getTask();
        tasks.forEach(task => {
            if (task.id == e.target.parentElement.parentElement.firstElementChild.firstElementChild.id) {
                e.target.parentElement.parentElement.classList.add("info");
                setInterval(() => e.target.parentElement.parentElement.classList.remove("info"), 800);
                editID = task.id;
                taskInput.value = task.taskName;
                schedule.value = task.schedule;
                taskInput.focus();
                isEdit = true;
            }
        });
    }
});

// Event: Task Status Control
document.addEventListener("change", (e) => {
    if(e.target.type == "checkbox"){
        if(e.target.checked){
            e.target.parentElement.parentElement.classList.add("completed");
            e.target.parentElement.parentElement.style.textDecoration = "line-through";
            e.target.parentElement.nextElementSibling.nextElementSibling.textContent = "completed";
            Store.setTask(e.target.parentElement.parentElement);
        }
        else {
            e.target.parentElement.parentElement.classList.remove("completed");
            e.target.parentElement.parentElement.style.textDecoration = "none";
            e.target.parentElement.nextElementSibling.nextElementSibling.textContent = "pending";
            Store.setTask(e.target.parentElement.parentElement);
        }
    }
    
})

// Look For Tasks (searchbox)
let filter = document.querySelector("#filter");
let taskListItems = document.getElementsByClassName("task-list-item");  
filter.addEventListener("keyup", (e) => {
    for(let i = 0; i < taskListItems.length; i++){
        let text = taskListItems[i].firstElementChild.lastElementChild.textContent.toLocaleLowerCase();
        if(text.indexOf(filter.value.toLocaleLowerCase()) > -1){
            taskListItems[i].style.display = "";
        }
        else {
            taskListItems[i].style.display = "none";
        }
    }
})

// Filter Tasks by Status
let filters = document.querySelectorAll(".filters span");
filters.forEach(span => span.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    span.classList.add("active");
    let tasks = Store.getTask()
    let items = [];
    if(span.id == "completed"){
        tasks.forEach(task => {
            if(task.status == "completed"){
                items.push(task);
            }
        });
        UserInput.displayTask(items);
    }
    else if(span.id == "pending"){
        tasks.forEach(task => {
            if(task.status == "pending"){
                items.push(task);
            }
        });
        UserInput.displayTask(items);
    }
    else {
        UserInput.displayTask(tasks);
    }
}));

    
    