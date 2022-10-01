import "./Overlay.css";



function Overlay({ children, overlayClick }) {
  return (
    <div className="Overlay" onClick={() => overlayClick()}>
      {children}
    </div>
  );
}

export default Overlay;

// O componente children vai ser renderizado dentro da div 






/* Para este componente é necessário que ele seja genérico, afinal pode ser utilizado por inúmeros outros componentes que não só o modal como uma barra lateral etc. Desta maneira, obtemos um click a ser emitido na propriedade overlayClick e um componente filho na propriedade children.
*/

