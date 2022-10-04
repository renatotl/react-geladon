import "./PaletaListaItem.css";
import { ActionMode } from "constants/index";

function PaletaListaItem({
  paleta,
  quantidadeSelecionada,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  /* PROPRIEDADES PARAMETRIZÁVEIS
    FILHO PARA PAI
    //DADOS MOCADOS DE EXEMPLO
    const removerItem = (i) => console.log('remover' + i);
	const adicionarItem = (i) => console.log('adicionar' + i);
*/

  /*

 PAI PARA FILHO
    const paletaSelecionada = [0];// simulando o state vazio
	const index = 0;
	const paleta = {
		titulo: "Açaí com Leite Condensado",
		descricao:
		"Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
		foto: require("assets/images/acai-com-leite-condensado.png"),
		preco: 10.0,
		sabor: "Açaí",
		recheio: "Leite Condensado",
		possuiRecheio: true,

    }
*/

  //RENDERIZAÇÃO CONDICIONAL
  // função possui 2 parãmetros o primeiro é a condição e o segundo o index da paleta selecionada
  // ele renderiza o SPAN
  const badgeCounter = (canRender, index) =>
    Boolean(canRender) && (
      <span className="PaletaListaItem__badge"> {quantidadeSelecionada} </span>
    );

  // o "e" dentro do onClick é porque estamos captando o evento e o e.stopPropagation() se referindo a esse evento
  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        remover
      </button>
    );

  // ela renderiza o span com o valor que está no node
  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`PaletaListaItem__tag ${
            mode === ActionMode.DELETAR && "PaletaListaItem__tag--deletar"
          }`}
        >
          {" "}
          {mode}{" "}
        </span>
      );
  };

  // o primeiro é o index da paleta selecionada que se refere ao canRnder que dendo valor vira TRUE
  //{badgeCounter(paletaSelecionada[index], index)}

  // o primeiro div className="PaletaListaItem sempre que eu clicar em uma paleta vou pegar o id dela que eu quero exibir em tela
  return (
    <div
      className={`
      PaletaListaItem
      ${mode !== ActionMode.NORMAL && "PaletaListaItem--disable"}
      ${mode === ActionMode.DELETAR && "PaletaListaItem--deletar"}
    `}
      onClick={() => clickItem(paleta.id)}
    >
      {badgeCounter(quantidadeSelecionada, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
      <div>
        <div className="PaletaListaItem__titulo"> {paleta.titulo} </div>
        <div className="PaletaListaItem__preco">
          {" "}
          R$ {paleta.preco.toFixed(2)}{" "}
        </div>
        <div className="PaletaListaItem__descricao"> {paleta.descricao} </div>
        <div className="PaletaListaItem__acoes Acoes">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`Acoes__adicionar ${
              !quantidadeSelecionada && "Acoes__adicionar--preencher"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index);
            }}
          >
            adicionar
          </button>
          {removeButton(quantidadeSelecionada, index)}
        </div>
      </div>
      <img
        className="PaletaListaItem__foto"
        src={paleta.foto}
        alt={`Paleta de ${paleta.sabor}`}
      />
    </div>
  );
}

export default PaletaListaItem;

/* Apesar de implementado a funcionalidade de fechar atualmente não temos como abrir o modal. É necessário implementar um evento de click sobre cada item renderizado na lista.
Para conseguirmos esse feito vamos adicionar no arquivo PaletaListaItem.jsx as alterações necessárias para a emissão/passagem de informações de um componente filho para um componente pai. Neste caso iremos adicionar como parâmetro desconstruído na assinatura de método do componente a propriedade clickItem para realizar essa função e em seguida adicionar o evento de onClick no elemento HTML raiz deste componente emitindo para o componente pai a propriedade de id da paleta para ser buscada de forma unitária e apresentada no modal.
Mas como neste card existem botões realizando a chamada de funções, precisamos adicionar nestes clicks a recepção do evento de mouse e execução da função stopPropagation() como forma de prevenir e evitar o efeito de event bubbling, caso contrário, todo click nestes botões acionariam também a emissão da passagem de dados/evento de clickItem que para nosso objetivo servirá de gatilho para a chamada de dados da API e consequentemente a abertura do modal.
Assim obteremos a seguinte estrutura em PaletaListaItem.jsx:
 */
