var sistema = new SistemaCadastro();

(function popularTabela() {
  var tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  sistema.participantes.forEach(el => {
    tbody.innerHTML += `<tr id="${el.email}" onclick="abrirModalEdicao('${el.email}')">
        <td><input class="form-check-input" type="checkbox" value="" id="check-${el.email}" style="position: relative; text-align: center; margin: 0" disabled></td>
        <td>${el.nome}</td>
        <td>${el.sobrenome}</td>
        <td>${el.email}</td>
        <td>${el.idade}</td>
        <td>${el.sexo == 1 ? 'Masculino' : 'Feminino'}</td>
        <td>${el.nota}</td>
        <td>${el.aprovado ? '<i class="fas fa-check" style="color:blue"></i>' : '<i class="fas fa-times" style="color:red"></i>'}</td>
      </tr>`
  })
})();

function cadastrarParticipante(f) {
  event.preventDefault();
  sistema.adicionarParticipante(f.nome.value, f.sobrenome.value, f.email.value, f.idade.value, f.sexo.value);
  sistema.adicionarNotaAoParticipante(f.email.value, f.nota.value);
  document.location.reload(true);
}

function abrirModalEdicao(email) {
  var participante = sistema.obterParticipante(email);
  document.querySelector("#modal-participante-body").innerHTML = templateModalEdicao(participante);
  $('#edicao-participante').modal('show');
}

function editarParticiante(f) {
  sistema.atualizarParticipante(f.nome.value, f.sobrenome.value, f.email.value, f.idade.value, f.sexo.value, f.nota.value);
  document.location.reload(true);
}

function excluirParticipante(f) {
  sistema.removerParticipante(f.email.value);
  document.location.reload(true);
}

function templateModalEdicao(p) {
  return `<form id="form-edicao">
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="nome">Nome</label>
          <input type="text" class="form-control" id="nome" value="${p.nome}">
        </div>
        <div class="form-group col-md-5">
          <label for="sobrenome">Sobrenome</label>
          <input type="text" class="form-control" id="sobrenome" value="${p.sobrenome}">
        </div>
        <div class="form-group col-md-2">
          <label for="idade">Idade</label>
          <input type="number" class="form-control" id="idade" value="${p.idade}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" value="${p.email}">
        </div>
        <div class="form-group col-md-2">
          <label for="nota">Nota</label>
          <input type="number" class="form-control" id="nota" value="${p.nota}">
        </div>
        <div class="form-group col-md-5">
          <div class="form-group">
            <label for="sexo">Sexo</label>
            <select class="form-control" id="sexo">
              <option value=""></option>
              <option value="1" ${p.sexo == 1 ? "selected" : ""}>Masculino</option>
              <option value="2" ${p.sexo == 2 ? "selected" : ""}>Feminino</option>
            </select>
          </div>
        </div>
      </div>
    </form>`
}