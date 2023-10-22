const textInput = document.getElementById("nameField");
const descrInput = document.getElementById("descrField");
const taskList = document.getElementById("taskList");

let tasksCollection = [];
let id = -1;

function createTaskElement(text, description, currentID) {
    let task_li = document.createElement("li");
    let task_div = document.createElement("div");
    let task_radio = document.createElement("input");
    let task_p_text = document.createElement("p");
    let task_p_descr = document.createElement("p");
    
    task_radio.setAttribute("type", "radio");

    task_radio.addEventListener('click', () => {
        removeTask(currentID, task_li);
    });

    task_p_text.textContent = text;
    task_p_descr.textContent = description;
    
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

function removeTask(currentID, task_li) {
    task_li.remove();
    tasksCollection[currentID].completed = true;
    console.log(tasksCollection[currentID]);
}

document.getElementById("sendButton").addEventListener("click", () => {
    addTask();
    const { text, description, currentID = id } = tasksCollection[id];//--destructuring--
    taskList.appendChild(createTaskElement(text, description, currentID));
});