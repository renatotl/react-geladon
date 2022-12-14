import { useState, useEffect } from "react";
import Modal from "components/Modal/Modal";
import "./AdicionaEditaPaletaModal.css";
import { PaletaService } from "services/PaletaService.js";
import { ActionMode } from "constants/index";


function AdicionaEditaPaletaModal({
  closeModal,
  onCreatePaleta,
  mode,
  paletaToUpdate,
  onUpdatePaleta,
}) {
  // nossas propriedades que o cliente vai digitar
  const form = {
    //se tiver NULL ou UNDEFINED  minha string ficaráa vazia
    preco: paletaToUpdate?.preco ?? "",
    sabor: paletaToUpdate?.sabor ?? "",
    recheio: paletaToUpdate?.recheio ?? "",
    descricao: paletaToUpdate?.descricao ?? "",
    foto: paletaToUpdate?.foto ?? "",
  };

  // este state tem relaçõpes com o form
  const [state, setState] = useState(form);

  // primeiro evento é alteração que vai ocorrer no campo o segundo é a propriedade name
  //o spredi operation espalha tudo o segundo é minha propriedade e name está sendo vinculado com o valor digitado. exemlpo o valor proço passa para preço
  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  //responsável por desabiliatar o botão
  const [canDisable, setCanDisable] = useState(true);

  // função verifica se os campos estão preechidos ou não
  const canDisableSendButton = () => {
    const response = !Boolean(
      // o . length verifica se há alguma informação no campo
      state.descricao.length &&
        state.foto.length &&
        state.sabor.length &&
        state.preco.length
      // se todos os campos estam preenchidos eles são TRUE, mas nossa boolean altera para FALSE e quarda na variável response FALSE. o Boolean inverte o resultado
    );

    setCanDisable(response);
  };
  // controlando o ciclo de vida do componente
  useEffect(() => {
    canDisableSendButton();
  });

  // função que controla o botão enviar
  const handleSend = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split(/\\|\//).pop();

    const { sabor, recheio, descricao, preco, foto } = state;

    const titulo = sabor + (recheio && " com " + recheio);

    const paleta = {
      ...(paletaToUpdate && { _id: paletaToUpdate?.id }),
      sabor: titulo,
      descricao,
      preco,
      foto: `assets/images/${renomeiaCaminhoFoto(foto)}`,
    };

    const serviceCall = {
      //Alteração entre atualizar e normal
      [ActionMode.NORMAL]: () => PaletaService.create(paleta),
      [ActionMode.ATUALIZAR]: () =>
        PaletaService.updtateById(paletaToUpdate?.id, paleta),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      // se for NORMAL ele ele aciona o onCreatePaleta(response)
      [ActionMode.NORMAL]: () => onCreatePaleta(response),
      [ActionMode.ATUALIZAR]: () => onUpdatePaleta(response),
    };

    actionResponse[mode]();

    const reset = {
      preco: "",
      sabor: "",
      recheio: "",
      descricao: "",
      foto: "",
    };

    setState(reset);

    closeModal();
  };

  // o closeModal veio por parâmetro
  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaPaletaModal">
        <form autoComplete="off">
          <h2>
            {" "}
            {ActionMode.ATUALIZAR === mode ? "Atualizar" : "Adicionar ao"}{" "}
            Cardápio{" "}
          </h2>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="preco">
              {" "}
              Preco:{" "}
            </label>
            <input
              id="preco"
              placeholder="10,00"
              type="text"
              value={state.preco}
              onChange={(e) => handleChange(e, "preco")}
              required
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="sabor">
              {" "}
              Sabor:{" "}
            </label>
            <input
              id="sabor"
              placeholder="Chocolate"
              type="text"
              value={state.sabor}
              onChange={(e) => handleChange(e, "sabor")}
              required
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="recheio">
              {" "}
              Recheio:{" "}
            </label>
            <input
              id="recheio"
              placeholder="Banana"
              type="text"
              value={state.recheio}
              onChange={(e) => handleChange(e, "recheio")}
            />
          </div>
          <div>
            <label className="AdicionaPaletaModal__text" htmlFor="descricao">
              {" "}
              Descricao:{" "}
            </label>
            <input
              id="descricao"
              placeholder="Detalhe o produto"
              type="text"
              value={state.descricao}
              onChange={(e) => handleChange(e, "descricao")}
              required
            />
          </div>
          <div>
            <label
              className="AdicionaPaletaModal__text  AdicionaPaletaModal__foto-label"
              htmlFor="foto"
            >
              {!state.foto.length ? "Selecionar Imagem" : state.foto}
            </label>
            <input
              className=" AdicionaPaletaModal__foto"
              id="foto"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleChange(e, "foto")}
              required
            />
          </div>

          <button
            className="AdicionaPaletaModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? "Enviar" : "Atualizar"} 
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaPaletaModal;

/* Para integrar os sistemas, precisamos enviar os dados do formulário para o endpoint de criação através do service chamando o método create.
Comece com a criação de uma função assíncrona chamada createPaleta que fará o mapeamento e validação dos dados necessários a serem enviados para a API, a implementação da integração e emissão de fechamento do modal em AdicionaPaletaModal.jsx
*/
