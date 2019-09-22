export type Legend = {
  deckId: string;
  textSize: number;
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
  legendSourceType: typeof TYPES.image | typeof TYPES.text,
  cardNumber: number
}
