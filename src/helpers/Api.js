const PaletaContext = {
    //rota principal
    paletaEndpoint: () => `${Api.baseUrl}/paletas`,
    paletaLista: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
    paletaById: (id) => `${PaletaContext.paletaEndpoint()}/one-paleta/${id}`,
    createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
    updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
    deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`,
  };
  
  const SacolaContext = {
    getSacola: () => `${PaletaContext.paletaEndpoint()}/all-carrinho`,
    createSacola: () => `${PaletaContext.paletaEndpoint()}/create-carrinho`,
    purchase: () => `${PaletaContext.paletaEndpoint()}/finish-carrinho`,
  }
    
  export const Api = {
    //baseUrl tem o valor da api no heroku
    baseUrl: "https://api-elgeladon.herokuapp.com",
    // o espred operation pega todos os dados da PaletaContext
    ...PaletaContext,
    ...SacolaContext,
  };