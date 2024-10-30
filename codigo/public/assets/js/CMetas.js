import { auth } from "./auth.js";
import { createIconsSelector } from "./icons-selector.js";

function closeModal() {
  document.querySelector(".modal").style.display = "none";
}

function selectIcon(direction) {
  const icons = document.querySelectorAll(".icon-selector img");
  let current = Array.from(icons).findIndex((icon) =>
    icon.classList.contains("selected")
  );

  icons[current].classList.remove("selected");
  if (direction === "next") {
    current = (current + 1) % icons.length;
  } else {
    current = (current - 1 + icons.length) % icons.length;
  }
  icons[current].classList.add("selected");
}

export function cancel() {
  document.getElementById("metaForm").reset();
}

document
  .getElementById("metaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const valor = document.getElementById("valor").value;
    const tempo = document.getElementById("tempo").value;
    let icone = document
      .querySelector(".form__field__icons__item__input:checked")
      .getAttribute("data-icon-name");

    if (icone === "none") icone = undefined;

    const meta = criarMeta({ nome, valor, tempo, icone });

    if (!meta) {
      alert("Erro ao criar a meta.");
      return;
    }

    cancel();
  });

let metas = [];

// Função para exibir as metas
function exibirMetas() {
    const metasList = document.querySelector('.form__field__icons'); // Seleciona a lista de ícones
    metasList.innerHTML = ''; // Limpa a lista antes de adicionar as metas

    metas.forEach(meta => {
        const li = document.createElement('li');
        li.textContent = `${meta.nome} - R$${meta.valor} (${meta.tempo})`;

        // Botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => {
            excluirMeta(meta.id);
        };
        li.appendChild(deleteButton);

        metasList.appendChild(li);
    });
}

// Função para excluir uma meta
function excluirMeta(id) {
    const index = metas.findIndex(meta => meta.id === id);
    if (index !== -1) {
        metas.splice(index, 1); // Remove a meta do array
        exibirMetas(); // Atualiza a exibição
    }
}

// Função para criar a meta
function criarMeta(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value;
    const valor = parseFloat(document.getElementById('valor').value.replace('R$', '').replace(',', '.').trim());
    const tempo = document.getElementById('tempo').value;

    // Gera um ID único para a nova meta
    const id = metas.length ? metas[metas.length - 1].id + 1 : 1;

    // Adiciona a nova meta ao array
    metas.push({ id, nome, valor, tempo });
    exibirMetas(); // Atualiza a exibição

    // Limpa os campos do formulário
    document.getElementById('metaForm').reset();
}

document.getElementById('metaForm').addEventListener('submit', criarMeta);

// Inicializa a exibição das metas
exibirMetas();

createIconsSelector();

