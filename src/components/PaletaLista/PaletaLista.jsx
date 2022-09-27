import "./PaletaLista.css";
import { paletas } from "../../mocks/paletas.js";
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

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        //adicionamos a nossa key
        <div className="PaletaListaItem" key={`PaletaListaItem-${index}`}>
            	<span className="PaletaListaItem__badge"> {paletaSelecionada[index] || 0} </span>

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
                className="Acoes__adicionar Acoes__adicionar--preencher"
                onClick={() => adicionarItem(index)}>
                adicionar
              </button>
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
