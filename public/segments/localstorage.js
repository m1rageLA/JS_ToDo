export function saveTasks(tasks) {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));  
    } 
    catch(err) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
            console.log('ERROR: local server is full! Please delete unnecessary tasks');
        }
        else {
            alert("Error saving tasks. Please try reloading the page or deleting unnecessary tasks.");
        }
    }
}

export function loadTasks() { 
    try {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

    catch(err) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
            console.log('ERROR: local server is full! Please delete unnecessary tasks');
        }
        else {
            alert("Error lodaing tasks. Please try reloading the page or deleting unnecessary tasks.");
        }
    }
}
