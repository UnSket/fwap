import React from 'react';
import { Paper } from '@material-ui/core';
import styles from './MyDecks.module.scss';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { mockDecks } from '../../model/types/Deck';
import DeckPreview from '../DeckPreview/DeckPreview';

const MyDecks: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <Paper className={styles.paper}>
          <Typography variant={'h3'} gutterBottom>My decks</Typography>
            <div className={styles.decks}>
              {mockDecks.map(deck => <DeckPreview key={deck.id} {...deck} own />)}
            </div>
        </Paper>
      </Container>
    </div>
  )
};

export default MyDecks;