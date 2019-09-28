export enum EditDeckPages {
  files = 'files',
  cards = 'cards',
  legend = 'legend',
  settings ='settings',
  export = 'export'
};

export const ROUTE_PATHS = {
  login: '/',
  myDecks: '/myDecks',
  allDecks: '/allDecks',
  createDeck: '/createDeck',
  editDeck: {
    withID: (id: string | number, page?: string) => `/editDeck/${id}/${page || EditDeckPages.files}`,
    route: '/editDeck/:deckId/:page',
  },
  userManagement: '/userManagement'
};
