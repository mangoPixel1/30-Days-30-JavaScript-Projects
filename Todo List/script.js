// DONE: How to access grandparent of an element and edit a node with no HTML tag
// DONE: ^^^ write it using an event handler
// What are some ways I can normalize a CSS file to ensure prevent cross-browser issues?
// How do I use DOMContentLoaded, give me an example
// Use a form to handle input???

// DONE: Refactor code to use functions and instead of having function logic in the body of addEventListener()
// Write documentation for the new functions
// DONE: Convert complete task functionality using the toggle() method for the class "complete"
// DONE: Create a new section in the HTML for the completed tasks
// DONE: Modify the addNewTask function to add the task to the beginning of the list
// Without providing code, give me an approach to move the completed items to the completed-tasks <div>



// HTML tag references
const textInputBox = document.getElementById('newTaskInput'); // New task input
const addBtn = document.getElementById('addBtn'); // Add button
const tasksList = document.getElementById('active-tasks'); // Tasks list
const completedTasksList = document.getElementById('completed-tasks'); // Completed tasks list

// Function to handle adding a new task to the list
function addNewTask() {
    // Check if text box contains text
    if (textInputBox.value.length === 0) {
        alert('Text box is empty.');
        return;
    }

    // Create new task item <div>
    const newTask = document.createElement('div');
    newTask.classList.add('taskItem');

    // Create new task text <p>
    const taskText = document.createElement('p');
    taskText.classList.add('taskText');
    taskText.textContent = textInputBox.value;
    newTask.appendChild(taskText);

    // Create new taskOptions <div> (Complete & Delete)
    const taskOptions = document.createElement('div');
    taskOptions.classList.add('taskOptions');

    // Complete task <button>
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('completeBtn');
    taskOptions.appendChild(completeBtn);

    // Delete task <button>
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    taskOptions.appendChild(deleteBtn);

    // Append all newly created elements to tasks list
    newTask.appendChild(taskOptions);
    tasksList.insertBefore(newTask, tasksList.firstChild);

    // Reset input text box
    textInputBox.value = '';
}

// Function to handle marking a task as complete
function completeTask(event) {
    const buttonClicked = event.target;
    
    if (buttonClicked.matches('button') && buttonClicked.classList.contains('completeBtn')) {
        const taskItem = event.target.parentElement.parentElement;
        const taskText = taskItem.firstElementChild;
        const taskOptions = taskItem.lastElementChild;

        // Toggle the 'completed' CSS class
        taskText.classList.toggle('completed');

        // Remove buttons from task item
        taskItem.removeChild(taskOptions);

        // Move the task item to the completed tasks list
        const completedTasksList = document.getElementById('completed-tasks');
        completedTasksList.insertBefore(taskItem, completedTasksList.firstChild);
    }
}

// Function to handle deleting a task
function deleteTask(event) {
    const buttonClicked = event.target;
    if (buttonClicked.matches('button') && buttonClicked.classList.contains('deleteBtn')) {
        const taskItem = event.target.parentElement.parentElement;
        taskItem.remove();
    }
}

// Event listener for adding a new task
addBtn.addEventListener('click', addNewTask);

// Event listener for marking a task as complete
tasksList.addEventListener('click', completeTask);

// Event listener for deleting a task
tasksList.addEventListener('click', deleteTask);

/* ORIGINAL CODE
// HTML tag references
const textInputBox = document.getElementById('newTaskInput'); // New task input
const addBtn = document.getElementById('addBtn'); // Add button
const tasksList = document.getElementById('tasks'); // Tasks list


// Handle adding new task to list when 'Add' button is clicked
addBtn.addEventListener('click', () => {
    // Check if text box contains text
    if (textInputBox.value.length == 0) {
        alert('Text box is empty.')
        return;
    } else {
        // Create new task item <div>
        const newTask = document.createElement('div');
        newTask.classList.add('taskItem');
        
        // Create new task text <p>
        const taskText = document.createElement('p');
        taskText.classList.add('taskText');
        taskText.textContent = textInputBox.value;
        newTask.appendChild(taskText);

        // Create new taskOptions <div> (Complete & Delete)
        const taskOptions = document.createElement('div');
        taskOptions.classList.add('taskOptions');
        
        // Complete task button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('completeBtn');
        taskOptions.appendChild(completeBtn);
        
        // Delete task button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        taskOptions.appendChild(deleteBtn);
        
        // Append all newly created elements to tasks list
        newTask.appendChild(taskOptions);
        tasksList.appendChild(newTask);

        // Reset input text box
        textInputBox.value = '';
    }
});

// Handle marking a task as complete when Complete button is clicked
tasksList.addEventListener('click', (event) => {
    const buttonClicked = event.target;
    if (buttonClicked.matches('button') && buttonClicked.classList.contains('completeBtn')) {
        const taskText = event.target.parentElement.parentElement.firstElementChild;

        // Toggle the line-through style 
        if (taskText.style.textDecoration === "line-through") {
            taskText.style.textDecoration = "none";
        } else {
            taskText.style.textDecoration = "line-through";
        }
    }
});

// Handle deleting a task when Delete button is clicked
tasksList.addEventListener('click', (event) => {
    const buttonClicked = event.target;
    if (buttonClicked.matches('button') && buttonClicked.classList.contains('deleteBtn')) {
        const taskItem = event.target.parentElement.parentElement.remove();
    }
});
*/