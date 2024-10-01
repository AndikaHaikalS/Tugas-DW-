class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

let tasks = [];

// Fungsi untuk menambahkan task baru
function addTask(taskName) {
    if (taskName === undefined) {
        const taskInput = document.getElementById('task-input');
        taskName = taskInput.value.trim();

        if (taskName === "") {
            alert("Task cannot be empty!");
            return;
        }
    }

    const task = new Task(taskName);
    tasks.push(task);
    displayTasks();

    if (document.getElementById('task-input')) {
        document.getElementById('task-input').value = ''; // Kosongkan input setelah menambahkan
    }
}

// Tambahkan event listener pada tombol "Add Task"
document.getElementById('add-task-btn').addEventListener('click', () => addTask());

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        const taskText = document.createElement('span');
        taskText.textContent = task.name;

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('click', () => toggleTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

function toggleTask(index) {
    tasks[index].toggleCompleted();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function filterTasks(filter) {
    let filteredTasks = tasks;

    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        const taskText = document.createElement('span');
        taskText.textContent = task.name;

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('click', () => toggleTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Daftar task default
const defaultTasks = ['Ban', 'Rantai', 'Stang', 'Velg', 'Busi', 'Knalpot', 'Spion'];

// Tambahkan task default saat aplikasi dimulai
window.onload = () => {
    defaultTasks.forEach(task => addTask(task));
};
