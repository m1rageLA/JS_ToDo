const textInput = document.getElementById("nameField");
const descrInput = document.getElementById("descrField");
const taskList = document.getElementById("taskList");

let tasksCollection = [];
let id = parseInt(localStorage.getItem('taskID')) || 0;

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
        
        id++;

        localStorage.setItem('taskID', id);
        tasksCollection.push(task);
        saveTasks(tasksCollection);
        textInput.value = "";
    } else {
        console.log("Пустое поле");
    }
}

function removeTask(currentID, task_li) {
    task_li.remove();
    tasksCollection[currentID].completed = true;
    saveTasks(tasksCollection);
}

document.getElementById("sendButton").addEventListener("click", () => {
    if (textInput.value !== "") {
        addTask();
        const currentID = id - 1;
        taskList.appendChild(createTaskElement(tasksCollection[currentID].text, currentID));
    }
    else {
        console.log("Пустое поле");
    }
});

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));    
}

function loadTasks() { 
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}

tasksCollection = loadTasks();

tasksCollection.forEach((task, index) => {
    if (task.completed === false) {
        taskList.appendChild(createTaskElement(task.text, index));
    }
});

//TODO: Сделать функциональность сделанных задач