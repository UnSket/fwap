export const ROUTE_PATHS = {
  login: '/',
  myDecks: '/myDecks',
  createDeck: '/createDeck',
  editDeck: {
    base: '/editDeck',
    withID: (id: string | number) => `/editDeck/${id}`,
    route: '/editDeck/:deckId'
  }
};
