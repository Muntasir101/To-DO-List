// __tests__/app.test.js
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

describe('To-Do List Application', () => {
    beforeEach(() => {
        taskList = []; // Reset task list before each test
    });

    test('should add a task successfully', () => {
        addTask('Test Task 1');
        expect(taskList).toHaveLength(1);
        expect(taskList[0]).toEqual({ name: 'Test Task 1', completed: false });
    });

    test('should not add a task if name is empty', () => {
        addTask('');
        expect(taskList).toHaveLength(0);
    });

    test('should delete a task successfully', () => {
        addTask('Test Task 1');
        addTask('Test Task 2');
        deleteTask(0);
        expect(taskList).toHaveLength(1);
        expect(taskList[0]).toEqual({ name: 'Test Task 2', completed: false });
    });

    test('should toggle completion status of a task', () => {
        addTask('Test Task 1');
        toggleComplete(0);
        expect(taskList[0].completed).toBe(true);
        toggleComplete(0);
        expect(taskList[0].completed).toBe(false);
    });

    test('should not delete a task with an invalid index', () => {
        addTask('Test Task 1');
        deleteTask(-1); // Invalid index
        expect(taskList).toHaveLength(1);
        deleteTask(1); // Invalid index
        expect(taskList).toHaveLength(1);
    });
});
