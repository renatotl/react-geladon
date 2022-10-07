O que são Componentes?
Os Componentes são funções que, quando executadas, criam um elemento HTML na página.
No caso da função App, essa função retorna um JSX com uma div e um conteúdo nessa div. Quando executarmos essa função, o elemento div aparecerá na página.
No caso do React, tudo inicia no ReactDOM que faz a renderização. O App é chamado e o elemento que este retorna é renderizado na tela.


Function Component x Class Component
Dentro do React existem duas formas de criarmos esses componentes: Function Component e Class Component.
Em resumo, uma classe também é uma função. A diferença é que uma classe é uma função que, quando executada, cria um objeto enquanto que uma função vai executar o bloco de código dentro dela e geralmente vai ter algum retorno, no caso do React, um JSX.
Apesar de muitos exemplos na internet e na documentação do React utilizarem Class Component, é recomendado usar sempre Function Component, pois essa é a direção em que o React moderno está indo


Qual o pensamento por trás dos componentes?
O principal objetivo é a reutilização de elementos.
Além disso, a utilização de componente facilita a criação de elementos maiores, pois eles ficam mais simples.
Outra vantagem é a abstração, fazendo com que determinada lógica fique dentro de partes isoladas do sistema, facilitando a manutenção e legibilidade do código.

A princípio, o React é um projeto Node no qual utilizaremos o conceito de build.


