import React, { useState } from 'react';
import { Button, Paper, Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import styles from './MyDecks.module.scss';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { mockDecks } from '../../model/types/Deck';
import DeckPreview from '../DeckPreview/DeckPreview';

const MyDecks: React.FC = () => {
  const [currentTab, changeTab] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    changeTab(newValue);
  };

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
      {/*<Tabs
      value={currentTab}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth">
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      <SwipeableViews
      axis={'x'}
      index={currentTab}
      onChangeIndex={changeTab}>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </SwipeableViews>*/}
    </div>
  )
};

export default MyDecks;