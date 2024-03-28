// Use a form to handle task details input
// Edit mode for each task
// Separate list for deleted tasks
// Expand/Collapse lists
// Various views: day, 3 day, week, month
// Color themes, auto light/dark modes
// Filter, sort by
// Data persistence, local storage

// DONE: Refactor code to use functions and instead of having function logic in the body of addEventListener()
// DONE: Convert complete task functionality using the toggle() method for the class "complete"
// DONE: Create a new section in the HTML for the completed tasks
// DONE: Modify the addNewTask function to add the task to the beginning of the list
// DONE: Without providing code, give me an approach to move the completed items to the completed-tasks <div>
// TIP: Use simpler examples to avoid copy/pasting entire code
// DONE: How to add a new task by pressing enter key
// DONE: My code editor is telling me that event.keycode is deprecated
// DONE: Change divs: active tasks to <ul>; task items to <li>, keep the same classes
// DONE: Suggest approach for implementing complex tasks: name, description, priority, tags, isCompleted
// Show a gray border for low priority task items (default), yellow for medium, and red for high.
// What approach could I use to identify the items in the HTML and find corresponding object?

// IS IT good practice TO USE A CSS CLASS OR UPDATE THE STYLING IN THE SCRIPT FOR THIS CASE?

// Step 1: Create function that dynamically renders tasks list from tasks array (use iteration)


// HTML tag references
const textInputBox = document.getElementById('newTaskInput'); // New task input
const addBtn = document.getElementById('addBtn'); // Add button
const newTaskOptions = document.getElementById('newTaskOptions');

const tasksList = document.getElementById('active-tasks'); // Tasks list
const completedTasksList = document.getElementById('completed-tasks'); // Completed tasks list

function addNewTask() {
    // Check if input text box contains a value
    if (textInputBox.value == "") {
        return;
    }
    // Create a new task object
    const newTask = {
        name: textInputBox.value,
        description: "",
        priority: "",
        tags: [],
        isCompleted: false
    };

    // Add the new task object to the tasks array
    tasks.push(newTask);

    // Clear the input box
    textInputBox.value = "";

    // Re-render the tasks
    renderTasks();

}

function getPriorityColor(priority) {
    switch (priority) {
        case "low":
            return "priority-low";
        case "medium":
            return "priority-medium";
        case "high":
            return "priority-high";
        default:
            return "priority-default";
    }
}

// Render the tasks from array into HTML elements
function renderTasks() {
    const activeTasksList = document.getElementById('active-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
  
    // Clear existing tasks
    activeTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
  
    // Iterate over the tasks array
    tasks.forEach(task => {
        // Create task item element
        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');

        // Add a CSS class based on the task priority
        const priorityClass = getPriorityColor(task.priority);
        taskItem.classList.add(priorityClass);
  
        // Create task text element
        const taskText = document.createElement('p');
        taskText.classList.add('taskText');
        taskText.textContent = task.name;
        taskItem.appendChild(taskText);
    
        // Create task options element
        const taskOptions = document.createElement('div');
        taskOptions.classList.add('taskOptions');
    
        // Create complete button
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('completeBtn');
        completeBtn.textContent = 'Complete';
        taskOptions.appendChild(completeBtn);
    
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Delete';
        taskOptions.appendChild(deleteBtn);
    
        taskItem.appendChild(taskOptions);
    
        // Append task item to the appropriate list based on completion status
        if (task.isCompleted) {
            taskItem.classList.toggle('completed');
            taskItem.lastChild.remove();
            completedTasksList.appendChild(taskItem);
        } else {
            activeTasksList.appendChild(taskItem);
        }
    });
}



// Add new task when add button is clicked
addBtn.addEventListener('click', addNewTask);

// Display options when input box is selected
textInputBox.addEventListener('focus', () => {
    newTaskOptions.style.display = 'block';
});
// Hide options when input box is NOT selected
document.addEventListener('click', function(event) {
    const target = event.target;
    if (!newTaskOptions.contains(target) && target !== newTaskInput) {
      newTaskOptions.style.display = 'none';
    }
});

const tasks = [
    /*{
        name: "Buy groceries",
        description: "Get milk, bread, eggs, and vegetables from the supermarket",
        priority: "medium",
        tags: ["shopping", "household"],
        isCompleted: false
    },
    {
        name: "Finish project report",
        description: "Complete the project report and submit it to the manager",
        priority: "high",
        tags: ["work", "urgent"],
        isCompleted: false
    },
    {
        name: "Call dentist",
        description: "Schedule a dental checkup appointment",
        priority: "low",
        tags: ["health", "personal"],
        isCompleted: true
    },
    {
        name: "Clean the house",
        description: "Vacuum the floors, dust the furniture, and do the laundry",
        priority: "medium",
        tags: ["household", "cleaning"],
        isCompleted: false
    },
    {
        name: "Go for a run",
        description: "Run 5 kilometers in the park",
        priority: "low",
        tags: ["exercise", "health"],
        isCompleted: false
    }*/
];

renderTasks();

/*
// Function to handle adding a new task to the list
function addNewTask() {
    // Check if text box contains text
    if (textInputBox.value.length === 0) {
        alert('Text box is empty.');
        return;
    }

    // Create new task item <div>
    const newTask = document.createElement('li');
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

// Event listener for adding a new task (Add button)
addBtn.addEventListener('click', addNewTask);

// Event listener for adding a new task (Enter key press)
textInputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewTask();
    }
});

// Event listener for marking a task as complete
tasksList.addEventListener('click', completeTask);

// Event listener for deleting a task
tasksList.addEventListener('click', deleteTask);
*/