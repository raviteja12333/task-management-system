const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const userNameInput = document.getElementById('userName');
const welcomeMessage = document.getElementById('welcome-message');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress');
const showPendingBtn = document.getElementById('showPendingBtn');
const showCompletedBtn = document.getElementById('showCompletedBtn');
const toggleThemeBtn = document.getElementById('toggle-theme');

let tasks = [];
let isDarkMode = false;

// Update progress bar
function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${completedTasks} of ${totalTasks} completed`;
}

// Add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
        updateProgress();
    }
}

// Render tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = filter === 'completed'
        ? tasks.filter(task => task.completed)
        : filter === 'pending'
        ? tasks.filter(task => !task.completed)
        : tasks;

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            updateProgress();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
            updateProgress();
        };

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
showPendingBtn.addEventListener('click', () => renderTasks('pending'));
showCompletedBtn.addEventListener('click', () => renderTasks('completed'));
toggleThemeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);
});

// User name handling
userNameInput.addEventListener('input', () => {
    const name = userNameInput.value;
    welcomeMessage.textContent = name ? `Welcome, ${name}!` : '';
});
