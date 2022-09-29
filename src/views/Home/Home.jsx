import "./Home.css";
import PaletaLista from "../../components/PaletaLista/PaletaLista.jsx";
import sacola from "../../assets/icons/sacola.svg";
import logo from "../../assets/icons/logo.svg";

function Home() {
  return (
    <div className="Home">
      <div className="Home__header Header">
        {/* o rol é nossa linha com o logo e sacola */}
        <div className="row">
          <div className="Header__logo Logo">
            <img
              src={logo}
              width="70px"
              alt="Logo El Geladon"
              className="Logo__icone"
            />
            <span className="Logo__titulo"> El Geladon </span>
          </div>
          <div className="Header__opcoes Opcoes">
            <div className="Opcoes__sacola Sacola">
              <img
                src={sacola}
                width="40px"
                className="Sacola__icone"
                alt="Sacola de compras"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Home__container">
        <PaletaLista />
      </div>
    </div>
  );
}

export default Home;
