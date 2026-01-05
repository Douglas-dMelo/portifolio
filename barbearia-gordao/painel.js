const ul = document.getElementById("lista");

/* Recupera agendamentos do LocalStorage */
let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

/* Renderiza a lista na tela */
function renderizarLista() {
    ul.innerHTML = "";

    if (agendamentos.length === 0) {
        ul.innerHTML = "<li>📭 Nenhum agendamento para hoje.</li>";
        return;
    }

    agendamentos.forEach((agendamento, index) => {
        const li = document.createElement("li");
        li.style.marginBottom = "10px";

        li.innerHTML = `
            ${agendamento.data} ${agendamento.hora} — 
            ${agendamento.nome} (${agendamento.servico})
        `;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.style.marginLeft = "10px";
        btn.onclick = () => removerAgendamento(index);

        li.appendChild(btn);
        ul.appendChild(li);
    });
}

/* Remove um agendamento */
function removerAgendamento(index) {
    const item = document.querySelectorAll(".lista-agendamentos li")[index];

    item.style.animation = "fadeOut 0.3s forwards";

    setTimeout(() => {
        agendamentos.splice(index, 1);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        renderizarLista();
    }, 300);
}

/* Inicialização */
renderizarLista();