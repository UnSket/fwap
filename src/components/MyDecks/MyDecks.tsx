import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import styles from './MyDecks.module.scss';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Deck } from '../../model/types/Deck';
import DeckPreview from '../DeckPreview/DeckPreview';
import { StoreState } from '../../modules/types';
import { decksById } from '../../modules/userDecks/selectors'
import { getUserDecksRequest } from '../../modules/userDecks/actions'
import { connect } from 'react-redux';

type Props = {
  decksById: {
    [key: string]: Deck
  };
  getUserDecksRequest: () => void
};

const MyDecks: React.FC<Props> = ({ decksById, getUserDecksRequest }) => {
  useEffect(() => {
    getUserDecksRequest();
  }, []);

  const decks = Object.values(decksById);

  return (
    <div className={styles.wrapper}>
      <Container>
        <Paper className={styles.paper}>
          <Typography variant={'h3'} gutterBottom>My decks</Typography>
            <div className={styles.decks}>
              {decks.map((deck) => <DeckPreview key={deck.id} {...deck} own />)}
            </div>
          {!decks.length && (
            <p className={styles.emptyProjects}>You have not created projects yet</p>
          )}
        </Paper>
      </Container>
    </div>
  )
};

const mapStateToProps = (state: StoreState) => ({
  decksById: decksById(state)
});

const mapDispatchToProps = {
  getUserDecksRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDecks);
