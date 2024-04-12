const form = document.getElementById("form");
const descInput = document.getElementById("descricao");
const valorInput = document.querySelector("#montante");
const balancoH1 = document.getElementById("balanco");
const receitaP = document.querySelector("#din-positivo");
const despesaP = document.querySelector("#din-negativo");
const transacoesUL = document.getElementById("transacoes");


form.addEventListener("submit", event => {
    event.preventDefault();
    
    const descTransacao = descInput.value.trim();
    const valorTransacao = valorInput.value.trim();

    if(descTransacao == "") {
        alert("Informe a Descrição da Transação!");
        descInput.focus();
        return;
    }
    if(valorTransacao == "") {
        alert("Informe o Valor da Transação!");
        valorInput.focus();
        return;
    }

    const transacao = {
        id: parseInt(Math.random() * 10000),
        desc: descTransacao,
        valor: parseFloat(valorTransacao),
    };

    somaAoSaldo(transacao);
    somaReceitaDespesa(transacao);
    AddTransacaoAoDOM(transacao)

    descInput.value = "";
    valorInput.value = "";
});

function somaAoSaldo(transacao){
    //recuperra o elemento 
    //pegar o valor e remover o $
    let valorBalanco = balancoH1.innerHTML.trim();
    valorBalanco = valorBalanco.replace("R$","");

    valorBalanco = parseFloat(valorBalanco);
    valorBalanco += transacao.valor;

    balancoH1.innerHTML = `R$${valorBalanco.toFixed(2)}`;
}

function somaReceitaDespesa(transacao){
    const elemento = transacao.valor > 0 ? receitaP : despesaP;// se a transação é maior que 0 é receita se não despesa 
    const substituir = transacao.valor > 0 ? "+ R$" : "- R$";
    let valor = elemento.innerHTML.replace(substituir, "");
    valor = parseFloat(valor);
    valor += Math.abs(transacao.valor);

    elemento.innerHTML = `${substituir}${valor.toFixed(2)}`;
}

function AddTransacaoAoDOM(transacao){
    const cssClass = transacao.valor > 0 ? "positivo" : "negativo";
    const currency = transacao.valor > 0 ? "R$" : "- R$";

    const liElementStr = `${transacao.desc} <span>${currency}${Math.abs(transacao.valor)}</span><button class="delete-btn">X</button>`;

    const liElement = document.createElement("li");
    liElement.innerHTML = liElementStr;
    liElement.classList.add(cssClass);
    transacoesUL.append(liElement);
}