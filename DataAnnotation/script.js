function renderTaskItem(task) {
    const li = document.createElement('li');
    li.className = `taskItem priority-${task.priority}`;
    li.setAttribute('data-id', task.id);

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'completeCheckbox';
    checkbox.checked = task.completed;
    const span = document.createElement('span');
    span.className = 'taskText';
    span.textContent = task.text;
    label.appendChild(checkbox);
    label.appendChild(span);

    const taskOptions = document.createElement('div');
    taskOptions.className = 'taskOptions';

    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';
    const editIcon = document.createElement('i');
    editIcon.className = 'fa-solid fa-ellipsis';
    editIcon.setAttribute('aria-hidden', 'true');
    editBtn.appendChild(editIcon);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash';
    deleteIcon.setAttribute('aria-hidden', 'true');
    deleteBtn.appendChild(deleteIcon);

    taskOptions.appendChild(editBtn);
    taskOptions.appendChild(deleteBtn);

    taskContent.appendChild(label);
    taskContent.appendChild(taskOptions);

    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const tagsList = document.createElement('ul');
    tagsList.className = 'tags-list';
    task.tags.forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.textContent = tag;
        tagsList.appendChild(tagItem);
    });

    const timestamp = document.createElement('span');
    timestamp.className = 'timestamp';
    timestamp.textContent = task.timestamp;

    taskDetails.appendChild(tagsList);
    taskDetails.appendChild(timestamp);

    li.appendChild(taskContent);
    li.appendChild(taskDetails);

    return li;
}

const tasks = [
    {
        id: '562630',
        priority: 'low',
        completed: false,
        text: 'task 1',
        tags: ['tag'],
        timestamp: '5/9/2024, 12:02:04 PM'
    },
    {
        id: '562631',
        priority: 'medium',
        completed: false,
        text: 'task 2',
        tags: ['tag'],
        timestamp: '5/9/2024, 12:02:04 PM'
    },
    {
        id: '562632',
        priority: 'high',
        completed: false,
        text: 'task 3',
        tags: ['tag'],
        timestamp: '5/9/2024, 12:02:04 PM'
    }
];

document.getElementById('container').appendChild(renderTaskItem(tasks[0]));
document.getElementById('container').appendChild(renderTaskItem(tasks[1]));
document.getElementById('container').appendChild(renderTaskItem(tasks[2]));