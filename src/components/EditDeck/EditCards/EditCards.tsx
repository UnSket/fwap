import React, { useCallback, useEffect, useState } from 'react';
import { EditableImageT } from '../../../model/types/Card';
import Card from './Card/Card';
import styles from './EditCards.module.scss';
import cloneDeep from 'lodash/cloneDeep';
import { Button, Fab, Paper } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { saveCardsRequest } from '../../../modules/decks/actions'
import { connect } from 'react-redux';

type Props = {
  cards: Array<Array<EditableImageT>>,
  deckId: string,
  saveCardsRequest: (cards: Array<Array<EditableImageT>>, deckId: string) => void
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

const EditCards: React.FC<Props> = ({cards: initialCards, deckId, saveCardsRequest}) => {
  const {cards, updateImage} = useCards(initialCards);
  console.log(cards.flat(1).length);

  const save = useCallback(() => {
    saveCardsRequest(cards, deckId);
  }, [deckId, cards]);

  return (
    <>
      <div className={styles.wrapper}>
        {cards.map((images, index) => (
          <Card key={index} editableImages={images} updateImage={(image, imageIndex) => updateImage(image, index, imageIndex)} />
        ))}
      </div>
      <Paper className={styles.actionPanel}>
        <Button variant="contained" color='primary' className={styles.submit} onClick={save}>
          Save
        </Button>
      </Paper>
    </>
  )
};

const mapDispatchToProps = {
  saveCardsRequest
};

export default connect(null, mapDispatchToProps)(EditCards);
