O que é React?
O React foi desenvolvido para ter uma adoção gradual. Você pode tanto usá-lo em um site existente quanto criar um site do zero utilizando o React.
Podemos pegar um site que foi desenvolvido apenas em HTML, CSS e JS e inserir o React nele.
De forma simples, o React pode ser implementado através de scripts no head do código HTML, da mesma forma como importamos scripts do JS.
Os dois primeiros serão responsáveis por importar o React no código e o terceiro é o Babel, responsável por transformar o código React em JavaScript e assim ser capaz de ser lido pelo navegador.
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ReactJS Intro</title>

    <!--Carrega o React, React Dom e Babel-->
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/babel-standalone@6/babel.min.js"
    ></script>
  </head>

  <body></body>
</html>
E para dar início à implementação, vamos inserir uma div com texto no body para podermos visualizar no navegador, identificando-a com um id="root" pois é dentro dessa "div raiz" que vamos configurar o funcionamento do React.
  <body>
    <div id="root">Root</div>
  </body>
A partir disso vamos inserir um script e dentro dele declaramos uma função, sendo esta função no React, um componente. A diferença de uma função tradicional em JS é que a função em React pode retornar um conteúdo mesclado com HTML: um JavaScript estendido chamado de JSX.
  <!--Precisa indicar para o Babel que ele deve transpilar o código-->
  <script type="text/babel">
    // Cria um componente chamado App
    // O componente retorna JSX e por isso o Babel irá transformar o mesmo 
    function App() {
      return <div>Meu App</div>;
    }
  </script>
Logo em seguida, utilizamos o ReactDOM. O DOM é o documento HTML da página e o React tem o seu próprio manipulador DOM, onde ele trabalha para fazer todas modificações e depois replica para o DOM do HTML.
Utilizamos o método render para renderizar a função que declaramos, apontando o elemento raiz que configuramos com o id="root", sendo a partir dessa div que o React irá renderizar o(s) componente(s).
  <!--Precisa indicar para o Babel que ele deve transpilar o código-->
  <script type="text/babel">
    // Cria um componente chamado App
    // O componente retorna JSX e por isso o Babel irá transformar o mesmo
    function App() {
      return <div>Meu App</div>;
    }

    // Renderiza o componente App no elemneto que tiver id = root
    ReactDOM.render(<App />, document.getElementById("root"));
  </script>
No fim, o arquivo HTML ficará assim:
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ReactJS Intro</title>

    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/babel-standalone@6/babel.min.js"
    ></script>
  </head>

  <body>
    <div id="root">Root</div>
  </body>

  <script type="text/babel">
    function App() {
      return <div>Meu App</div>;
    }

    ReactDOM.render(<App />, document.getElementById("root"));
  </script>
</html>
Agora você pode abrir o arquivo HTML, utilizando o Live Server do VSCode, tendo esse retorno:

O React é uma biblioteca pelo simples de fato de conseguirmos instalar como um script normal, em uma página normal e renderizar o HTML que precisamos.
Exercícios
Note que é possível modificar o id="root" para qualquer outro id, modificando também o id no método de renderização. A utilização root é por simples convenção e também a nomenclatura padrão para o React.
Caso no projeto existente já haja algum elemento com id="root", é possível mudar tranquilamente para id="react" por exemplo, para organizar semanticamente a transição do projeto para React.
Observe a sintaxe de como é renderizar um componente Home dentro do componente <App />:
  <script type="text/babel">
    function App() {
      return <div>Meu App <Home /></div>;
    }
  
    function Home() {
      return <div>Home</div>
    }
  
    ReactDOM.render(<App />, document.getElementById("react"));
  </script>
Aqui, criamos uma função Home com um retorno simples apenas para referência, e adicionamos o componente através da tag <Home /> dentro do retorno do componente App.

Adicione mais componentes para praticar!
Dica: também é possível adicionar componentes em arrow functions! Um dentro do outro...

E assim a magia do React se inicia!




TODO ELEMENTO REACT retorna uma função e retorn jsx

Afinal, como é um elemento em React?
Para começar, vamos usar o seguinte exemplo de código HTML:
  <!DOCTYPE html>
  <html lang="pt-br">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>ReactJS Intro</title>
  
      <script
        crossorigin
        src="https://unpkg.com/react@16/umd/react.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/babel-standalone@6/babel.min.js"
      ></script>
    </head>
  
    <body>
      <div id="root">Root</div>
    </body>
  
    <script type="text/babel">
      function App() {
        return <div>Meu App</div>;
      }
  
      ReactDOM.render(<App />, document.getElementById("root"));
    </script>
  </html>
Para entender como o Babel transforma o código em React (Javascript + HTML) em um código JS entendível pelo navegador, vamos utilizar o Babel Compiler e ver como a transpilação acontece.
Começando pela função App, vemos que ele transforma a sintaxe do JSX em uma função createElement tendo como argumentos a tag HTML, um segundo argumento null e o terceiro sendo o conteúdo:




Se agora colocarmos um id nessa div, aquele segundo argumento que era null recebe um objeto contendo esse id:

Agora se quisermos passar um class devemos passar como className porque class é uma palavra reservada do JavaScript e pode dar problema:

Se quisermos renderizar esse componente, inserimos a função render do ReactDOM tendo o seguinte retorno em JS:

Utilizando o createElement sabendo que o App é uma função, ele vai executá-la e assim criar a div com o conteúdo informado.
Sem o React, o DOM é extremamente trabalhoso com JavaScript puro.
Todo o elemento em React, na verdade, é uma função que retorna JSX. Tudo o que colocarmos em React, o Babel transformará em uma função JavaScript.
O JavaScript consegue criar elementos na própria página, a diferença é que para o React conseguir fazer a magia, toda a criação de elemento deve passar por ele, para que toda a complexidade seja abstraída, trazendo assim, a possibilidade de mesclar JavaScript com HTML, formando assim, um componente com todos os elementos visuais e funções deste componente.
Durante o curso vamos aprender a desenvolver "componentes completos" com React (JS + HTML + CSS), a ponto de tornar estes componentes reutilizáveis no próprio ou em outros projetos!


REACT:

function App() {
        return <div id="app">Meu App</div>;
      }

BABEL: 

function App() {
  return /*#__PURE__*/React.createElement("div", {
    id: "app"
  }, "Meu App");
}


