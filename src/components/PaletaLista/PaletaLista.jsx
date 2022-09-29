import "./PaletaLista.css";
import { paletas } from "mocks/paletas.js";// funcionol o arquivo jsconfg eu não precisei colocar o ../../
import { useState } from "react";

function PaletaLista() {
  //        valor atual        func que altera a outra         valor inicial um obj vazio
  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  // esse parametro vem do button
  const adicionarItem = (paletaIndex) => {
    const paleta = {
      //objeto paletaIndex = chave. pegando o valor atual da paleta paletaIndex
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    };
    // primeiro é o valor atual o segunda vai substiruir ele
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };



  const removerItem = (paletaIndex) => {
    const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1 }
    setPaletaSelecionada({...paletaSelecionada, ...paleta});
}





  //RENDERIZAÇÃO CONDICIONAL
  // função possui 2 parãmetros o primeiro é a condição e o segundo o index da paleta selecionada
  // ele renderiza o SPAN
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="PaletaListaItem__badge">
        {" "}
        {paletaSelecionada[index]}{" "}
      </span>
    );




    const removeButton = (canRender, index) =>
    Boolean(canRender) && (<button className="Acoes__remover" onClick={() => removerItem(index)}>remover</button>);
  




  // o primeiro é o index da paleta selecionada que se refere ao canRnder que dendo valor vira TRUE
  //{badgeCounter(paletaSelecionada[index], index)}

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        //adicionamos a nossa key
        <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
          {badgeCounter(paletaSelecionada[index], index)}
          <div>
            <div className="PaletaListaItem__titulo"> {paleta.titulo} </div>
            <div className="PaletaListaItem__preco">
              {" "}
              R$ {paleta.preco.toFixed(2)}{" "}
            </div>
            <div className="PaletaListaItem__descricao">
              {" "}
              {paleta.descricao}{" "}
            </div>
            <div className="PaletaListaItem__acoes Acoes">
              <button
                className={`Acoes__adicionar ${
                  !paletaSelecionada[index] && "Acoes__adicionar--preencher"
                }`}
                onClick={() => adicionarItem(index)}
              >
                adicionar
              </button>
              {removeButton(paletaSelecionada[index], index)}
            </div>
          </div>
          <img
            className="PaletaListaItem__foto"
            src={paleta.foto}
            alt={`Paleta de ${paleta.sabor}`}
          />
        </div>
      ))}
    </div>
  );
}

export default PaletaLista;




/*ESTILIZAÇÃO CONDICIONAL
Acoes__adicionar indica a COR

Acoes__adicionar--preencher indica a larguga

 ele começa com Acoes__adicionar e com essa variável quando eu não seleciono nenhuma paleta este este está vazio !paletaSelecionada se essa variável receber um click nosso paletaSelecionada é true mas a ! tronsforma para false e remove a  Acoes__adicionar--preencher
className={`Acoes__adicionar ${
  !paletaSelecionada[index] && "Acoes__adicionar--preencher"
}`}
*/



/*
o onClick quando o usuário cliccar ele vai executar o que está definido dentro dele. Ele tem uma função que é um callback um função dentro de outra que executa a função adicionarItem passando o index da paleta que foi clicada

onClick={() => adicionarItem(index)}>
*/

// uma forma de pegar images
// src={require("../../assets/images/doce-de-leite-com-doce-de-leite.png")}

//Laços de repetição, também conhecidos como loops, são comandos que permitem iteração de código, ou seja, que comandos presentes no bloco sejam repetidos diversas vezes.
//No React exibimos uma coleção de dados utilizando map*, método nativo do JS. Para isso devemos inseri-lo entre chaves {} dentro do JSX.

//O método map invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
//Callback é uma rotina/função que é passada como parâmetro para outro método.

/*
Estilo preparado, vamos implementar a lógica. Neste momento o contador de itens selecionados será indicado no próprio item do cardápio.
Comecemos com a desconstrução do retorno do useState({}). Para o estado inicial vamos adicionar um objeto vazio, que guardará as informações de quais itens da lista foram selecionados. Observe que ele nos devolve como primeiro parâmetro o objeto contendo o estado de paletasSelecionadas, sendo um objeto no qual a chave é o índex de qual paleta/sabor está adicionada e como valor a quantidade de paletas daquele sabor que foram selecionadas.
Em seguida vamos criar a função adicionarItem, ela recebe como parâmetro o index de qual paleta foi adicionada e a partir disso cria um objeto {[index]: quantidade}. O index é utilizado como chave e o valor é atribuído utilizando um pré-existente no objeto, ou 0 caso não exista, somando mais 1.
Após esta criação podemos utilizar o método setQuantidade, no qual fará a atualização do estado recebendo como parâmetro um novo objeto criado a partir do objeto de estado atual e o novo objeto de paleta a ser incluso/sobrescrito no estado atual.
Este novo objeto é criado utilizando o Spread Operator ... que obtém somente as propriedades e valores dos objetos anteriores */

/*Em uma aplicação, é comum precisarmos exibir ou esconder um elemento, conforme certa condição. Pode ser uma interação do usuário, presença OU ausência de dados vindos em uma request, ou até mesmo níveis de permissão de usuário. Esse é o conceito de renderização condicional e abordaremos mais a seguir.
Daremos início com os badges, que não devem renderizar quando zerados, mas sim, renderizar somente quando os itens forem selecionados.
Iniciando com a criação de uma função chamada badgeCounter que recebe dois parâmetros, sendo o primeiro a condição de renderização, que vamos chamá-la canRender.
O segundo parâmetro é o index, representando o número do item que está sendo selecionado (onde será renderizado o contador).
Assim há uma verificação: quando o canRender for true o operador && renderiza o badge naquele index. Caso o canRender seja false o operador && também torna a renderização falsa, portanto não aparece na tela*/
