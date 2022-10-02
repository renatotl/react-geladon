import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista.jsx";
import NavBar from "components/NavBar/NavBar.jsx";
import AdicionaPaletaModal from "components/AdicionaPaletaModal/AdicionaPaletaModal";
import { useState } from "react";

function Home() {
  //useState do modal que começa como fechado
  const [canShowAdicionaPaletaModal, setCanShowAdicionaPaletaModal] =
    useState(false);

  const [paletaParaAdicionar, setPaletaParaAdicionar] = useState();

  return (
    <div className="Home">
      <NavBar createPaleta={() => setCanShowAdicionaPaletaModal(true)} />

      <div className="Home__container">
        <PaletaLista paletaCriada={paletaParaAdicionar} />
        {canShowAdicionaPaletaModal && (
          <AdicionaPaletaModal
            closeModal={() => setCanShowAdicionaPaletaModal(false)}
            onCreatePaleta={(paleta) => setPaletaParaAdicionar(paleta)}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
