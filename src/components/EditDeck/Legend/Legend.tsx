import React from 'react';
import styles from './Legend.module.scss';
import { Typography } from '@material-ui/core';
import AddLegend from './AddLegend/AddLegend';
import { Deck } from '../../../model/types/Deck';
import EditLegend from './EditLegend/EditLegend';
import {legendState} from '../../../modules/userDecks/selectors';
import { StoreState } from '../../../modules/types';
import { connect } from 'react-redux';
import { classes } from '../../utils/utils';

type Props = {
  deck: Deck,
  left: number,
  loading: boolean,
  error?: string | null
};

const Legend: React.FC<Props> = ({deck, left, loading, error}) => {
  const leftTexts = deck.images.filter(image => !image.text).length;

  if (left) {
    return <p className={styles.notification}>You should upload {left} more files to see legend!</p>
  }

  if (error) {
    return <p className={classes(styles.notification, styles.error)}>{error}</p>
  }

  if (leftTexts) {
    return (
      <div className={styles.container}>
        <Typography variant='h4' gutterBottom>Add legend to every image(left {leftTexts})</Typography>
        <AddLegend image={deck.images.find(images => !images.text)!} deckId={deck.id} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant='h4' gutterBottom>Edit legend</Typography>
      <EditLegend deckId={deck.id} legend={deck.legend} loading={loading} images={deck.images} />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  ...legendState(state)
});

export default connect(mapStateToProps)(Legend);
