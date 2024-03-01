// HTML tag references
const textInputBox = document.getElementById('newTaskInput'); // New task input
const addBtn = document.getElementById('addBtn'); // Add button
const tasksList = document.getElementById('tasks'); // Tasks list

function addNewTask() {
    // Check if text box contains text
    if (textInputBox.value.length == 0) {
        alert('Text box is empty.')
        return;
    } else {
        // Create new task item div
        const newTask = document.createElement('div');
        newTask.classList.add('taskItem');
        newTask.textContent = textInputBox.value;

        // Create new taskOptions div (Complete & Delete)
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
        
        newTask.appendChild(taskOptions);
        tasksList.appendChild(newTask);
        textInputBox.value = ''; // Reset input text box
    }
}


// Handle adding new task to list when 'Add' button is clicked
addBtn.addEventListener('click', addNewTask);

// 