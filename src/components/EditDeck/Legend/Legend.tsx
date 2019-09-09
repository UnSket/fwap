import React from 'react';
import styles from './Legend.module.scss';
import { Typography } from '@material-ui/core';
import AddLegend from './AddLegend/AddLegend';
import { Deck } from '../../../model/types/Deck';

type Props = {
  deck: Deck
};

const Legend: React.FC<Props> = ({deck}) => {
  return (
    <div className={styles.container}>
      <Typography variant='h4' gutterBottom>Add legend to every image</Typography>
      <AddLegend image={deck.images[0]} deckId={deck.id} />
    </div>
  );
};

export default Legend;
