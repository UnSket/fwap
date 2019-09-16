import React, { useCallback, useEffect, useState } from 'react';
import styles from './EditLegend.module.scss';
import { Button, Paper, CircularProgress } from '@material-ui/core';
import { saveLegendCardsRequest, getDeckLegendRequest, changeLegendTextSizeRequest } from '../../../../modules/decks/actions'
import { connect } from 'react-redux';
import { EditableLegendItemT, Legend } from '../../../../model/types/Legend';
import Card from './Card/Card';
import cloneDeep from 'lodash/cloneDeep';
import TextField from '@material-ui/core/TextField';

type Props = {
  legend?: Legend,
  deckId: string,
  getDeckLegendRequest: (deckId: string) => void
  saveLegendCardsRequest: (cards: Array<Array<EditableLegendItemT>>, deckId: string) => void,
  changeLegendTextSizeRequest: (textSize: number, deckId: string) => void
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

const useTextSize = (legend?: Legend) => {
  const [textSize, setTextSize] = useState<number>(legend ? legend.textSize : 0);
  useEffect(() => {
    if (legend && !textSize) {
      setTextSize(legend.textSize);
    }
  }, [legend]);

  return {textSize, setTextSize};
};

const EditCards: React.FC<Props> = ({legend, deckId, saveLegendCardsRequest, getDeckLegendRequest, changeLegendTextSizeRequest}) => {
  const {cards,  updateItem} = useCards(legend && legend.cards);
  const {textSize, setTextSize} = useTextSize(legend);
  const textSizeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(+e.target.value);
    changeLegendTextSizeRequest(+e.target.value, deckId);
  };

  useEffect(() => {
    if (!legend) {
      getDeckLegendRequest(deckId);
    }
  }, [legend]);

  const save = useCallback(() => {
    saveLegendCardsRequest(cards, deckId);
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
      <div className={styles.actionPanel}>
        <TextField
          margin="dense"
          id="name"
          label="Size"
          type="number"
          variant='outlined'
          value={textSize}
          onChange={textSizeInputHandler}
          fullWidth
          className={styles.size}
        />
        <Button variant="contained" color='primary' className={styles.submit} onClick={save}>
          Save
        </Button>
      </div>
    </>
  )
};

const mapDispatchToProps = {
  saveLegendCardsRequest,
  getDeckLegendRequest,
  changeLegendTextSizeRequest
};

export default connect(null, mapDispatchToProps)(EditCards);
