const textInput = document.getElementById("nameField");
const descrInput = document.getElementById("descrField");
const taskList = document.getElementById("taskList");

let tasksCollection = [];
let id = -1;

function createTaskElement(text, currentID) {
    let task_li = document.createElement("li");
    let task_div = document.createElement("div");
    let task_radio = document.createElement("input");
    let task_p_text = document.createElement("p");
    
    task_radio.setAttribute("type", "radio");

    task_radio.addEventListener('click', () => {
        removeTask(currentID, task_li);
    });

    task_p_text.textContent = text;
    
    task_li.classList.add('asd');
    task_div.classList.add('task-div');
    task_p_text.classList.add('a');

    task_div.appendChild(task_radio);
    task_div.appendChild(task_p_text);
    task_li.appendChild(task_div);

    return task_li;
}

function addTask() {
    if (textInput.value !== "") {
        let task = {
            text: textInput.value,
            completed: false,
        };
        console.log(tasksCollection);
        id++;
        tasksCollection.push(task);
        saveTasks(tasksCollection);
    } else {
        console.log("Пустое поле");
        return 0;
    }
}

function removeTask(currentID, task_li) {
    task_li.remove();
    tasksCollection[currentID - 1].completed = true;
    saveTasks(tasksCollection);
    console.log(tasksCollection);
}

document.getElementById("sendButton").addEventListener("click", () => {
    addTask();
    const { text, currentID = id } = tasksCollection[id];
    taskList.appendChild(createTaskElement(text, currentID));
});

// Save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));    
}

// Load tasks from local storage
function loadTasks() { 
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}

// Load tasks from local storage on page load
tasksCollection = loadTasks();

// Render existing tasks on page load
tasksCollection.forEach(task => {
    if (task.completed === false) {
        console.log("FALSE");
        taskList.appendChild(createTaskElement(task.text, task.id));
    }
});