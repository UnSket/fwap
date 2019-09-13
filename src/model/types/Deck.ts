import { Image } from './Image';
import { EditableImageT } from './Card';
import { Legend } from './Legend';

export type Deck = {
  name: string,
  description: string,
  id: string,
  images: Image[],
  backsideKey?: string
  cards?: EditableImageT[][]
  imagesRequired: number,
  legend?: Legend
}

export type DeckByID = {
  [key: string]: Deck
}
