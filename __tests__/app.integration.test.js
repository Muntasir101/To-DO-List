// __tests__/app.integration.test.js
let taskList = [];

function addTask(name) {
    if (name) {
        taskList.push({ name, completed: false });
    }
}

function deleteTask(index) {
    if (index > -1 && index < taskList.length) {
        taskList.splice(index, 1);
    }
}

function toggleComplete(index) {
    if (index >= 0 && index < taskList.length) {
        taskList[index].completed = !taskList[index].completed;
    }
}

// Simulating rendering tasks for UI
function renderTasks() {
    return taskList.map((task, index) => ({
        index,
        name: task.name,
        completed: task.completed,
    }));
}

describe('To-Do List Application Integration Tests', () => {
    beforeEach(() => {
        taskList = []; // Reset task list before each test
    });

    test('should add and render a task successfully', () => {
        addTask('Test Task 1');
        const tasks = renderTasks();
        
        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toEqual({ index: 0, name: 'Test Task 1', completed: false });
    });

    test('should add multiple tasks and render them correctly', () => {
        addTask('Test Task 1');
        addTask('Test Task 2');
        const tasks = renderTasks();

        expect(tasks).toHaveLength(2);
        expect(tasks[0]).toEqual({ index: 0, name: 'Test Task 1', completed: false });
        expect(tasks[1]).toEqual({ index: 1, name: 'Test Task 2', completed: false });
    });

    test('should delete a task and update the task list', () => {
        addTask('Test Task 1');
        addTask('Test Task 2');
        deleteTask(0);
        const tasks = renderTasks();

        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toEqual({ index: 0, name: 'Test Task 2', completed: false });
    });

    test('should toggle completion status of a task and reflect in rendering', () => {
        addTask('Test Task 1');
        toggleComplete(0);
        const tasks = renderTasks();

        expect(tasks[0].completed).toBe(true);

        toggleComplete(0);
        const updatedTasks = renderTasks();

        expect(updatedTasks[0].completed).toBe(false);
    });

    test('should handle adding an empty task correctly', () => {
        addTask('');
        const tasks = renderTasks();

        expect(tasks).toHaveLength(0);
    });
});
