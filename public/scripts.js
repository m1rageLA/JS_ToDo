import { saveTasks, loadTasks } from './segments/localstorage.js';

const textInput = document.getElementById("nameField");
const taskList = document.getElementById("taskList");
const finishedList = document.getElementById("finishedTaskList");
const finishedBox = document.getElementById("finishedBoxButton");
let tasksCollection = [];

let id = parseInt(localStorage.getItem('taskID')) || 0;
let activeElement = null;

function createTaskElement(text, currentID) {
    let task_li = document.createElement("li");
    let task_div = document.createElement("div");
    let task_radio = document.createElement("input");
    let task_p_text = document.createElement("p");

    task_radio.setAttribute("type", "radio");

    task_radio.addEventListener('click', () => {
        removeTask(currentID, task_li, text);
    });

    task_p_text.textContent = text;

    task_li.classList.add('liElement');
    task_div.classList.add('task-div');
    task_p_text.classList.add('a');
    task_radio.classList.add('radio');

    task_div.appendChild(task_radio);
    task_div.appendChild(task_p_text);
    task_li.appendChild(task_div);

    task_li.addEventListener('click', () => {
        const actualHeight = parseInt(window.getComputedStyle(task_li).height);
        if (activeElement !== null && activeElement !== task_li) {
            activeElement.style.height = activeElement.dataset.startHeight + "px";
        }
        if (activeElement !== task_li) {
            activeElement = task_li;
            task_li.dataset.startHeight = actualHeight;
            task_li.style.height = actualHeight + 60 + "px";
        } else {
            activeElement = null;
            task_li.style.height = task_li.dataset.startHeight + "px";
        }
    });
    

    return task_li;
}

function addTask() {
    if (textInput.value !== "") {
        let task = {
            text: textInput.value,
            completed: false,
            activeState: false,
        };
        id++;
        localStorage.setItem('taskID', id);
        tasksCollection.push(task);
        saveTasks(tasksCollection);
        textInput.value = "";
    } else {
        console.log("Пустое поле");
    }
}

function removeTask(currentID, task_li, text) {
    task_li.remove();
    tasksCollection[currentID].completed = true;
    saveTasks(tasksCollection);
    finishedList.appendChild(createTaskElement(text, currentID));
}

tasksCollection = loadTasks();

tasksCollection.forEach((task, index) => {
    if (task.completed === false) {
        taskList.appendChild(createTaskElement(task.text, index));
    } else if (task.completed === true){
        finishedList.appendChild(createTaskElement(task.text, index));
    }
});

function performAction() {
    if (textInput.value !== "") {
        addTask();
        const currentID = id - 1;
        taskList.appendChild(createTaskElement(tasksCollection[currentID].text, currentID));
    } else {
        console.log("Пустое поле");
    }
}

document.getElementById("sendButton").addEventListener("click", () => {
    performAction();
});

textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        performAction();
    }
});

finishedBox.addEventListener('click', function() {
    var imgElement = this.querySelector('img');
    if (imgElement.src.endsWith('icons/left.png')) {
        imgElement.src = 'icons/down.png';
        tasksCollection.forEach((task, index) => {
            if (task.completed){
                finishedList.appendChild(createTaskElement(task.text, index));
            }
        });
    } else if (imgElement.src.endsWith('icons/down.png')) {
        imgElement.src = 'icons/left.png';
        finishedList.innerHTML = "";
        
    }
});

  