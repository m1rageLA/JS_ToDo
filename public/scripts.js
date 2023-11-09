import { saveTasks, loadTasks } from './segments/localstorage.js';

const textInput = document.getElementById("nameField");
const taskList = document.getElementById("taskList");
const finishedList = document.getElementById("finishedTaskList");
const finishedBox = document.getElementById("finishedBoxButton");

let tasksCollection = [];
let activeElement = null;
let finishListIsHidden = false;

let id = parseInt(localStorage.getItem('taskID')) || 0;

function createTaskElement(currentID) {

    const liElement = document.createElement("li");
    liElement.classList.add('liElement');
    const divElement = document.createElement("div");
    divElement.classList.add('task-div');
    const textElement = document.createElement("p");
    textElement.textContent = tasksCollection[currentID].text;
    textElement.classList.add('textInLiElement');
    const bin = document.createElement('button');
    bin.classList.add('bin');
    const editTaskField = document.createElement("input");
    editTaskField.setAttribute("placeholder", "Enter the new task name...");
    editTaskField.classList.add('editTaskField');
    const submitChange = document.createElement("div");
    submitChange.setAttribute("type", "submit");
    submitChange.setAttribute("value", "Submit");
    submitChange.classList.add('submitChange');

    const checkboxElement = document.createElement("input");
    checkboxElement.classList.add('radio');
    checkboxElement.setAttribute("type", "radio");
    checkboxElement.addEventListener('click', () => {
        removeTask(currentID, liElement);
    });

    divElement.appendChild(checkboxElement);
    divElement.appendChild(submitChange);
    divElement.appendChild(textElement);
    divElement.appendChild(bin);
    divElement.appendChild(editTaskField);
    liElement.appendChild(divElement);

    if (tasksCollection[currentID].completed) {
        checkboxElement.style.borderColor = "#346b3d";
    }

    function showAdditionalPram(actualHeight) {
        activeElement = liElement;
        liElement.dataset.startHeight = actualHeight;
        liElement.style.height = actualHeight + 60 + "px";
        editTaskField.style.display = "block";
        submitChange.style.display = "block";
    }

    function hideAdditionalParam() {
        activeElement = null;
        liElement.style.height = liElement.dataset.startHeight + "px";
        editTaskField.style.display = "none";
        submitChange.style.display = "none";
    }

    function hidePreviousActivity() {
        activeElement.style.height = activeElement.dataset.startHeight + "px";
        activeElement.querySelector('.editTaskField').style.display = "none";
        activeElement.querySelector('.submitChange').style.display = "none";
    }

    function editTask() {
        tasksCollection[currentID].text = editTaskField.value;
        textElement.textContent = editTaskField.value;
        editTaskField.value = "";
        setTimeout(function() {
            hideAdditionalParam();
          }, 40);
        saveTasks(tasksCollection);
    }

    liElement.addEventListener('click', () => {
        //Check if the target of the input event has the class 'editTaskField'
        const { classList } = event.target;

        if (classList.contains('editTaskField') || classList.contains('submitChange' || classList.contains('bin'))) {
            return; // Если да, просто завершаем функцию
        }
        
        const actualHeight = parseInt(window.getComputedStyle(liElement).height);
        if (activeElement !== null && activeElement !== liElement) {
            hidePreviousActivity();//Hide previous activities
        }
        if (activeElement !== liElement) {
            showAdditionalPram(actualHeight);//Show additional parameters
        } 
        else {
            hideAdditionalParam();//Hide additional parameters
        }
    });
    
    editTaskField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            editTask();
        }
    });

    submitChange.addEventListener('click' , () => {
        if (editTaskField.value!== "") {
            editTask();
        } else {
            alert("Empty input field");
        }
    });

    bin.addEventListener('click', () => {
        liElement.remove();
        delete tasksCollection[currentID];
        saveTasks(tasksCollection);
    });

    return liElement;
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
        alert("Empty input field");
    }
}

function removeTask(currentID, task_li) {
    //to remove list 
    if (tasksCollection[currentID].completed === false) {
        task_li.remove();
        tasksCollection[currentID].completed = true;
        saveTasks(tasksCollection);
        if (finishListIsHidden === false) {
            finishedList.appendChild(createTaskElement(currentID));   
        }
    //from remove list to task list
    } else {
        task_li.remove();
        tasksCollection[currentID].completed = false;
        taskList.appendChild(createTaskElement(currentID));   
        saveTasks(tasksCollection);
    }
}

tasksCollection = loadTasks();

tasksCollection.forEach((task, index) => {
    if (task !== null) {
        if (task.completed) {
            finishedList.appendChild(createTaskElement(index));
        } else {
            taskList.appendChild(createTaskElement(index));
        }  
    }
});

function performAction() {
    if (textInput.value !== "") {
        addTask();
        const index = id - 1;
        taskList.appendChild(createTaskElement(index));
    } else {    
        alert("Empty input field");
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

//Prevents the button "flicker" bug before loading elements
document.addEventListener('DOMContentLoaded', function() {
    finishedBox.style.display = "block";
});

finishedBox.addEventListener('click', function() {
    const imgElement = this.querySelector('img');
    //close -> open
    if (imgElement.src.endsWith('icons/left.png')) {
        finishListIsHidden = false;
        imgElement.src = 'icons/down.png';
        tasksCollection.forEach((task, index) => {
            if (task !== null) {
                if (task.completed){
                    finishedList.appendChild(createTaskElement(index));
                }  
            }
        });
    //open -> close
    } else if (imgElement.src.endsWith('icons/down.png')) {
        imgElement.src = 'icons/left.png';
        finishedList.innerHTML = "";
        finishListIsHidden = true;
    }
});

  