import React, { useCallback, useEffect, useState } from 'react';
import styles from './AllDecks.module.scss';
import { CircularProgress, Container, Paper, Typography } from '@material-ui/core';
import { Deck } from '../../model/types/Deck';
import InfiniteScroll from 'react-infinite-scroller';
import DeckPreview from '../DeckPreview/DeckPreview';
import { StoreState } from '../../modules/types';
import { page, loading, decks, last } from '../../modules/decks/selectors';
import { getDecksRequest } from '../../modules/decks/actions';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import throttle from 'lodash/throttle';

type Props = {
  decks: Deck[];
  loading: boolean;
  page: number;
  last: boolean;
  getDecksRequest: (page: number, search?: string, reset?: boolean) => void
}

const AllDecks: React.FC<Props> = ({decks, getDecksRequest, last, page, loading}) => {
  useEffect(() => {
    if (!decks.length) {
      getDecksRequest(page + 1);
    }
  }, []);

  const [search, setSearch] = useState<string>('');
  const throttledSearch = useCallback(throttle(search => getDecksRequest(0, search, true), 1000, {trailing: true, leading: false}), []);
  const searchInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    throttledSearch(e.target.value);
    setSearch(e.target.value);
  };
  const enterPressed = (e: React.KeyboardEvent) =>{
    if (e.key === 'Enter') {
      getDecksRequest(0, search, true);
    }
  };

  const getNextPage = () => {
    if (!loading) {
      getDecksRequest(page + 1);
    }
  };

  return (
    <Container className={styles.wrapper}>
      <Paper className={styles.paper}>
        <Typography variant='h3'>All decks</Typography>
        <div className={styles.searchContainer}>
          <TextField
            autoFocus
            margin="dense"
            label="Search"
            type="text"
            variant='outlined'
            value={search}
            onChange={searchInputChanged}
            onKeyDown={enterPressed}
            className={styles.search}
          />
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextPage}
          hasMore={!last}
          loader={
            <div className={styles.loader} key='loader'>
              <CircularProgress size={30} />
            </div>
          }
        >
          <div className={styles.decks}>
            {decks.map((deck) => <DeckPreview key={deck.id} {...deck} />)}
          </div>
        </InfiniteScroll>
        {!decks.length && !loading && (
          <div className={styles.empty}>
            No data
          </div>
        )}
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state: StoreState) => ({
  decks: decks(state),
  loading: loading(state),
  page: page(state),
  last: last(state)
});

const mapDispatchToProps = {
  getDecksRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDecks);
