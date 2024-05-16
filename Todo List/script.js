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

// Generates a unique id by checking if the newly created id is already in use by another task
function generateUniqueId(tasks) {
    while (true) { // Keep looping until a unique ID is found
      const newId = Math.floor(Math.random() * 900000) + 100000; // 6-digit random number
  
      // Check if the ID is already in use:
      const idExists = tasks.some(task => task.id === newId);
  
      if (!idExists) {
        return newId; // Found a unique ID, return it
      }
    }
}

function addNewTask() {
    // Check if input text box contains a value
    if (textInputBox.value == "") {
        newTaskOptions.style.display = 'none';
        return;
    }

    if (taskDescriptionInput.value.length > 200) {
        alert('Description cannot be longer than 200 characters.');
        newTaskOptions.style.display = 'block';
        return;
    }

    // Create a new task object
    const now = new Date(); // Get the current date and time

    // Create a new task object
    const newTask = {
        id: generateUniqueId(tasks),
        name: textInputBox.value,
        description: taskDescriptionInput.value,
        priority: document.querySelector('input[name="priorityOptions"]:checked')?.value || "",
        tags: [...currentTags],
        isCompleted: false,
        timeStamp: now,
        isExpanded: false
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

    // Hide the newTaskOptions div
    newTaskOptions.style.display = 'none';

    // Re-render the tasks
    renderTasks();

    // Re-render the cleared currentTags array
    renderCurrentTags();

    
}

// Get the name of the CSS class
const priorityClassMap = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
};
const getPriorityColor = (priority) => priorityClassMap[priority] || "priority-default";

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
    if (filteredTasks.length === 0) {
        // No filter applied, render all tasks
        const activeTasksList = document.getElementById('active-tasks');
        const completedTasksList = document.getElementById('completed-tasks');

        activeTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = createTaskItem(task);
            if (task.isCompleted) {
                completedTasksList.appendChild(taskItem);
            } else {
                activeTasksList.appendChild(taskItem);
            }
        });
    } else {
        // Filter applied, render filtered tasks
        renderFilteredTasks();
    }

    updateDividerVisibility();
}

function createTaskItem(task) {
    // Create task item element
    const taskItem = document.createElement('li');
    taskItem.classList.add('taskItem');

    // Show/hide details based on current state
    if (task.isExpanded) {
        taskItem.classList.add('show-details');
    }

    // Add a CSS class based on the task priority
    const priorityClass = getPriorityColor(task.priority);
    taskItem.classList.add(priorityClass);

    // Create task content element
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskItem.appendChild(taskContent);

    // Create label element
    const label = document.createElement('label');
    taskContent.appendChild(label);

    // Create checkbox element
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('completeCheckbox');
    checkbox.checked = task.isCompleted;
    label.appendChild(checkbox);

    // Add change event listener to the checkbox
    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        if (isChecked) {
            completeTask(task.id);
        } else {
            undoTask(task.id);
        }
        renderTasks();
    });

    // Create task text element
    const taskText = document.createElement('span');
    taskText.classList.add('taskText');
    taskText.textContent = task.name;
    label.appendChild(taskText);

    // Create task options element
    const taskOptions = document.createElement('div');
    taskOptions.classList.add('taskOptions');
    taskContent.appendChild(taskOptions);

    // Create task edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('editBtn');

    // Create Font Awesome options button
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');

    editBtn.appendChild(editIcon);
    taskOptions.appendChild(editBtn);

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');

    // Create Font Awesome trash icon
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid', 'fa-trash');

    deleteBtn.appendChild(trashIcon);
    taskOptions.appendChild(deleteBtn);

    // Add click event listener to the delete button
    deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
        renderTasks();
    });

    // Add click event listener to the task-content div to expand/collapse task
    taskContent.addEventListener('click', (event) => {
        // Check if the clicked element is not a button, checkbox, task text, or edit button
        if (
            !event.target.matches('button') &&
            !event.target.matches('input[type="checkbox"]') &&
            !event.target.matches('.taskText') &&
            !event.target.closest('.editBtn')
        ) {
            // Toggle the isExpanded property of the task
            task.isExpanded = !task.isExpanded;

            // Toggle the 'show-details' class on the taskItem to show/hide task details
            taskItem.classList.toggle('show-details');
        }
    });

    // Create task details element
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskItem.appendChild(taskDetails);

    // Create task description element
    const taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = task.description;
    taskDetails.appendChild(taskDescription);

    // Create tags list element
    const tagsList = document.createElement('ul');
    tagsList.classList.add('tags-list');
    taskDetails.appendChild(tagsList);

    // Iterate over the task tags and create tag elements
    task.tags.forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.textContent = tag;
        tagsList.appendChild(tagItem);
    });

    // Create timestamp element
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    timestamp.textContent = task.timeStamp.toLocaleString(); // Format the timestamp as desired
    taskDetails.appendChild(timestamp);

    return taskItem;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the formatting as needed
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

// array named 'tasks' holds task objects with their data (id, name, description, priority, tags, isCompleted)
// array named 'completedTasks' is same as above except it holds the completed tasks that are not in activeTasksList
// renderTasks() generates elements from tasks array

// Moves an active task to completed tasks list
function completeTask(taskId) {
    // Find the corresponding task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId, 10));

    if (taskIndex !== -1) {
        // Set isCompleted to true for the task
        tasks[taskIndex].isCompleted = true;

        // Set isExpanded to false for the completed task
        tasks[taskIndex].isExpanded = false;
    }
}

// Removes a task from the DOM
function deleteTask(taskId) {
    // Find the corresponding task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId, 10));

    // Remove the task object from tasks array
    if (taskIndex !== -1) { // Check if found
        tasks.splice(taskIndex, 1);
    }
}

// Moves completed task to active tasks list
function undoTask(taskId) {
    // Find the corresponding task object in the tasks array
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId, 10));

    if (taskIndex !== -1) {
        // Set isCompleted to false for the task
        tasks[taskIndex].isCompleted = false;
        
        // Set isExpanded to false for the completed task
        tasks[taskIndex].isExpanded = false;
    }
}

// Shows divider between active and completed tasks list when completed tasks list has tasks, hides otherwise
function updateDividerVisibility() {
    const completedTasksList = document.getElementById('completed-tasks');
    const listDivider = document.querySelector('.divider');
    
    if (completedTasksList.children.length > 0) {
        listDivider.style.display = 'block';
    } else {
        listDivider.style.display = 'none';
    }
}

// Function to filter tasks based on selected priority
function filterTasksByPriority(priority) {
    filteredTasks.length = 0; // Clear the filteredTasks array

    if (priority === '') {
        filteredTasks.push(...tasks.filter(task => !task.isCompleted));
    } else {
        const filtered = tasks.filter(task => {
            if (priority === 'default') {
                return (task.priority === '' || task.priority === 'default') && !task.isCompleted;
            } else {
                return task.priority === priority && !task.isCompleted;
            }
        });
        filteredTasks.push(...filtered);
    }
    renderFilteredTasks();
}

function renderFilteredTasks() {
    const activeTasksList = document.getElementById('active-tasks');
    activeTasksList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskItem = createTaskItem(task);
        activeTasksList.appendChild(taskItem);
    });

    updateDividerVisibility();
}

// Add new task when Add button is clicked
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

// Get references to the buttons
const expandAllBtn = document.getElementById('expand-all');
const collapseAllBtn = document.getElementById('collapse-all');

// Event listener for the "Expand All" button
expandAllBtn.addEventListener('click', () => {
    tasks.forEach(task => {
        task.isExpanded = true;
    });
    renderTasks();
});

// Event listener for the "Collapse All" button
collapseAllBtn.addEventListener('click', () => {
    tasks.forEach(task => {
        task.isExpanded = false;
    });
    renderTasks();
});

// Get reference to the filter dropdown and reset button
const filterDropdown = document.getElementById('filter-dropdown');
const resetButton = document.getElementById('reset-toolbar');
const filteredTasks = [];

// Add event listener to the filter dropdown
filterDropdown.addEventListener('change', () => {
    const selectedPriority = filterDropdown.value;
    filterTasksByPriority(selectedPriority);
});

// Add event listener to the reset button
/*resetButton.addEventListener('click', () => {
    filterDropdown.value = ''; // Reset the dropdown selection
    renderTasks(); // Re-render all tasks
});*/
resetButton.addEventListener('click', () => {
    filterDropdown.value = ''; // Reset the dropdown selection
    filteredTasks.length = 0; // Clear the filteredTasks array
    tasks.forEach(task => {
        task.isExpanded = false; // Collapse all tasks
    });
    renderTasks(); // Re-render all tasks
});

const currentTags = [];
const currentTime = new Date(); // Get the current date and time
const tasks = [
    {
        id: 100000,
        name: "shower",
        description: "quick 5 minute shower",
        priority: "low",
        tags: ["hygiene"],
        isCompleted: false,
        timeStamp: currentTime,
        isExpanded: false
    },
    {
        id: 100001,
        name: "eat breakfast",
        description: "oatmeal and protein shake",
        priority: "high",
        tags: ["meal", "breakfast"],
        isCompleted: false,
        timeStamp: currentTime,
        isExpanded: false
    },
    {
        id: 100002,
        name: "watch react course",
        description: "LearnWebCode 10 Days of React",
        priority: "medium",
        tags: ["coding", "course", "react", "study"],
        isCompleted: false,
        timeStamp: currentTime,
        isExpanded: false
    },
    {
        id: 100003,
        name: "ride bike",
        description: "5 mile ride around the neighborhood",
        priority: "default",
        tags: ["exercise", "recreation", "outdoors"],
        isCompleted: false,
        timeStamp: currentTime,
        isExpanded: false
    }
];
const completedTasks = [];

renderTasks();
updateDividerVisibility();