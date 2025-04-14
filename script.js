document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addtaskbtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let task = JSON.parse(localStorage.getItem('task')) || [];

    // Render all existing tasks on load
    task.forEach(t => renderTask(t));

    addtaskbtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        task.push(newTask);
        saveTask();
        renderTask(newTask);
        todoInput.value = "";
    });

    function renderTask(taskItem) {
        const li = document.createElement('li');
        li.setAttribute('data-id', taskItem.id);
        li.innerHTML = `
            <span>${taskItem.text}</span>
            <button class="delete-btn">Delete</button>
        `;
        todoList.appendChild(li);

        // Add delete functionality
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            task = task.filter(t => t.id !== taskItem.id);
            saveTask();
        });
    }

    function saveTask() {
        localStorage.setItem('task', JSON.stringify(task));
    }
});
