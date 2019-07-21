export const ROUTE_PATHS = {
  landing: '/',
  myDecks: '/myDecks',
  createDeck: '/createDeck',
  editDeck: {
    base: '/editDeck',
    withID: (id: string) => `/editDeck/${id}`,
    route: '/editDeck/:id'
  }
};
