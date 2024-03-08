// DONE: How to access grandparent of an element and edit a node with no HTML tag
// ^^^ write it using an event handler
// What are some ways I can normalize a CSS file to ensure prevent cross-browser issues?
// How do I use DOMContentLoaded, give me an example
// Refactor code to use functions and instead of having function logic in the body of addEventListener()
// Use a form to handle input???


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