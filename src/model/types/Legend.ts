export type Legend = {
  deckId: string;
  textSize: number;
  cards: EditableLegendItemT[][];
}

export enum LegendSourceTypeEnum  {
  image = 'IMAGE',
  text = 'TEXT'
};

export type EditableLegendItemT = {
  id: number,
  source: string,
  positionX: number,
  positionY: number,
  legendSourceType: LegendSourceTypeEnum,
  cardNumber: number,
  imageId: number
}
