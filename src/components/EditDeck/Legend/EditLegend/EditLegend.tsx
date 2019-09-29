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
  images: Array<Image>
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
  return {cards, updateItem, setCards};
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

const EditCards: React.FC<Props> = ({legend, deckId, saveLegendCardsRequest, getDeckLegendRequest, loading, images}) => {
  const {cards,  updateItem, setCards} = useCards(legend && legend.cards);
  const {textSize, setTextSize} = useTextSize(legend);
  const textSizeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSize(+e.target.value);
    const recalculatedCards = recalculate(+e.target.value, cards.flat());
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
    saveLegendCardsRequest(cards, deckId, textSize);
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
            textSize={textSize}
            editImage={editImage}
          />
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
      <ChangeTextDialog image={editingImage} close={closeModal} deckId={deckId} />
    </>
  )
};

const mapDispatchToProps = {
  saveLegendCardsRequest,
  getDeckLegendRequest,
};

export default connect(null, mapDispatchToProps)(EditCards);
