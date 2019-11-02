import React, { useCallback, useEffect, useState } from 'react';
import { EditableImageT } from '../../../model/types/Card';
import Card from './Card/Card';
import styles from './EditCards.module.scss';
import cloneDeep from 'lodash/cloneDeep';
import { Button, Paper, Typography } from '@material-ui/core';
import { saveCardsRequest, getDeckCardsRequest } from '../../../modules/userDecks/actions'
import { connect } from 'react-redux';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Cards from '../Export/PDFGenerator/Cards';
import {cardsState} from '../../../modules/userDecks/selectors';
import { StoreState } from '../../../modules/types';
import { classes } from '../../utils/utils';

type Props = {
  cards?: Array<Array<EditableImageT>>,
  deckId: string,
  saveCardsRequest: (cards: Array<Array<EditableImageT>>, deckId: string) => void,
  left: number,
  getDeckCardsRequest: (deckId: string) => void,
  loading: boolean,
  error?: string | null
}

const useCards = (initialCards?: Array<Array<EditableImageT>>) => {
  const [cards, setCards] = useState<Array<Array<EditableImageT>>>(initialCards || []);

  useEffect(() => {
    setCards(initialCards || []);
  }, [initialCards]);

  const updateImage = useCallback((updateImage: EditableImageT, cardIndex: number, imageIndex: number) => {
    const cardsCopy = cloneDeep(cards);
    cardsCopy[cardIndex][imageIndex] = updateImage;
    setCards(cardsCopy);
  }, [cards]);
  return {cards, updateImage};
};

const EditCards: React.FC<Props> = ({cards: initialCards, deckId, saveCardsRequest, left, loading, getDeckCardsRequest, error}) => {
  const {cards, updateImage} = useCards(initialCards);

  useEffect(() => {
    if (!left && !loading && !initialCards && !error) {
      getDeckCardsRequest(deckId);
    }
  }, [loading]);

  const save = useCallback(() => {
    saveCardsRequest(cards, deckId);
  }, [deckId, cards]);

  if (left) {
    return <p className={styles.notification}>You should upload {left} more files to see cards!</p>
  }

  if (error) {
    return <p className={classes(styles.error, styles.notification)}>{error}</p>
  }

  return (
    <>
      <Typography variant='h4' gutterBottom>Edit cards</Typography>
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

const mapStateToProps = (state: StoreState) => ({
  ...cardsState(state)
});

const mapDispatchToProps = {
  saveCardsRequest,
  getDeckCardsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCards);
