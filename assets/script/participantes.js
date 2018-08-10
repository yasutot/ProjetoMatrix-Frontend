var sistema = new SistemaCadastro();

(function popularTabela() {
  var tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  console.log(sistema.obterTodosParticipantes())
  sistema.obterTodosParticipantes().forEach(el => {
    tbody.innerHTML += templateLinhaParticipante(el);
  })
})();

function cadastrarParticipante(f) {
  event.preventDefault();
  event.stopPropagation();
  sistema.adicionarParticipante(f.nome.value, f.sobrenome.value, f.email.value, f.idade.value, f.sexo.value);
  sistema.adicionarNotaAoParticipante(f.email.value, f.nota.value);
  document.location.reload(true);
}

function abrirModalEdicao(target, email) {
  if(target.classList.contains('checkbox-participante')) return;
  var participante = sistema.obterParticipante(email);
  document.querySelector("#modal-participante-body").innerHTML = templateModalEdicao(participante);
  $('#edicao-participante').modal('show');
}

function editarParticipante(f) {
  sistema.atualizarParticipante(f.nome.value, f.sobrenome.value, f.email.value, f.idade.value, f.sexo.value, f.nota.value, f.getAttribute('email'));
  document.location.reload(true);
}

function excluirParticipante(f) {
  sistema.removerParticipante(f.email.value);
  document.location.reload(true);
}

function excluirParticipantes() {
  var participantesMarcados = Array.from(document.querySelectorAll('.checkbox-participante')).filter(el => el.checked).map(el => el.getAttribute('email'));
  
  if(participantesMarcados.length === 0) throw "Nenhum participante marcado";

  participantesMarcados.forEach(email => sistema.removerParticipante(email));
  document.location.reload(true);
}

function templateLinhaParticipante(p){
  return `<tr id="${p.email}" onclick="abrirModalEdicao(event.target, '${p.email}')">
    <td>
      <span class="checkboxtext">
        <input class="form-check-input checkbox-participante" 
                  type="checkbox" 
                  value="" 
                  email="${p.email}" 
                  style="position: relative; text-align: center; margin: 0">
      </span>
    </td>
    <td>${p.nome}</td>
    <td>${p.sobrenome}</td>
    <td>${p.email}</td>
    <td>${p.idade}</td>
    <td>${p.sexo == 1 ? 'Masculino' : 'Feminino'}</td>
    <td>${p.nota}</td>
    <td>${p.aprovado ? '<i class="fas fa-check" style="color:blue"></i>' : '<i class="fas fa-times" style="color:red"></i>'}</td>
  </tr>`
}

function templateModalEdicao(p) {
  return `<form id="form-edicao" email="${p.email}">
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
          <input type="number" class="form-control" id="idade" min="0" step="1" value="${p.idade}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-5">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" value="${p.email}">
        </div>
        <div class="form-group col-md-2">
          <label for="nota">Nota</label>
          <input type="number" class="form-control" id="nota" min="0" max="100" step="1" value="${p.nota}">
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