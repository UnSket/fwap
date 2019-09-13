export type Legend = {
  deckId: string;
  tagSize: number;
  cards: EditableLegendItemT[][];
}

export const TYPES = {
  image: 'IMAGE',
  text: 'TEXT'
};

export type EditableLegendItemT = {
  id: number,
  source: string,
  positionX: number,
  positionY: number,
  type: typeof TYPES.image | typeof TYPES.text
}
