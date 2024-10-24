let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
const taskInput = document.getElementById('new-task');
const taskListElement = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task-btn');

// Function to render tasks in the UI
function renderTasks() {
    taskListElement.innerHTML = '';
    taskList.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        taskItem.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button class="edit-btn" onclick="startEdit(${index})">✏️</button>
                <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
                <button class="complete-btn" onclick="toggleComplete(${index})">${task.completed ? '✔️' : '✅'}</button>
            </div>`;
        taskListElement.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        taskList.push({ name: taskName, completed: false });
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }
}

// Function to start inline editing
function startEdit(index) {
    const taskItem = taskListElement.children[index];
    const span = taskItem.querySelector('span');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;

    // Replace the span with the input field
    taskItem.replaceChild(input, span);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    taskItem.appendChild(saveBtn);

    // Save changes on button click
    saveBtn.addEventListener('click', () => {
        const newTaskName = input.value.trim();
        if (newTaskName) {
            taskList[index].name = newTaskName;
            saveTasks();
            renderTasks();
        }
    });
}

// Function to delete a task
function deleteTask(index) {
    taskList.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    saveTasks();
    renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Event listener for the add task button
addTaskButton.addEventListener('click', addTask);

// Initial rendering of tasks
renderTasks();
