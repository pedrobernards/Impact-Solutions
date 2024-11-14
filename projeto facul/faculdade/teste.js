document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtenha os valores inseridos pelo usuário
    const emailInserido = document.getElementById("email").value;
    const senhaInserida = document.getElementById("senha").value;

    // Carregue o arquivo JSON (substitua pelo caminho correto)
    fetch("usuarios.json")
        .then(response => response.json())
        .then(data => {
            const usuarios = data.usuarios;
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailInserido && usuario.senha === senhaInserida);

            if (usuarioEncontrado) {
                // Redirecione para outra página (substitua pelo caminho correto)
                window.location.href = "/to-do/to-do.html";
            } else {
                alert("Credenciais inválidas. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
});

//criador de tarefas
const taskInput = document.getElementById("taskInput");
const tagInput = document.getElementById("tagInput");
const mainTasks = document.getElementById("mainTasks");
const workTasks = document.getElementById("workTasks");
const personalTasks = document.getElementById("personalTasks");
const mainColumn = document.getElementById("tag-columns");

function addTask() {
    const taskText = taskInput.value.trim();
    const tag = tagInput.value.trim();

    if (taskText === "") {
        alert("Digite uma tarefa válida!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `<span>${taskText}</span>`;

    const taskElement = document.createElement("div");
            taskElement.textContent = taskText;

    if (tag === "") {
        mainTasks.appendChild(li);
    } else if (tag === "trabalho") {
        workTasks.appendChild(li);
    } else if (tag === "pessoal") {
        personalTasks.appendChild(li);
    } else if (tag !== "") {
        let tagColumn = document.getElementById(tag);
                if (!tagColumn) {
                    tagColumn = document.createElement("div");
                    tagColumn.className = "column";
                    tagColumn.id = tag;
                    tagColumn.textContent = tag;
                    tagColumn.innerHTML = `
                    <h1>${tag}</h1>
                    `;
                    mainColumn.appendChild(tagColumn);
                }
                tagColumn.appendChild(taskElement);
    }

    taskInput.value = "";
    tagInput.value = "";
}

function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

// Implemente as funções editTask, deleteTask e completeTask conforme necessário.