const textInput = document.getElementById("nameField");
const descrInput = document.getElementById("descrField");
const taskList = document.getElementById("taskList");

function createTaskElement(text, description) {
    let task_li = document.createElement("li");
    let task_div = document.createElement("div");
    let task_radio = document.createElement("input");
    let task_p_text = document.createElement("p");
    let task_p_descr = document.createElement("p");
    
    task_radio.setAttribute("type", "radio");

    task_p_text.textContent = text;
    task_p_descr.textContent = description;
    
    task_li.classList.add('asd');
    task_div.classList.add('task-div');
    task_p_text.classList.add('a');
    task_p_descr.classList.add('a');

    task_div.appendChild(task_radio);
    task_div.appendChild(task_p_text);
    task_div.appendChild(task_p_descr);
    task_li.appendChild(task_div);

    return task_li;
}

let tasksCollection = [];
let id = 0;

function addTask() {
    if (textInput.value !== "") {
        let task = {
            id: id++,
            text: textInput.value,
            completed: false,
        };
        tasksCollection.push(task);
    } else {
        console.log("Пустое поле");
        return 0;
    }
}

document.getElementById("sendButton").addEventListener("click", () => {
    addTask();
    const newTask = createTaskElement(tasksCollection[id - 1].text, tasksCollection[id - 1].description);
    taskList.appendChild(newTask);
});

