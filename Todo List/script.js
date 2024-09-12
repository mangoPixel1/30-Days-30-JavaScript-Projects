// Input-related variables
const textInputBox = document.getElementById("newTaskInput");
const clearBtn = document.getElementById("clearBtn");
const addBtn = document.getElementById("addBtn");
const newTaskOptions = document.getElementById("newTaskOptions");
const taskDescriptionInput = document.getElementById("taskDescriptionInput");
const currentCount = document.querySelector(".current-count");
const tagsInput = document.getElementById("tagsInput");
const addTagBtn = document.getElementById("addTagBtn");

// Task list variables
const activeTasksList = document.getElementById("active-tasks");
const completedTasksList = document.getElementById("completed-tasks");

// Toolbar variables
const expandAllBtn = document.getElementById("expand-all");
const collapseAllBtn = document.getElementById("collapse-all");
const filterDropdown = document.getElementById("filter-dropdown");
const resetButton = document.getElementById("reset-toolbar");

// Data variables
const tasks = JSON.parse(localStorage.getItem("tasksArr")) || [];
const currentTags = [];
const filteredTasks = [];

// Generates a unique id by checking if the newly created id is already in use by another task

function generateUniqueId(tasks) {
	const generateRandomId = () => Math.floor(Math.random() * 900000) + 100000;

	const isIdUnique = id => !tasks.some(task => task.id === id);

	let newId;
	do {
		newId = generateRandomId();
	} while (!isIdUnique(newId));

	console.log(`newID: ${newId}`);
	return newId;
}

function addNewTask() {
	// Check if input text box contains a value
	if (textInputBox.value == "") {
		newTaskOptions.style.display = "none";
		return;
	}

	if (taskDescriptionInput.value.length > 200) {
		alert("Description cannot be longer than 200 characters.");
		newTaskOptions.style.display = "block";
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
	document.getElementById("low-priority").checked = false;
	document.getElementById("medium-priority").checked = false;
	document.getElementById("high-priority").checked = false;
	document.getElementById("taskDescriptionInput").value = "";
	document.getElementById("tagsInput").value = "";

	// Clear the currentTags array
	currentTags.length = 0;

	// Hide the newTaskOptions div
	newTaskOptions.style.display = "none";

	// Re-render the tasks
	renderTasks();

	// Re-render the cleared currentTags array
	renderCurrentTags();
}

// Get the name of the CSS class
const priorityClassMap = {
	low: "priority-low",
	medium: "priority-medium",
	high: "priority-high"
};
const getPriorityColor = priority => priorityClassMap[priority] || "priority-default";

function addNewTag() {
	const tagsInput = document.getElementById("tagsInput");
	const tagName = tagsInput.value.trim();

	// Regular expression to check if tagName meets length criteria (2 to 12 characters)
	const tagLengthRegex = /^.{2,12}$/;

	if (!tagLengthRegex.test(tagName)) {
		alert("Tag name must be between 2 and 12 characters long.");
		tagsInput.value = "";
		return;
	}

	// Initialize invalidChars to hold any invalid characters found in tagName
	// The regular expression matches any character that is not a letter, number, hyphen, or space
	const invalidChars = tagName.match(/[^a-zA-Z0-9\-\s]/g);

	if (invalidChars) {
		const uniqueInvalidChars = [...new Set(invalidChars)].join(", ");
		alert(`Invalid character(s) found: ${uniqueInvalidChars}\nOnly letters, numbers, hyphens, and spaces are allowed.`);
		tagsInput.value = "";
		return;
	}

	// Initialize formattedTagName to be the modified tag name
	// The regular expression replaces all spaces with hyphens and converts the string to lowercase
	const formattedTagName = tagName.replace(/\s/g, "-").toLowerCase();

	if (formattedTagName !== "") {
		// Check if the tag already exists in currentTags
		if (!currentTags.includes(formattedTagName)) {
			currentTags.push(formattedTagName);
			renderCurrentTags();
		} else {
			alert("This tag has already been added.");
		}
	}

	tagsInput.value = "";
}

function renderTasks() {
	if (filteredTasks.length === 0) {
		// No filter or search applied, render all tasks
		const activeTasksList = document.getElementById("active-tasks");
		const completedTasksList = document.getElementById("completed-tasks");

		activeTasksList.innerHTML = "";
		completedTasksList.innerHTML = "";

		tasks.forEach(task => {
			const taskItem = createTaskItem(task);
			if (task.isCompleted) {
				completedTasksList.appendChild(taskItem);
			} else {
				activeTasksList.appendChild(taskItem);
			}
		});
	} else {
		// Filter or search applied, render filtered tasks
		renderFilteredTasks();
	}

	updateDividerVisibility();
}

function renderFilteredTasks() {
	const activeTasksList = document.getElementById("active-tasks");
	activeTasksList.innerHTML = "";

	filteredTasks.forEach(task => {
		const taskItem = createTaskItem(task);
		activeTasksList.appendChild(taskItem);
	});

	updateDividerVisibility();
}

function createTaskItem(task) {
	// Create task item element
	const taskItem = document.createElement("li");
	taskItem.classList.add("taskItem");

	// Show/hide details based on current state
	if (task.isExpanded) {
		taskItem.classList.add("show-details");
	}

	// Completed task is grayed out with a line-through on the task text
	if (task.isCompleted) {
		taskItem.classList.add("completed");
	}

	// Add a CSS class based on the task priority
	const priorityClass = getPriorityColor(task.priority);
	taskItem.classList.add(priorityClass);

	// Create task content element
	const taskContent = document.createElement("div");
	taskContent.classList.add("task-content");
	taskItem.appendChild(taskContent);

	// Create checkbox wrapper element
	const checkboxWrapper = document.createElement("div");
	checkboxWrapper.classList.add("checkbox-wrapper");
	taskContent.appendChild(checkboxWrapper);

	// Create checkbox element
	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.classList.add("completeCheckbox");
	checkbox.checked = task.isCompleted;
	checkboxWrapper.appendChild(checkbox);

	// Add change event listener to the checkbox
	checkbox.addEventListener("change", () => {
		const isChecked = checkbox.checked;
		if (isChecked) {
			completeTask(task.id);
		} else {
			undoTask(task.id);
		}
		renderTasks();
	});

	// Create task text element
	const taskText = document.createElement("span");
	taskText.classList.add("taskText");
	taskText.textContent = task.name;
	taskContent.appendChild(taskText);

	// Create tags count element
	const tagsCount = document.createElement("span");
	tagsCount.classList.add("tagsCount");
	tagsCount.setAttribute("data-count", task.tags.length);
	tagsCount.title = "Tags";
	taskContent.appendChild(tagsCount);

	// Create task options element
	const taskOptions = document.createElement("div");
	taskOptions.classList.add("taskOptions");
	taskContent.appendChild(taskOptions);

	// Create show details button
	const showDetailsBtn = document.createElement("button");
	showDetailsBtn.classList.add("showDetailsBtn");
	showDetailsBtn.title = "Show details";

	// Create Font Awesome show details EXPAND icon
	const showDetailsExpandIcon = document.createElement("i");
	showDetailsExpandIcon.classList.add("fa-solid", "fa-chevron-down");

	// Create Font Awesome show details COLLAPSE icon
	const showDetailsCollapseIcon = document.createElement("i");
	showDetailsCollapseIcon.classList.add("fa-solid", "fa-chevron-up");

	// Show details button icon based on current state
	if (task.isExpanded) {
		showDetailsBtn.appendChild(showDetailsCollapseIcon);
	} else {
		showDetailsBtn.appendChild(showDetailsExpandIcon);
	}

	taskOptions.appendChild(showDetailsBtn);

	// Add click event listener to the show details button to expand/collapse the task
	showDetailsBtn.addEventListener("click", () => {
		// Toggle the isExpanded property of the task
		task.isExpanded = !task.isExpanded;

		// Toggle the 'show-details' class on the taskItem to show/hide task details
		taskItem.classList.toggle("show-details");

		// Display the appropriate icon for the show details button
		if (task.isExpanded) {
			showDetailsBtn.removeChild(showDetailsExpandIcon);
			showDetailsBtn.appendChild(showDetailsCollapseIcon);
		} else {
			showDetailsBtn.removeChild(showDetailsCollapseIcon);
			showDetailsBtn.appendChild(showDetailsExpandIcon);
		}
	});

	// Create task edit button
	const editBtn = document.createElement("button");
	editBtn.classList.add("editBtn");
	editBtn.title = "Edit";

	// Create Font Awesome edit icon
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa-solid", "fa-pen-to-square");

	editBtn.appendChild(editIcon);
	taskOptions.appendChild(editBtn);

	editBtn.addEventListener("click", event => {
		event.stopPropagation();
		handleEditButtonClick(task, taskText, editBtn);
	});

	// Create delete button
	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("deleteBtn");
	deleteBtn.title = "Delete";

	// Create Font Awesome trash icon
	const trashIcon = document.createElement("i");
	trashIcon.classList.add("fa-solid", "fa-trash");

	deleteBtn.appendChild(trashIcon);
	taskOptions.appendChild(deleteBtn);

	// Add click event listener to the delete button
	deleteBtn.addEventListener("click", () => {
		deleteTask(task.id);
		renderTasks();
	});

	// Create task details element
	const taskDetails = document.createElement("div");
	taskDetails.classList.add("task-details");
	taskItem.appendChild(taskDetails);

	// Create task description element
	const taskDescription = document.createElement("p");
	taskDescription.classList.add("task-description");
	taskDescription.textContent = task.description;
	taskDetails.appendChild(taskDescription);

	// Create tags list element
	const tagsList = document.createElement("ul");
	tagsList.classList.add("tags-list");
	taskDetails.appendChild(tagsList);

	// Iterate over the task tags and create tag elements
	task.tags.forEach(tag => {
		const tagItem = document.createElement("li");
		tagItem.textContent = tag;
		tagsList.appendChild(tagItem);
	});

	// Create timestamp element
	/* DO NOT DELETE!!!!!!!!!!!    const timestamp = document.createElement("span");
	timestamp.classList.add("timestamp");
	timestamp.textContent = formatTimestamp(task.timeStamp);
	taskDetails.appendChild(timestamp);*/

	const timestamp = document.createElement("span");
	timestamp.classList.add("timestamp");
	const formattedTimeStamp = formatTimeStamp(task.timeStamp);
	timestamp.textContent = formattedTimeStamp;
	taskDetails.appendChild(timestamp);

	return taskItem;
}

/* DO NOT DELETE!!!!!!!!!!!    function formatTimestamp(timestamp) {
	const date = new Date(timestamp);
	const options = {
		dateStyle: "medium", // or 'long', 'medium', 'short'
		timeStyle: "short" // or 'long', 'medium'
	};
	return date.toLocaleString(undefined, options);
}*/

function formatTimeStamp(timestamp) {
	const options = {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true
	};

	const formattedTimeStamp = new Date(timestamp).toLocaleTimeString(undefined, options);
	return formattedTimeStamp;
}

function handleEditButtonClick(task, taskText, editBtn) {
	const inputField = document.createElement("input");
	inputField.type = "text";
	inputField.value = task.name;
	inputField.classList.add("edit-input");

	// Set the input field's width to match the task text's width
	inputField.style.width = `${taskText.offsetWidth}px`;

	taskText.replaceWith(inputField);
	inputField.focus();

	const handleBlur = () => {
		const newTaskName = inputField.value.trim();
		task.name = newTaskName || task.name;
		renderTasks();
	};

	inputField.addEventListener("blur", handleBlur);
	inputField.addEventListener("keydown", event => {
		if (event.key === "Enter") {
			inputField.blur();
		}
	});
}

// Render the tags from currentTags array into HTML
function renderCurrentTags() {
	const tagsInputList = document.getElementById("tagsInputList");
	tagsInputList.innerHTML = "";

	currentTags.forEach(tag => {
		const newTag = document.createElement("li");
		newTag.classList.add("tag");

		const tagText = document.createElement("span");
		tagText.classList.add("tag-text");
		tagText.textContent = tag;

		const removeIcon = document.createElement("span");
		removeIcon.classList.add("tag-remove");
		removeIcon.innerHTML = "&times;";
		removeIcon.addEventListener("click", () => {
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
	if (taskIndex !== -1) {
		// Check if found
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
	const completedTasksList = document.getElementById("completed-tasks");
	const listDivider = document.querySelector(".divider");

	if (completedTasksList.children.length > 0) {
		listDivider.style.display = "block";
	} else {
		listDivider.style.display = "none";
	}
}

// Function to filter tasks based on selected priority
function filterTasksByPriority(priority) {
	filteredTasks.length = 0; // Clear the filteredTasks array

	if (priority === "") {
		filteredTasks.push(...tasks.filter(task => !task.isCompleted));
	} else {
		const filtered = tasks.filter(task => {
			if (priority === "default") {
				return (task.priority === "" || task.priority === "default") && !task.isCompleted;
			} else {
				return task.priority === priority && !task.isCompleted;
			}
		});
		filteredTasks.push(...filtered);
	}
	renderFilteredTasks();
}

// Search by tag variables
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Add event listener to the search button
/*searchBtn.addEventListener("click", searchByTag);

// Add event listener to the search input for pressing Enter key
searchInput.addEventListener("keydown", event => {
	if (event.key === "Enter" || event.keyCode === 13) {
		searchByTag();
	}
});*/

if (searchBtn) {
	searchBtn.addEventListener("click", searchByTag);
}

// Add event listener to the search input for pressing Enter key
if (searchInput) {
	searchInput.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.keyCode === 13) {
			searchByTag();
		}
	});
}

function searchByTag() {
	const searchTerm = searchInput.value.trim().toLowerCase();

	if (searchTerm !== "") {
		const matchingTasks = tasks.filter(task => {
			return task.tags.includes(searchTerm);
		});

		filteredTasks.length = 0;
		filteredTasks.push(...matchingTasks);
		renderFilteredTasks();
	} else {
		filteredTasks.length = 0;
		renderTasks();
	}
}

// Set up event listeners
function setupInputListeners() {
	// Add new task when Add button is clicked
	addBtn.addEventListener("click", addNewTask);

	// Add new task when Enter key is pressed
	textInputBox.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.keyCode === 13) {
			addNewTask();
		}
	});

	// Display options when input box has text
	textInputBox.addEventListener("input", () => {
		if (textInputBox.value.trim() !== "") {
			newTaskOptions.style.display = "block";
		} else {
			newTaskOptions.style.display = "none";
		}
	});

	// Hide options and clear button when the clear button is clicked
	clearBtn.addEventListener("click", () => {
		newTaskOptions.style.display = "none";
		clearBtn.style.display = "none";

		// Clear the input fields
		textInputBox.value = "";
		document.getElementById("low-priority").checked = false;
		document.getElementById("medium-priority").checked = false;
		document.getElementById("high-priority").checked = false;
		document.getElementById("taskDescriptionInput").value = "";
		document.getElementById("tagsInput").value = "";
		currentTags.length = 0;
	});

	// Show clear button when needed (e.g., when input box has text)
	textInputBox.addEventListener("input", () => {
		if (textInputBox.value.trim() !== "") {
			clearBtn.style.display = "flex";
		} else {
			clearBtn.style.display = "none";
		}
	});

	// Update character count and display red border when input exceeds character limit
	const currentCount = document.querySelector(".current-count"); // Character count element
	taskDescriptionInput.addEventListener("input", () => {
		const count = taskDescriptionInput.value.length;
		currentCount.textContent = count;

		if (count > 200) {
			taskDescriptionInput.classList.add("max-length");
			currentCount.classList.add("max-length");
		} else {
			taskDescriptionInput.classList.remove("max-length");
			currentCount.classList.remove("max-length");
		}
	});

	// Add a new tag when add tag button is clicked
	addTagBtn.addEventListener("click", addNewTag);

	// Add a new tag when Enter key is pressed
	tagsInput.addEventListener("keydown", event => {
		if (event.key === "Enter" || event.keyCode === 13) {
			addNewTag();
		}
	});
}
function setupToolbarListeners() {
	// Event listener for the "Expand All" button
	expandAllBtn.addEventListener("click", () => {
		tasks.forEach(task => {
			task.isExpanded = true;
		});
		renderTasks();
	});

	// Event listener for the "Collapse All" button
	collapseAllBtn.addEventListener("click", () => {
		tasks.forEach(task => {
			task.isExpanded = false;
		});
		renderTasks();
	});

	// Add event listener to the filter dropdown
	filterDropdown.addEventListener("change", () => {
		const selectedPriority = filterDropdown.value;
		filterTasksByPriority(selectedPriority);
	});

	// Add event listener to the reset button
	resetButton.addEventListener("click", () => {
		filterDropdown.value = "";
		filteredTasks.length = 0;
		tasks.forEach(task => {
			task.isExpanded = false;
		});
		renderTasks();
	});

	// Get the search input and button elements
	const searchInput = document.getElementById("search-input");
	const searchBtn = document.getElementById("search-btn");
}
function setupStorageListeners() {
	// Save data to browser storage when user navigates away from page
	window.addEventListener("beforeunload", () => {
		localStorage.setItem("tasksArr", JSON.stringify(tasks));
	});
}

// Call the setup functions
setupInputListeners();
setupToolbarListeners();
setupStorageListeners();

renderTasks();
updateDividerVisibility();
