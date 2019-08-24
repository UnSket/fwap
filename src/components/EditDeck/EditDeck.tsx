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
import { Image } from '../../model/types/Image';
import Settings from './Settings/Settings';
import { ImageWithPreview } from '../../model/types/ImageWithPreview';

interface MatchParams {
  deckId: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  getDeckRequest: (id: string) => void,
  decksById: DeckByID
}
type DialogData = {
  isOpen: boolean,
  saveHandler: (images: Array<ImageWithPreview>) => void
}
export const OpenChangeFileModalContext = React.createContext<(saveHandler: (images: Array<ImageWithPreview>) => void) => void>(() => {});

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
  const deck = useDeck(decksById, match.params.deckId);
  const [dialogData, setDialogData] = useState<DialogData>({isOpen: false, saveHandler: () => null});
  const _openModal = (saveHandler: (images: Array<ImageWithPreview>) => void) => {
    setDialogData({isOpen: true, saveHandler: saveHandler});
  };
  const closeModal = () => setDialogData({isOpen: false, saveHandler: () => null});
  useEffect(() => {
    if (!deck) getDeckRequest(match.params.deckId);
  }, [deck]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    changeTab(newValue);
  };

  const CurrentTabComponent: React.FC = () => {
    switch (currentTab) {
      case 0: return deck ? <FileManagment images={deck && deck.images} deckId={deck.id} /> : null;
      case 1: return <Card />;
      case 2: return <span>Edit history</span>;
      default: return deck ? <Settings deck={deck} /> : null;
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
        {console.log(dialogData)}
        <ChangeFileDialog {...dialogData} close={closeModal}/>
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
