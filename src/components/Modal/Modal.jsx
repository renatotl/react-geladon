import "./Modal.css";
import Overlay from "components/Overlay/Overlay";


// o closeModa no Overlay é overlayClick
function Modal({ children, closeModal }) {
    //primeiro prametro e evento de click e o segundo é um boleano true e false 

  const handleClick = (e, canClose) => {
    //stopPropagation() é acionado pelo evento e para o evento. Esse propagation funciona só no evento e
    e.stopPropagation();

    if (canClose) closeModal();
  };



  // o handleClick é responsavel se o modal vai ser fechado ou não
  return (
    <Overlay overlayClick={closeModal}>
      <div className="Modal" onClick={handleClick}>
        <span className="Modal__close" onClick={(e) => handleClick(e, true)}>
          +
        </span>
        <div className="Modal__body">{children}</div>
      </div>
    </Overlay>
  );
}

export default Modal;


/*

o HandleClick vai ser acionado por um evento de click por isso o "e" true vai para canClose. Quando clickar no sinal de + ele envia true para canClose
<span className="Modal__close" onClick={(e) => handleClick(e, true)}>
    */



/*  Event bubbling relaciona-se com a ordem na qual os manipuladores de eventos são chamados quando um elemento está aninhado dentro de um segundo elemento e ambos os elementos registram um ouvinte para o mesmo evento, como o de clique. */

