import React from 'react';
import styles from './Legend.module.scss';
import { Typography } from '@material-ui/core';
import AddLegend from './AddLegend/AddLegend';
import { Deck } from '../../../model/types/Deck';
import EditLegend from './EditLegend/EditLegend';

type Props = {
  deck: Deck
};

const Legend: React.FC<Props> = ({deck}) => {
  const left = deck.images.filter(image => !image.text).length;

  if (!left) {
    return (
      <div className={styles.container}>
        <Typography variant='h4' gutterBottom>Edit legend</Typography>
        <EditLegend deckId={deck.id} legend={deck.legend} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant='h4' gutterBottom>Add legend to every image(left {left})</Typography>
      <AddLegend image={deck.images.find(images => !images.text)!} deckId={deck.id} />
    </div>
  );
};

export default Legend;
