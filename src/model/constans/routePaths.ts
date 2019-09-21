export const ROUTE_PATHS = {
  login: '/',
  myDecks: '/myDecks',
  allDecks: '/allDecks',
  createDeck: '/createDeck',
  editDeck: {
    withID: (id: string | number, page?: string) => `/editDeck/${id}/${page || EDIT_DECK_PAGES.files}`,
    route: '/editDeck/:deckId/:page',
  },
  userManagement: '/userManagement'
};

export const EDIT_DECK_PAGES = {
  files: 'files',
  cards: 'cards',
  legend: 'legend',
  settings: 'settings'
};
