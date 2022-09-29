import "./PaletaListaItem.css"

function PaletaListaItem({ paleta, quantidadeSelecionada, index, onRemove, onAdd}){


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
    <span className="PaletaListaItem__badge">
      {" "}
      {quantidadeSelecionada}{" "}
    </span>
  );

  const removeButton = (canRender, index) =>
    Boolean(canRender) && (<button className="Acoes__remover" onClick={() => onRemove(index)}>remover</button>);
  // o primeiro é o index da paleta selecionada que se refere ao canRnder que dendo valor vira TRUE
  //{badgeCounter(paletaSelecionada[index], index)}


    return (
        <div className="PaletaListaItem" >
          {badgeCounter(quantidadeSelecionada, index)}
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
                  !quantidadeSelecionada && "Acoes__adicionar--preencher"
                }`}
                onClick={() => onAdd(index)}
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
    )
}

export default PaletaListaItem;