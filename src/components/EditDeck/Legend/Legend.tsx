import React from 'react';
import styles from './Legend.module.scss';
import { Typography } from '@material-ui/core';
import AddLegend from './AddLegend/AddLegend';
import { Deck } from '../../../model/types/Deck';
import EditLegend from './EditLegend/EditLegend';

type Props = {
  deck: Deck,
  left: number,
  loading: boolean
};

const Legend: React.FC<Props> = ({deck, left, loading}) => {
  const leftTexts = deck.images.filter(image => !image.text).length;

  if (left) {
    return <p className={styles.notification}>You should upload {left} more files to see legend!</p>
  }

  if (!leftTexts) {
    return (
      <div className={styles.container}>
        <Typography variant='h4' gutterBottom>Edit legend</Typography>
        <EditLegend deckId={deck.id} legend={deck.legend} loading={loading} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant='h4' gutterBottom>Add legend to every image(left {leftTexts})</Typography>
      <AddLegend image={deck.images.find(images => !images.text)!} deckId={deck.id} />
    </div>
  );
};

export default Legend;
