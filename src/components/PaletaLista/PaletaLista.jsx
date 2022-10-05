import "./PaletaLista.css";
//import { paletas } from "mocks/paletas.js";// funcionol o arquivo jsconfg eu não precisei colocar o ../../
import PaletaListaItem from "../PaletaListaItem/PaletaListaItem.jsx";
import { useState, useEffect, useCallback } from "react";
import { PaletaService } from "services/PaletaService";
import PaletaDetalhesModal from "components/PaletaDetalhesModal/PaletaDetalhesModal";
import { ActionMode } from "constants/index";

function PaletaLista({ paletaCriada, mode, updatePaleta, deletePaleta, paletaEditada, paletaRemovida }) {

// se eu precisar usar uma informação do próprio localstore eu uso o getItem
  const selecionadas = JSON.parse(localStorage.getItem('selecionadas')) ?? {};



  const [paletas, setPaletas] = useState([]);

  //        valor atual        func que altera a outra         valor inicial um obj vazio
  const [paletaSelecionada, setPaletaSelecionada] = useState(selecionadas);

  const [paletaModal, setPaletaModal] = useState(false);

  const paleta = {
    titulo: "Açaí com Leite Condensado",
    descricao:
      "Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
    foto: "assets/images/acai-com-leite-condensado.png",
    preco: 10.0,
    sabor: "Açaí",
    recheio: "Leite Condensado",
    possuiRecheio: true,
  };

  // esse parametro vem do button
  const adicionarItem = (paletaIndex) => {
    const paleta = {
      //objeto paletaIndex = chave. pegando o valor atual da paleta paletaIndex
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1,
    };
    // primeiro é o valor atual o segunda vai substiruir ele
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };





  const setSelecionadas = useCallback(() => {
    if(!paletas.length) return

    const entries = Object.entries(paletaSelecionada);
    const sacola = entries.map(arr => ({
      paletaId: paletas[arr[0]].id,
      quantidade: arr[1]
    }))

    localStorage.setItem('sacola', JSON.stringify(sacola))
    localStorage.setItem('selecionadas', JSON.stringify(paletaSelecionada))
  }, [ paletaSelecionada, paletas ])





  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const getLista = async () => {
    const response = await PaletaService.getLista();
    setPaletas(response);
  };

  const getPaletaById = async (paletaId) => {
    const response = await PaletaService.getById(paletaId);

    const mapper = {
      [ActionMode.NORMAL]: () => setPaletaModal(response),
      [ActionMode.ATUALIZAR]: () => updatePaleta(response),
      [ActionMode.DELETAR]: () => deletePaleta(response),
    };

    mapper[mode]();
  };

/*
Note também que há a importação e o uso do hook useCallback. Ele é necessário para indicarmos quando há um hook de useState sendo referenciado dentro de um hook de useEffect
*/




  const adicionaPaletaNaLista = useCallback(
    (paleta) => {
      const lista = [...paletas, paleta];
      setPaletas(lista);
    },
    [paletas]
  );
  useEffect(() => {
    setSelecionadas();
  }, [ setSelecionadas, paletaSelecionada ]);



  
  useEffect(() => {
    if (
      paletaCriada &&
      !paletas.map(({ id }) => id).includes(paletaCriada.id)
    ) {
      adicionaPaletaNaLista(paletaCriada);
    }
  }, [adicionaPaletaNaLista, paletaCriada, paletas]);

  // algum acoisa tem que invocar este função
  // quando o componente for renderizado ele invoca a função
  //o primeiro é uma função e o segundo um array vazio para evitar o loop
  useEffect(() => {
    getLista();
  }, [paletaEditada, paletaRemovida]);

  /*
Observe que como segundo parâmetro passamos um array vazio e é importante informar este parâmetro ao useEffect pois sem ele a aplicação entraria em looping infinito, dado que sempre que há uma atualização em um hook de useState que faz alterações no template/ view será acionado o hook de useEffect, que neste caso fará a chamada da requisição de dados para a API e assim por diante
*/

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        //adicionamos a nossa key
        <PaletaListaItem
          mode={mode}
          key={`PaletaListaItem-${index}`}
          paleta={paleta}
          quantidadeSelecionada={paletaSelecionada[index]}
          index={index}
          onAdd={(index) => adicionarItem(index)}
          onRemove={(index) => removerItem(index)}
          clickItem={(paletaId) => getPaletaById(paletaId)}
        />
      ))}
      {paletaModal && (
        <PaletaDetalhesModal
          paleta={paletaModal}
          closeModal={() => setPaletaModal(false)}
        />
      )}
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
