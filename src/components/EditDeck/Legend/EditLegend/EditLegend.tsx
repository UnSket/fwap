import React, { useCallback, useEffect, useState } from 'react';
import styles from './EditLegend.module.scss';
import { Button } from '@material-ui/core';
import { saveLegendCardsRequest, getDeckLegendRequest } from '../../../../modules/userDecks/actions'
import { connect } from 'react-redux';
import { EditableLegendItemT, Legend } from '../../../../model/types/Legend';
import Card from './Card/Card';
import cloneDeep from 'lodash/cloneDeep';
import TextField from '@material-ui/core/TextField';
import recalculate from '../../../utils/legendRecalculate';
import { Image } from '../../../../model/types/Image';
import ChangeTextDialog from '../ChangeTextDialog/ChangeText';

type Props = {
  legend?: Legend,
  deckId: string,
  getDeckLegendRequest: (deckId: string) => void
  saveLegendCardsRequest: (cards: Array<Array<EditableLegendItemT>>, deckId: string, textSize: number) => void,
  loading: boolean,
  images: Array<Image>,
  isTuned: boolean
}

const useCards = (
  fontSize: number,
  isTuned: boolean,
  saveLegendCardsRequest:  (cards: Array<Array<EditableLegendItemT>>, deckId: string, textSize: number) => void,
  deckId: string,
  initialCards?: Array<Array<EditableLegendItemT>>
) => {
  const [cards, setCards] = useState<Array<Array<EditableLegendItemT>>>([]);

  useEffect(() => {
    let cardsToShow = initialCards || [];
    // is user do not save legend yet calculate positions manual
    if (!isTuned && initialCards) {
      cardsToShow = recalculate(fontSize, initialCards.flat());
      saveLegendCardsRequest(cardsToShow, deckId, fontSize);
    }
    setCards(cardsToShow);
  }, [initialCards]);

  const updateItem = useCallback((updatedItem: EditableLegendItemT, cardIndex: number, imageIndex: number) => {
    const cardsCopy = cloneDeep(cards);
    cardsCopy[cardIndex][imageIndex] = updatedItem;
    setCards(cardsCopy);
  }, [cards]);
  return {cards, updateItem, setCards};
};

const useTextSize = (legend?: Legend) => {
  const defaultTextSize = legend ? legend.textSize : 8;
  const [textSize, setTextSize] = useState<{value: number, error?: string, tempValue: number}>({value: defaultTextSize, tempValue: defaultTextSize});
  useEffect(() => {
    if (legend && !textSize) {
      setTextSize({value: legend.textSize, tempValue: legend.textSize});
    }
  }, [legend]);

  return {textSize, setTextSize};
};

const EditLegend: React.FC<Props> = ({legend, deckId, saveLegendCardsRequest, getDeckLegendRequest, loading, images, isTuned}) => {
  const {textSize, setTextSize} = useTextSize(legend);
  const {cards,  updateItem, setCards} = useCards(textSize.value, isTuned, saveLegendCardsRequest, deckId, legend && legend.cards);
  const textSizeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (value < 8 || value > 26) {
      setTextSize({value: textSize.value, error: 'Bad value', tempValue: value});
      return;
    }
    setTextSize({value, tempValue: value});
    const recalculatedCards = recalculate(value, cards.flat());
    setCards(recalculatedCards);
  };
  const [editingImage, setEditingImage] = useState<Image | null>(null);

  const editImage = useCallback((imageId: number) => {
    const image = images.find(image => image.id === imageId)!;
    setEditingImage(image);
  }, [images]);

  const closeModal = () => setEditingImage(null);

  useEffect(() => {
    if (!legend && !loading) {
      getDeckLegendRequest(deckId);
    }
  }, [legend]);

  const save = useCallback(() => {
    if (!textSize.error) {
      saveLegendCardsRequest(cards, deckId, textSize.value);
    }
  }, [deckId, cards]);

  if (!legend) {
    return null;
  }

  return (
    <>
      <div className={styles.wrapper}>
        {cards.map((items, index) => (
          <Card
            key={index}
            editableItems={items}
            updateItem={(item, imageIndex) => updateItem(item, index, imageIndex)}
            textSize={textSize.value}
            editImage={editImage}
          />
        ))}
      </div>
      <div className={styles.actionPanel}>
        <TextField
          margin="dense"
          id="name"
          label="Size"
          error={!!textSize.error}
          type="number"
          variant='outlined'
          value={textSize.tempValue}
          onChange={textSizeInputHandler}
          fullWidth
          className={styles.size}
        />
        <Button variant="contained" color='primary' className={styles.submit} onClick={save}>
          Save
        </Button>
      </div>
      <ChangeTextDialog image={editingImage} close={closeModal} deckId={deckId} />
    </>
  )
};

const mapDispatchToProps = {
  saveLegendCardsRequest,
  getDeckLegendRequest,
};

export default connect(null, mapDispatchToProps)(EditLegend);
