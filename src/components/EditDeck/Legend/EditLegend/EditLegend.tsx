import React, { useCallback, useEffect, useState } from 'react';
import styles from './EditLegend.module.scss';
import { Button, Paper, CircularProgress } from '@material-ui/core';
import { saveCardsRequest, getDeckLegendRequest } from '../../../../modules/decks/actions'
import { connect } from 'react-redux';
import { EditableLegendItemT, Legend } from '../../../../model/types/Legend';
import Card from './Card/Card';
import cloneDeep from 'lodash/cloneDeep';

type Props = {
  legend?: Legend,
  deckId: string,
  getDeckLegendRequest: (deckId: string) => void
  saveCardsRequest: (cards: Array<Array<EditableLegendItemT>>, deckId: string) => void
}

const useCards = (initialCards?: Array<Array<EditableLegendItemT>>) => {
  const [cards, setCards] = useState<Array<Array<EditableLegendItemT>>>(initialCards || []);

  useEffect(() => {
    setCards(initialCards || []);
  }, [initialCards]);

  const updateItem = useCallback((updatedItem: EditableLegendItemT, cardIndex: number, imageIndex: number) => {
    const cardsCopy = cloneDeep(cards);
    cardsCopy[cardIndex][imageIndex] = updatedItem;
    setCards(cardsCopy);
  }, [cards]);
  return {cards, updateItem};
};

const EditCards: React.FC<Props> = ({legend, deckId, saveCardsRequest, getDeckLegendRequest}) => {
  const {cards,  updateItem} = useCards(legend && legend.cards);

  console.log(legend);

  useEffect(() => {
    if (!legend) {
      getDeckLegendRequest(deckId);
    }
  }, [legend]);

  const save = useCallback(() => {
    saveCardsRequest(cards, deckId);
  }, [deckId, cards]);

  if (!legend) {
    return (
      <div className={styles.progress}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <div className={styles.wrapper}>
        {cards.map((images, index) => (
          <Card key={index} editableImages={images} updateItem={(item, imageIndex) => updateItem(item, index, imageIndex)} textSize={legend.textSize}/>
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
  saveCardsRequest,
  getDeckLegendRequest
};

export default connect(null, mapDispatchToProps)(EditCards);
