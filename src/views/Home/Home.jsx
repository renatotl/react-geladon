import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista.jsx";
import NavBar from "components/NavBar/NavBar.jsx";
import AdicionaEditaPaletaModal from "components/AdicionaEditaPaletaModal/AdicionaEditaPaletaModal";
import { useState } from "react";
import { ActionMode } from "constants/index";
import DeletaPaletaModal from "components/DeletaPaletaModal/DeletaPaletaModal";
import SacolaModal from "components/SacolaModal/SacolaModal";
import { SacolaService } from "services/SacolaService";

function Home() {
  const [canOpenBag, setCanOpenBag] = useState();

  const [paletaRemovida, setPaletaRemovida] = useState();

  const [paletaEditada, setPaletaEditada] = useState();

  // o valor inicial é a ActionMode.NORMAL que foi importada
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  //useState do modal que começa como fechado
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [paletaParaEditar, setPaletaParaEditar] = useState();
  const [paletaParaDeletar, setPaletaParaDeletar] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaParaDeletar(paletaToDelete);
  };

  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaParaEditar(paletaToUpdate);
    setCanShowAdicionaPaletaModal(true);
  };

  const handleCloseModal = () => {
    setCanShowAdicionaPaletaModal(false);
    setPaletaParaAdicionar();
    setPaletaParaDeletar();
    setPaletaParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  const abrirSacola = async () => {
    const lista = JSON.parse(localStorage.getItem("sacola"));
    const sacola = lista.filter((i) => i.quantidade > 0);

    await SacolaService.create(sacola);

    setCanOpenBag(true);
  };

  return (
    <div className="Home">
      <NavBar
        mode={modoAtual}
        createPaleta={() => setCanShowAdicionaPaletaModal(true)}
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
        openBag={abrirSacola}
      />
      <div className="Home__container">
        <PaletaLista
          mode={modoAtual}
          paletaCriada={paletaParaAdicionar}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta}
          paletaEditada={paletaEditada}
          paletaRemovida={paletaRemovida}
        />
        {canShowAdicionaPaletaModal && (
          <AdicionaEditaPaletaModal
            mode={modoAtual}
            paletaToUpdate={paletaParaEditar}
            onUpdatePaleta={(paleta) => setPaletaEditada(paleta)}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
        {paletaParaDeletar && (
          <DeletaPaletaModal
            paletaParaDeletar={paletaParaDeletar}
            closeModal={handleCloseModal}
            onDeletePaleta={(paleta) => setPaletaRemovida(paleta)}
          />
        )}
        {canOpenBag && <SacolaModal closeModal={() => setCanOpenBag(false)} />}
      </div>
    </div>
  );
}

export default Home;
