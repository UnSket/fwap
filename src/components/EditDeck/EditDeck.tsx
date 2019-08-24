import React, { useEffect, useState } from 'react';
import { Container, Paper, Tabs, Typography, Tab } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import { RouteComponentProps } from 'react-router';
import FileManagment from './FileManagment/FileManagment';
import Card from './Card/Card';
import logo from '../Header/logo.svg';
import ChangeFileDialog from './ChangeFileDialog/ChangeFileDialog';
import { getDeckRequest } from '../../modules/decks/actions';
import { connect } from 'react-redux';
import { decksById } from '../../modules/decks/selectors';
import { StoreState } from '../../modules/types';
import { Deck, DeckByID } from '../../model/types/Deck';

interface MatchParams {
  deckId: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  getDeckRequest: (id: string) => void,
  decksById: DeckByID
}
export const OpenChangeFileModalContext = React.createContext<() => void>(() => {});

const useDeck = (decksById: DeckByID, currentDeckId: string) => {
  const [deck, setDeck] = useState<Deck | null>(null);
  useEffect(() => {
    const currentDeck = decksById[currentDeckId];
    setDeck(currentDeck);
  }, [decksById, currentDeckId]);
  return deck;
};

const EditDeck: React.FC<Props> = ({match, decksById, getDeckRequest}) => {
  const [currentTab, changeTab] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deck = useDeck(decksById, match.params.deckId);
  const _openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    if (!deck) getDeckRequest(match.params.deckId);
  }, []);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    changeTab(newValue);
  };

  const CurrentTabComponent: React.FC = () => {
    switch (currentTab) {
      case 0: return <FileManagment images={deck && deck.images} />;
      case 1: return <Card />;
      case 2: return <span>Edit history</span>;
      default: return <div>settings</div>;
    }
  };

  return (
    <OpenChangeFileModalContext.Provider value={_openModal}>
      <Container className={styles.wrapper}>
        <Paper className={styles.paper}>
          <Typography variant={'h3'} gutterBottom>Edit deck {deck && deck.name}</Typography>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth">
              <Tab label="Image managment" />
              <Tab label="Edit cards" />
              <Tab label="Edit history" />
              <Tab label="Settings" />
            </Tabs>
            <CurrentTabComponent />
        </Paper>
        <ChangeFileDialog isOpen={isOpen} close={closeModal}/>
      </Container>
    </OpenChangeFileModalContext.Provider>
  )
};

const mapStateToProps = (state: StoreState) => ({
  decksById: decksById(state)
});

const mapDispatchToProps = {
  getDeckRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
