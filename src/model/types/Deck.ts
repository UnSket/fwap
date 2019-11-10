import { Image } from './Image';
import { EditableImageT } from './Card';

export type Deck = {
  name: string,
  description: string,
  id: string,
  images: Image[],
  backsideKey?: string
  cards?: EditableImageT[][]
  imagesRequired: number,
}

export type DeckByID = {
  [key: string]: Deck
}
