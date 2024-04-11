/*  FUTURE FEATURES TO IMPLEMENT  */

// Use a form to handle task details input
// Edit mode for each task
// Separate list for deleted tasks
// Expand/Collapse lists
// Various views: day, 3 day, week, month
// Color themes, auto light/dark modes
// Filter, sort by
// Data persistence, local storage

/*  AI Prompts for DataAnnotation  */

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
// DONE: Show a gray border for low priority task items (default), yellow for medium, and red for high.
// DONE: Is it good practice to use a CSS class or update the styling in the script for this case?
// DONE: Create function that dynamically renders tasks list from tasks array (use iteration)

// DONE: How to get value of radio buttons
// DONE: New task not displaying priority color
// DONE: Use a more concise way to set the priority value within the definition of newTask object
// DONE: When I highlight text in the description textarea and click and hold while moving the cursor away from the container and let go, the new task options go away.
// DONE: When adding tags, add a hyphen in place of spaces for the tags input field
// DONE: Display x when hovering over a tag
// DONE: How to add event listeners to multiple elements (tags) to remove when clicked.
// DONE: Place the clearBtn inside the newTaskOptions input field
// DONE: Display newTaskOptions when text is entered in newTaskInput
// DONE: Set max length for description textarea
// DONE: Display red border when exceeds character limit
// DONE: Explain why the corners are missing, causes, etc.
// DONE: Character counter for description textarea

// DONE: Due to the hide/show new task options, when I click on alert box, it hides the new task options
// DONE: Would it have the same effect to use !target.classlist.contains('.completeBtn') and !target.classlist.contains('.deleteBtn')?

// Create side-by-side view of active tasks on left, selected task on the right

// Come up with prompt ideas for other JS topics
// Watch JS tutorials




// HTML tag references
const textInputBox = document.getElementById('newTaskInput'); // New task input
const clearBtn = document.getElementById('clearBtn'); // Clear button (x)
const addBtn = document.getElementById('addBtn'); // Add button

const newTaskOptions = document.getElementById('newTaskOptions'); // Options when adding new task (priority, description, tags)
const taskDescriptionInput = document.getElementById('taskDescriptionInput'); // Description textarea
const tagsInput = document.getElementById('tagsInput'); // Tag input textbox
const addTagBtn = document.getElementById('addTagBtn'); // Add tag button

const tasksList = document.getElementById('active-tasks'); // Tasks list
const completedTasksList = document.getElementById('completed-tasks'); // Completed tasks list

// Hide options initially
window.addEventListener('DOMContentLoaded', () => {
    newTaskOptions.style.display = 'none';
});

function addNewTask() {
    // Check if input text box contains a value
    if (textInputBox.value == "") {
        newTaskOptions.style.display = 'none';
        return;
    }

    if (taskDescriptionInput.value.length > 200) {
        alert('Description cannot be longer than 200 characters.');
        newTaskOptions.style.display = 'block';
        /*// Check if the input box still has text after the alert
        if (textInputBox.value.trim() !== '') {
            newTaskOptions.style.display = 'block';
        }*/

        return;
    }

    // Create a new task object
    const newTask = {
        name: textInputBox.value,
        description: taskDescriptionInput.value,
        priority: document.querySelector('input[name="priorityOptions"]:checked')?.value || "",
        tags: currentTags,
        isCompleted: false
    };

    // Add the new task object to the tasks array
    tasks.push(newTask);

    // Clear the input fields
    textInputBox.value = "";
    document.getElementById('low-priority').checked = false;
    document.getElementById('medium-priority').checked = false;
    document.getElementById('high-priority').checked = false;
    document.getElementById('taskDescriptionInput').value = "";
    document.getElementById('tagsInput').value = "";

    // Clear the currentTags array
    currentTags.length = 0;

    // Re-render the tasks
    renderTasks();

    // Re-render the cleared currentTags array
    renderCurrentTags();
}

// Returns name of CSS class
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

function addNewTag() {
    const tagsInput = document.getElementById('tagsInput');
    const tagName = tagsInput.value.trim(); // Remove unnecessary whitespace

    // Validate input: only letters and hyphens allowed
    if (!/^[a-zA-Z\s-]+$/.test(tagName)) {
        alert("Invalid input: Only letters and hyphens are allowed.");
        tagsInput.value = '';
        return;
    }

    // Replace spaces with hyphens and convert to lowercase
    const formattedTagName = tagName.replace(/\s+/g, '-').toLowerCase();

    if (formattedTagName !== '') {
        currentTags.push(formattedTagName);
        renderCurrentTags();
    }

    // Clear input field
    tagsInput.value = '';
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

// Render the tags from currentTags array into HTML
function renderCurrentTags() {
    const tagsInputList = document.getElementById('tagsInputList');
    tagsInputList.innerHTML = '';

    currentTags.forEach(tag => {
        const newTag = document.createElement('li');
        newTag.classList.add('tag');

        const tagText = document.createElement('span');
        tagText.classList.add('tag-text');
        tagText.textContent = tag;

        const removeIcon = document.createElement('span');
        removeIcon.classList.add('tag-remove');
        removeIcon.innerHTML = '&times;';
        removeIcon.addEventListener('click', () => {
            // Remove the tag from the currentTags array
            const index = currentTags.indexOf(tag);
            if (index !== -1) {
                currentTags.splice(index, 1);
                renderCurrentTags();
            }
        });

        newTag.appendChild(tagText);
        newTag.appendChild(removeIcon);
        tagsInputList.appendChild(newTag);
    });
}



// Add new task when add button is clicked
addBtn.addEventListener('click', addNewTask);

// Add new task when Enter key is pressed
textInputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewTask();
    }
});

// Display options when input box has text
textInputBox.addEventListener('input', () => {
    if (textInputBox.value.trim() !== '') {
        newTaskOptions.style.display = 'block';
    } else {
        newTaskOptions.style.display = 'none';
    }
});

// Hide options when the add button is clicked
document.getElementById('addBtn').addEventListener('click', () => {
    newTaskOptions.style.display = 'none';
});

// Hide options and clear button when the clear button is clicked
clearBtn.addEventListener('click', () => {
    textInputBox.value = '';
    newTaskOptions.style.display = 'none';
    clearBtn.style.display = 'none'; // Hide clear button
});

// Show clear button when needed (e.g., when input box has text)
textInputBox.addEventListener('input', () => {
    if (textInputBox.value.trim() !== '') {
        clearBtn.style.display = 'flex'; // Show clear button
    } else {
        clearBtn.style.display = 'none'; // Hide clear button
    }
});

// Update character count and display red border when input exceeds character limit
const currentCount = document.querySelector('.current-count'); // Character count element
taskDescriptionInput.addEventListener('input', () => {
    const count = taskDescriptionInput.value.length;
    currentCount.textContent = count;

    if (count > 200) {
        taskDescriptionInput.classList.add('max-length');
        currentCount.classList.add('max-length');
    } else {
        taskDescriptionInput.classList.remove('max-length');
        currentCount.classList.remove('max-length');
    }
});

// Add a new tag when add tag button is clicked
addTagBtn.addEventListener('click', addNewTag);

// Add a new tag when Enter key is pressed
tagsInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        addNewTag();
    }
});


// Show task details when task item is clicked
document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.closest('.taskItem') && !target.closest('.completeBtn') && !target.closest('.deleteBtn')) {
      const taskItem = target.closest('.taskItem');
      alert(taskItem.querySelector('.taskText').textContent);
    }
});

const currentTags = [];

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