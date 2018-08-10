function Armazenamento(tabela, chavePrimaria) {

  function salvarItens(itens) {
    localStorage.setItem( tabela, stringify(itens) );
  }
  function apagarItem(valorChavePrimaria) {
    let itens = obterItens()
    itens.splice(obterIndexItem(valorChavePrimaria), 1);
    salvarItens(itens);
  }
  function alterarValor(valorChavePrimaria, propriedade, valor) {
    let itens = obterItens();
    itens[obterIndexItem(valorChavePrimaria)][propriedade] = valor;
    salvarItens(itens);
  }
  function obterContagemItens() {
    return obterItens().length;
  }

  function obterItens() {
    return parse(localStorage.getItem(tabela) || "[]");
  }

  function parse(item) {
    return JSON.parse(item);
  }

  function stringify(item) {
    return JSON.stringify(item);
  }

  function obterIndexItem(valor) {
    let itens = obterItens()
    return itens.findIndex(el => valor === el[chavePrimaria]);
  }

  function obterItem(propriedade, valor) {
    let itens =  obterItens()
    return itens.find(el => el[propriedade] === valor);
  }

  function adicionarItem(item) {
    if ( ehDuplicado(item[chavePrimaria]) )
      throw "Erro. Chave primária já existe"
    
    let itens = obterItens();
    itens.push(item);
    salvarItens( itens );
  }

  function atualizarItem(item, valorAntigoChavePrimaria) {
    if ( item[chavePrimaria] != valorAntigoChavePrimaria && ehDuplicado(item[chavePrimaria]) )
      throw "Erro. Chave primária já existe"

    let itens = obterItens();
    itens[ obterIndexItem(valorAntigoChavePrimaria) ] = item;
    salvarItens(itens);
  }

  function ehDuplicado(valor) {
    return obterItem( chavePrimaria, valor ) != undefined;
  }

  return {
    salvarItens,
    apagarItem,
    alterarValor,
    obterItens,
    parse,
    stringify,
    obterIndexItem,
    obterItem,
    adicionarItem,
    atualizarItem,
    ehDuplicado,
    obterContagemItens
  };
}