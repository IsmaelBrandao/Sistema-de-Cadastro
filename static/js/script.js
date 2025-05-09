class Cadastro {
    lista = [];
    indiceAtual = 0;

    adicionarPessoa(pessoa) {
        this.lista.push(pessoa);
        this.indiceAtual = this.lista.length - 1;
        this.mostrarPessoa();
    }

    removerPessoaAtual() {
        if (this.lista.length === 0) return;
        this.lista.splice(this.indiceAtual, 1);
        if (this.indiceAtual > 0) this.indiceAtual--;
        this.mostrarPessoa();
    }

    pessoaAnterior() {
        if (this.lista.length > 0) {
            this.indiceAtual = (this.indiceAtual - 1 + this.lista.length) % this.lista.length;
            this.mostrarPessoa();
        }
    }

    proximaPessoa() {
        if (this.lista.length > 0) {
            this.indiceAtual = (this.indiceAtual + 1) % this.lista.length;
            this.mostrarPessoa();
        }
    }

    mostrarPessoa() {
        const pessoa = this.lista[this.indiceAtual];
        document.getElementById("nome").textContent = pessoa ? pessoa.nome : "-";

        if (pessoa) {
            const data = new Date(pessoa.nascimento);
            const dataFormatada = data.toLocaleDateString("pt-BR");
            document.getElementById("nascimento").textContent = dataFormatada;
        } else {
            document.getElementById("nascimento").textContent = "-";
        }

        document.getElementById("cpf").textContent = pessoa ? pessoa.cpf : "-";
    }
}

const cadastro = new Cadastro();

document.getElementById("adicionar").addEventListener("click", () => {
    const nomeInput = document.getElementById("inputNome").value.trim();
    const nascimentoInput = document.getElementById("inputNascimento").value;
    const cpfInput = document.getElementById("inputCpf").value.trim();

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nomeInput);
    const cpfValido = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfInput);

    if (!nomeInput || !nascimentoInput || !cpfInput) {
        exibirMensagem("Por favor, preencha todos os campos.", "erro");
        return;
    }

    if (!nomeValido) {
        exibirMensagem("Nome inválido. Use apenas letras e espaços.", "erro");
        return;
    }

    if (!cpfValido) {
        exibirMensagem("CPF inválido. O formato correto é 000.000.000-00.", "erro");
        return;
    }

    cadastro.adicionarPessoa({
        nome: nomeInput,
        nascimento: nascimentoInput,
        cpf: cpfInput
    });

    exibirMensagem("Cadastro realizado com sucesso!", "sucesso");

    document.getElementById("inputNome").value = "";
    document.getElementById("inputNascimento").value = "";
    document.getElementById("inputCpf").value = "";
});

document.getElementById("remover").addEventListener("click", () => {
    if (cadastro.lista.length === 0) {
        exibirMensagem("Nenhuma pessoa cadastrada para remover.", "erro");
        return;
    }
    cadastro.removerPessoaAtual();
    exibirMensagem("Pessoa removida com sucesso.", "sucesso");
});

document.getElementById("prev").addEventListener("click", () => {
    cadastro.pessoaAnterior();
});

document.getElementById("next").addEventListener("click", () => {
    cadastro.proximaPessoa();
});

document.getElementById("inputCpf").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    let formatted = "";
    if (value.length > 0) formatted = value.slice(0, 3);
    if (value.length > 3) formatted += "." + value.slice(3, 6);
    if (value.length > 6) formatted += "." + value.slice(6, 9);
    if (value.length > 9) formatted += "-" + value.slice(9, 11);

    e.target.value = formatted;
});

function exibirMensagem(texto, tipo) {
    const msgDiv = document.getElementById("mensagem");
    msgDiv.textContent = texto;
    msgDiv.className = "mensagem " + tipo;
    msgDiv.style.display = "block";
    setTimeout(() => {
        msgDiv.style.display = "none";
    }, 3000);
}