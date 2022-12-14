import React from "react";// biblioteca react 
import ReactDOM from "react-dom";// biblioteca reactDOM e por meio dela que vamos renderizar os compoentes na tela
import  "./assets/style/main.css"
import App from "App";





//o método render que existe dentro da biblioteca reactDOM
ReactDOM.render(
    //React.StrictMode emite alertas caso tenha algo de errado
    // o que estiver dentro da tag React.StrictMode vai ser renderizado na tela
  <React.StrictMode>
  <App />
  </React.StrictMode>,
  document.getElementById("root")// este root de refere a tag div id root lá no HTML
);