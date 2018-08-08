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
    var armazenamento = new Storage('participantes');
    var participantes = armazenamento.get();

    function adicionarParticipante(nome, sobrenome, email, idade, sexo) {
        if (obterParticipante(email) != undefined)  throw "Usuário já estava cadastrado";

        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;

        participantes.push(p);
        armazenamento.set(participantes);
    }
    function atualizarParticipante(nome, sobrenome, email, idade, sexo, nota, antigoEmail) {
        console.log()
        if (email != antigoEmail && obterParticipante(email) != undefined) throw `Usuário com e-mail ${email} já cadastrado`;

        var p = new Participante();
        p.nome = nome;
        p.sobrenome = sobrenome;
        p.email = email;
        p.idade = idade;
        p.sexo = sexo;
        p.nota = nota;
        p.aprovado = avaliarAprovacao(nota);

        let index = obterIndexParticipante(antigoEmail);
        participantes[index] = p;
        armazenamento.set(participantes);
    }
    function obterIndexParticipante(email){
        return participantes.findIndex(p => p.email === email);
    }
    function removerParticipante(email){
        participantes.splice(obterIndexParticipante(email), 1);
        armazenamento.set(participantes);
    }
    function buscarParticipantesPorNome(nome){
        return participantes.filter(p => p.nome === nome);
    }
    function buscarParticipantesPorSexo(sexo){
        return participantes.filter(p => p.sexo === sexo);
    }
    function buscarParticipantesAprovados(){
        return participantes.filter(p => p.aprovado);
    }
    function buscarParticipantesReprovados(){
        return participantes.filter(p => p.aprovado === false);
    }
    function obterParticipante(email){
        return participantes.find(p => p.email === email);
    }
    function adicionarNotaAoParticipante(email, nota){
        let index = obterIndexParticipante(email);
        participantes[index].nota = nota;
        participantes[index].aprovado = avaliarAprovacao(nota);
    }
    function avaliarAprovacao(nota) {
        return nota >= 70 ? true : false
    }
    function obterMediaDasNotasDosParticipantes(){
        return participantes.reduce((t,a) => t + a.nota, 0)/obterTotalDeParticipantes();
    }
    function obterTotalDeParticipantes(){
        return participantes.length;
    }
    function verificarSeParticipanteEstaAprovado(email){
        return obterParticipante(email).aprovado;
    }
    function obterQuantidadeDeParticipantesPorSexo(sexo){
        return participantes.filter(p => p.sexo === sexo).length;
    }

    return {
        participantes,
        atualizarParticipante,
        obterIndexParticipante,
        avaliarAprovacao,
        adicionarParticipante,
        removerParticipante,
        buscarParticipantesPorNome,
        buscarParticipantesPorSexo,
        buscarParticipantesAprovados,
        buscarParticipantesReprovados,
        obterParticipante,
        adicionarNotaAoParticipante,
        obterMediaDasNotasDosParticipantes,
        obterTotalDeParticipantes,
        verificarSeParticipanteEstaAprovado,
        obterQuantidadeDeParticipantesPorSexo
    };
}