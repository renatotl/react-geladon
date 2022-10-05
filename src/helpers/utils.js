
// essa functio normaliza o texto digitado com o padrão normcode e ela recebe uma string
// se estiver em maiúsculo converte para minusculo 
export const NormalizeUtils = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");


    // compara o texto pesquisado com o título da paleta
export const matchByText = (searchedText, title) =>
  NormalizeUtils(searchedText).includes(NormalizeUtils(title));