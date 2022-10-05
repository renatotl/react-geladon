import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Loading.css";




function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("sacola", "[]");
    localStorage.setItem("selecionadas", "{}");


    // o setTimeout deposi de 3 segundos redireciona a gente para a rota "/" que é a rota raiz
    setTimeout(() => {
      navigate("/");
    }, 3000);
  });

  return (
    <div className="Loading">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
