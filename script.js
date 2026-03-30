let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

mostrar();
atualizarRelatorio();

function adicionar() {
  let nome = document.getElementById("nome").value.trim();
  let quantidade = document.getElementById("quantidade").value;

  if (nome === "" || quantidade === "") {
    alert("Preencha todos os campos!");
    return;
  }

  if (quantidade <= 0) {
    alert("Quantidade deve ser maior que 0!");
    return;
  }

  let produto = {
    nome: nome,
    quantidade: Number(quantidade)
  };

  produtos.push(produto);

  salvar();
  mostrar();
  atualizarRelatorio();

  document.getElementById("nome").value = "";
  document.getElementById("quantidade").value = "";
}

function mostrar(filtro = "") {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  produtos
    .filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((p, i) => {
      lista.innerHTML += `
        <li>
          ${p.nome} - ${p.quantidade}
          <div>
            <button onclick="editar(${i})">Editar</button>
            <button onclick="remover(${i})">X</button>
          </div>
        </li>
      `;
    });
}

function remover(index) {
  produtos.splice(index, 1);
  salvar();
  mostrar();
  atualizarRelatorio();
}

function editar(index) {
  let novoNome = prompt("Novo nome:", produtos[index].nome);
  let novaQuantidade = prompt("Nova quantidade:", produtos[index].quantidade);

  if (novoNome === "" || novaQuantidade === "") {
    alert("Não pode deixar vazio!");
    return;
  }

  if (novaQuantidade <= 0) {
    alert("Quantidade inválida!");
    return;
  }

  produtos[index].nome = novoNome;
  produtos[index].quantidade = Number(novaQuantidade);

  salvar();
  mostrar();
  atualizarRelatorio();
}

function buscar() {
  let termo = document.getElementById("busca").value;
  mostrar(termo);
}

function atualizarRelatorio() {
  let totalProdutos = produtos.length;
  let totalQuantidade = produtos.reduce((soma, p) => soma + p.quantidade, 0);

  document.getElementById("totalProdutos").innerText = totalProdutos;
  document.getElementById("totalQuantidade").innerText = totalQuantidade;
}

function salvar() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}