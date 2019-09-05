import React, { useCallback, useEffect, useState } from 'react';
import { Image } from '../../../model/types/Image';
import keyBy from 'lodash/keyBy';
import { EditableImageT } from '../../../model/types/Card';
import Card from './Card/Card';
import styles from './EditCards.module.scss';
import cloneDeep from 'lodash/cloneDeep';

type Props = {
  cards: Array<Array<EditableImageT>>,
  images: Array<Image>,
  deckId: string,
}

const useCards = (initialCards: Array<Array<EditableImageT>>) => {
  const [cards, setCards] = useState<Array<Array<EditableImageT>>>(initialCards);

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const updateImage = useCallback((updateImage: EditableImageT, cardIndex: number, imageIndex: number) => {
    const cardsCopy = cloneDeep(cards);
    cardsCopy[cardIndex][imageIndex] = updateImage;
    setCards(cardsCopy);
  }, [cards]);
  return {cards, updateImage};
};

const EditCards: React.FC<Props> = ({cards: initialCards, images, deckId}) => {
  const [imagesById] = useState<{[key: string]: Image}>(keyBy(images, 'id'));
  const {cards, updateImage} = useCards(initialCards);

  console.log(cards.flat(1).length);

  return (
    <div className={styles.wrapper}>
      {cards.map((images, index) => (
        <Card key={index} editableImages={images} imagesById={imagesById} updateImage={(image, imageIndex) => updateImage(image, index, imageIndex)} />
      ))}
    </div>
  )
};

export default EditCards;
