import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Loading from "./views/Loading/Loading";




// retorna <BrowserRouter> como se fosse  o container o Route é cada rota individualmente 

// "path" é o caminho e qual é esse caminha é o: "/". Quando ele vai renderizr quando acessar  "/" localhost:3000? ele vai renderizar  o componente <Home />
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
