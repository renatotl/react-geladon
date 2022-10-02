import { Api } from "helpers/Api";

//pega toda resposta da requisiçã do backend vai ser convertida em json
const parseResponse = (response) => response.json();

// recebe um parametro paleta
const transformPaleta = (paleta) => {
  // a função spilt quebra um string ele é chamada dividir
  const [sabor, recheio] = paleta.sabor.split(" com ");
  // o _id vem da api
  return {
    ...paleta,
    id: paleta._id,
    titulo: paleta.sabor,
    sabor,
    ...(recheio && { recheio }),
    possuiRecheio: Boolean(recheio),
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((paletas) => paletas.map(transformPaleta));

//esse code é exclusivo para pegar o id
const parseTransformItem = (response) =>
  parseResponse(response).then(transformPaleta);

export const PaletaService = {
  getLista: () =>
    fetch(Api.paletaLista(), { method: "GET" }).then(parseTransformLista), // then e então apos consegui as resposta converte em json pelo parseResponse
  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseTransformItem),
  create: (paleta) =>
    fetch(Api.createPaleta(), {
      method: "POST",
      body: JSON.stringify(paleta),
      mode: "cors",//necessário para o front aceitar
      headers: {
        "Content-Type": "application/json",// typo de conteúdo enviado para api
      },
    }).then(parseTransformItem),
  updateById: (id) =>
    fetch(Api.updatePaletaById(id), { method: "PUT" }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletePaletaById(id), { method: "DELETE" }).then(parseResponse),
};
