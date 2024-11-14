const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");


// Função para salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    tasklist.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector("span").textContent;
        const completed = li.querySelector("span").style.textDecoration === 'line-through';
        tasks.push({ text: taskText, completed: completed});
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.text}</span>
                <button class="editButton fa-solid fa-pencil" onClick="editTask(this)" ${task.completed ? "disabled" : ""}></button>
                <button class="deleteButton fa-solid fa-trash" onClick="deleteTask(this)"></button>
                <button class="completeButton fa-solid fa-circle-check" onClick="completeTask(this)"></button>
            `;
            if (task.completed) {
                li.querySelector("span").style.textDecoration = 'line-through';
            }
            tasklist.appendChild(li);
        });
    }
}

// Função para adicionar tarefa e salvar no localStorage
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="editButton fa-solid fa-pencil" onClick="editTask(this)"></button>
            <button class="deleteButton fa-solid fa-trash" onClick="deleteTask(this)"></button>
            <button class="completeButton fa-solid fa-circle-check" onClick="completeTask(this)"></button>
        `;
        tasklist.appendChild(li);
        taskInput.value = "";
        tagInput.value = "";
        saveTasks();
    }
}


// Função para marcar tarefa como concluída, desabilitar edição e salvar no localStorage
function completeTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    if (confirm("Você realmente deseja marcar esta tarefa como concluída?")) {
        span.style.textDecoration = 'line-through';
        const editButton = li.querySelector(".editButton");
        editButton.disabled = true;
        saveTasks();
    }
}

// Função para editar tarefa e salvar no localStorage
function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
    }
}

// Função para deletar tarefa e salvar no localStorage
function deleteTask(button) {
    const li = button.parentElement;
    tasklist.removeChild(li);
    saveTasks();
}

// Carregar tarefas ao iniciar
window.addEventListener("load", () => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        const keepData = confirm("Deseja manter as informações inseridas anteriormente?");
        if (keepData) {
            loadTasks();
        } else {
            localStorage.removeItem("tasks");
        }
    }
});

// Pergunta antes de sair da página
window.onbeforeunload = (event) => {
    if (tasklist.children.length > 0) {
        const message = "Você tem alterações não salvas. Deseja realmente sair?";
        event.returnValue = message;
        return message;
    }
};


//Abrir nav-bar responsiva
const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", this.window.scrollY > 0);
})

let menu = document.querySelector('#menu-icon');
let navmenu = document.querySelector('.navmenu');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navmenu.classList.toggle('open');
}
