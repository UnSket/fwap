export enum EditDeckPages {
  files = 'files',
  cards = 'cards',
  legend = 'legend',
  settings ='settings',
  exportCards = 'export-cards',
  exportLegend = 'export-legend',
  exportBackside = 'export-backside'
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
