const horaSelect = document.getElementById("hora");
const form = document.getElementById("formAgendamento");
const msg = document.getElementById("mensagem");

const inputNome = document.getElementById("nome");
const selectServico = document.getElementById("servico");
const inputData = document.getElementById("data");

/* Horários disponíveis */
const horarios = [];

for (let h = 16; h <= 21; h++) {
    horarios.push(`${h}:00`);
    if (h !== 21) {
        horarios.push(`${h}:30`);
    }
}

/* Carregar horários disponíveis */
function carregarHorarios(data) {
    horaSelect.innerHTML = "<option value=''>Selecione um horário</option>";

    const agendados = JSON.parse(localStorage.getItem("agendamentos")) || [];

    horarios.forEach(h => {
        const ocupado = agendados.some(a => a.data === data && a.hora === h);

        if (!ocupado) {
            horaSelect.innerHTML += `<option value="${h}">${h}</option>`;
        }
    });
}

/* Atualiza horários ao mudar a data */
inputData.addEventListener("change", e => {
    carregarHorarios(e.target.value);
});

/* Envio do formulário */
form.addEventListener("submit", e => {
    e.preventDefault();

    const nome = inputNome.value;
    const servico = selectServico.value;
    const data = inputData.value;
    const hora = horaSelect.value;

    const agendamento = { nome, servico, data, hora };

    const lista = JSON.parse(localStorage.getItem("agendamentos")) || [];
    lista.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(lista));

    const texto = `Olá! Agendamento confirmado:
Nome: ${nome}
Serviço: ${servico}
Data: ${data}
Hora: ${hora}`;

    const url = `https://wa.me/5511910530628?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");

    msg.textContent = "✅ Agendamento realizado com sucesso!";
    form.reset();
});