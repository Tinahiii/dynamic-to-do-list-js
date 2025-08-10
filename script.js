// script.js

// Ensure the script runs only after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements.
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list.
    const addTask = () => {
        // Retrieve and trim the value from the input field.
        const taskText = taskInput.value.trim();

        // Check if the input is not empty.
        if (taskText === "") {
            alert('Please enter a task.');
            return; // Exit the function if the input is empty.
        }

        // Create the list item (li) and a remove button.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add a click event listener to the remove button.
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the list item.
        listItem.appendChild(removeButton);

        // Append the new list item to the task list (ul).
        taskList.appendChild(listItem);

        // Clear the input field after adding the task.
        taskInput.value = '';
    };

    // Attach event listener to the "Add Task" button.
    addButton.addEventListener('click', addTask);

    // Attach event listener to the input field for the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
