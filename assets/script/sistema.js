//Objeto Participante
function Participante() {
    this.nome = "";
    this.sobrenome = "";
    this.email = "";
    this.idade = 0
    this.sexo = 0
    this.nota = 0
    this.aprovado = false
}

/***********************
 * Representa o sistema
 * Uma vez instanciado, deve-se usar essa mesma
 * instancia em todas as operações.
 */
function SistemaCadastro() {
    var armazenamento = new Armazenamento('participantes', 'email');

    function obterTodosParticipantes() {
        console.log(armazenamento.obterItens())
        return armazenamento.obterItens();
    }
    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;

        armazenamento.adicionarItem(p);
    }
    function atualizarParticipante(nome, sobrenome, email, idade, sexo, nota, antigoEmail) {
        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;
        p.nota = nota;
        p.aprovado = avaliarAprovacao(nota);

        armazenamento.atualizarItem(p, antigoEmail);
    }
    function removerParticipante(email){
        armazenamento.apagarItem(email);
    }
    function buscarParticipantesPorNome(nome){
        return armazenamento.obterItem('nome', nome);
    }
    function buscarParticipantesPorSexo(sexo){
        return armazenamento.obterItem('sexo', sexo);
    }
    function buscarParticipantesAprovados(){
        return armazenamento.obterItem('aprovado', true);
    }
    function buscarParticipantesReprovados(){
        return armazenamento.obterItem('aprovado', false);
    }
    function obterParticipante(email){
        return armazenamento.obterItem('email', email);
    }
    function adicionarNotaAoParticipante(email, nota){
        armazenamento.alterarValor(email, 'nota', nota);
        armazenamento.alterarValor(email, 'aprovado', avaliarAprovacao(nota));
    }
    function avaliarAprovacao(nota) {
        return nota >= 70 ? true : false
    }
    function obterMediaDasNotasDosParticipantes(){
        return armazenamento.obterItens().reduce(t,a => t + a.nota, 0)/armazenamento.obterContagemItens();
    }
    function obterTotalDeParticipantes(){
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email){
        armazenamento.obterItem(email).aprovado;
    }
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        return armazenamento.obterItens().filter(p => p.sexo === sexo).length;
    }

    return {
        obterTodosParticipantes,
        adicionarParticipante,
        atualizarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        avaliarAprovacao,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo
    };
}