// script.js

// Ensure the script runs only after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * @description Adds a new task to the DOM and optionally saves it to Local Storage.
     * @param {string} taskText The text of the task to be added.
     * @param {boolean} saveToLocalStorage A flag to control whether to save to Local Storage.
     */
    const addTask = (taskText, saveToLocalStorage = true) => {
        // Create the list item (li) and a remove button.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add a click event listener to the remove button.
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the list item.
        listItem.appendChild(removeButton);

        // Append the new list item to the task list (ul).
        taskList.appendChild(listItem);

        // Save the new task to Local Storage if the flag is true.
        if (saveToLocalStorage) {
            saveTaskToLocalStorage(taskText);
        }
    };

    /**
     * @description Saves a new task to the 'tasks' array in Local Storage.
     * @param {string} taskText The text of the task to be saved.
     */
    const saveTaskToLocalStorage = (taskText) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    };

    /**
     * @description Removes a task from the 'tasks' array in Local Storage.
     * @param {string} taskText The text of the task to be removed.
     */
    const removeTaskFromLocalStorage = (taskText) => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    /**
     * @description Loads and displays tasks from Local Storage when the page loads.
     */
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to prevent re-saving
    };

    // --- Event Listeners and Initial Load ---

    // Add task from input field logic
    const handleAddTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText);
        taskInput.value = ''; // Clear the input field
    };

    // Attach event listener to the "Add Task" button.
    addButton.addEventListener('click', handleAddTask);

    // Attach event listener to the input field for the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });

    // Initial call to load tasks from Local Storage when the page loads.
    loadTasks();
});
