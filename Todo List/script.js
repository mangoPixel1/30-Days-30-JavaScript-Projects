// HTML tag references
const textInputBox = document.getElementById('newTaskInput'); // New task input
const clearBtn = document.getElementById('clearBtn'); // Clear button (x)
const addBtn = document.getElementById('addBtn'); // Add button

const newTaskOptions = document.getElementById('newTaskOptions'); // Options when adding new task (priority, description, tags)
const taskDescriptionInput = document.getElementById('taskDescriptionInput'); // Description textarea
const tagsInput = document.getElementById('tagsInput'); // Tag input textbox
const addTagBtn = document.getElementById('addTagBtn'); // Add tag button

const activeTasksList = document.getElementById('active-tasks'); // Tasks list
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

function renderTasks() {
    const activeTasksList = document.getElementById('active-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    // Clear existing tasks
    activeTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Iterate over the tasks array
    tasks.forEach(task => {
        // Create task item element
        const taskItem = createTaskItem(task);

        // Get the task options element
        const taskOptions = taskItem.querySelector('.taskOptions');

        if (task.isCompleted) {
            // Task is completed
            taskItem.classList.add('completed');

            // Create undo button
            const undoBtn = document.createElement('button');
            undoBtn.classList.add('undoBtn');
            undoBtn.textContent = 'Undo';
            taskOptions.appendChild(undoBtn);
        } else {
            // Task is active
            // Create complete button
            const completeBtn = document.createElement('button');
            completeBtn.classList.add('completeBtn');
            completeBtn.textContent = 'Complete';
            taskOptions.appendChild(completeBtn);
        }

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'Delete';
        taskOptions.appendChild(deleteBtn);

        // Append task item to the appropriate list based on completion status
        if (task.isCompleted) {
            completedTasksList.appendChild(taskItem);
        } else {
            activeTasksList.appendChild(taskItem);
        }
    });
}

function createTaskItem(task) {
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
    taskItem.appendChild(taskOptions);

    return taskItem;
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

// array named 'tasks' holds task objects with their data (name, description, priority, tags, isCompleted)
// array named 'completedTasks' is same as above except it holds the completed tasks that are not in activeTasksList
// renderTasks() generates elements from tasks array

function completeTask(taskItem) {
    // Find the corresponding task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.name === taskItem.querySelector('.taskText').textContent);

    if (taskIndex !== -1) {
        // Set isCompleted to true for the task
        tasks[taskIndex].isCompleted = true;
    }
}

function deleteTask(taskItem) {
    const taskName = taskItem.querySelector('.taskText').textContent;

    // Find the corresponding task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.name === taskName);

    // Remove the task object from tasks array
    tasks.splice(taskIndex, 1);
}

function undoTask(taskItem) {
    // Find the corresponding task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.name === taskItem.querySelector('.taskText').textContent);

    if (taskIndex !== -1) {
        // Set isCompleted to false for the task
        tasks[taskIndex].isCompleted = false;
    }
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

// Handle complete/delete button clicks on ACTIVE tasks
activeTasksList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        if (event.target.classList.contains('deleteBtn')) {
            const taskItem = event.target.closest('.taskItem'); // Gets selected task
            deleteTask(taskItem);
        } else if (event.target.classList.contains('completeBtn')) {
            const taskItem = event.target.closest('.taskItem'); // Gets selected task
            completeTask(taskItem);
        }
        
        renderTasks();
    }
});

// Handle delete and undo button clicks on COMPLETED tasks
completedTasksList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const taskItem = event.target.closest('.taskItem'); // Gets selected task

        if (event.target.classList.contains('deleteBtn')) {
            deleteTask(taskItem);
        } else if (event.target.classList.contains('undoBtn')) {
            undoTask(taskItem);
        }

        renderTasks();
    }
});


/*// Show task details when task item is clicked
document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.closest('.taskItem') && !target.closest('.completeBtn') && !target.closest('.deleteBtn')) {
      const taskItem = target.closest('.taskItem');
      alert(taskItem.querySelector('.taskText').textContent);
    }
});*/

const currentTags = [];
const tasks = [
    {
        name: 'Task 1',
        description: 'Complete project proposal',
        priority: 'high',
        tags: ['work', 'project'],
        isCompleted: false
      },
];
const completedTasks = [];

renderTasks();

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