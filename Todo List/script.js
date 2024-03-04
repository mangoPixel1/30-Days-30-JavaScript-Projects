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
        
        // Append all newly created elements to tasks list
        newTask.appendChild(taskOptions);
        tasksList.appendChild(newTask);

        // Reset input text box
        textInputBox.value = '';
    }
}

// Handle adding new task to list when 'Add' button is clicked
addBtn.addEventListener('click', addNewTask);

// Mark items as completed/deleted when Complete/Delete button is clicked
tasksList.addEventListener('click', (event) => {
    const buttonClicked = event.target;
    if (buttonClicked.matches('button')) {
        if (buttonClicked.classList.contains('completeBtn')) {
            // Access parent element
            //buttonClicked.classList.toggle('completed');
            alert('Task completed')
        } else if (buttonClicked.classList.contains('deleteBtn')) {
            alert('Task deleted');
        }
        
    } 
});
