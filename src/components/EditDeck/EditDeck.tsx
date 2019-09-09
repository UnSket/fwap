import React, { useCallback, useEffect, useState } from 'react';
import { Container, Paper, Tabs, Typography, Tab } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import { RouteComponentProps } from 'react-router';
import FileManagment from './FileManagment/FileManagment';
import Card from './EditCards/Card/Card';
import logo from '../Header/logo.svg';
import ChangeFileDialog from './ChangeFileDialog/ChangeFileDialog';
import { getDeckRequest, getDeckCardsRequest } from '../../modules/decks/actions';
import { connect } from 'react-redux';
import { decksById } from '../../modules/decks/selectors';
import { StoreState } from '../../modules/types';
import { Deck, DeckByID } from '../../model/types/Deck';
import { Image } from '../../model/types/Image';
import Settings from './Settings/Settings';
import { ImageWithPreview } from '../../model/types/ImageWithPreview';
import { EditableImageT } from '../../model/types/Card';
import EditCards from './EditCards/EditCards';
import { updateImageRequest } from '../../modules/decks/files/actions';
import Legend from './Legend/Legend';

interface MatchParams {
  deckId: string;
}
interface Props extends RouteComponentProps<MatchParams> {
  getDeckRequest: (id: string) => void,
  getDeckCardsRequest: (deckId: string) => void,
  decksById: DeckByID
}
type DialogData = {
  isOpen: boolean,
  saveHandler: (images: Array<File | Blob>) => void
}
export const OpenChangeFileModalContext = React.createContext<(saveHandler: (images: Array<File | Blob>) => void) => void>(() => {});

const useDeck = (decksById: DeckByID, currentDeckId: string) => {
  const [deck, setDeck] = useState<Deck | null>(null);
  useEffect(() => {
    const currentDeck = decksById[currentDeckId];
    setDeck(currentDeck);
  }, [decksById, currentDeckId]);
  return deck;
};

const EditDeck: React.FC<Props> = ({match, decksById, getDeckRequest, getDeckCardsRequest}) => {
  const [currentTab, changeTab] = useState<number>(0);
  const deck: Deck | null = useDeck(decksById, match.params.deckId);
  const [dialogData, setDialogData] = useState<DialogData>({isOpen: false, saveHandler: () => null});
  const _openModal = (saveHandler: (images: Array<File | Blob>) => void) => {
    setDialogData({isOpen: true, saveHandler: saveHandler});
  };
  const closeModal = () => setDialogData({isOpen: false, saveHandler: () => null});
  useEffect(() => {
    if (!deck) getDeckRequest(match.params.deckId);
  }, [deck]);
  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
    changeTab(newValue);
    // loading cards
    if (newValue === 1) {
      getDeckCardsRequest(deck!.id);
    }
  }, [deck]);

  const CurrentTabComponent: React.FC = () => {
    if (!deck) return null;
    switch (currentTab) {
      case 0: return <FileManagment images={deck && deck.images} deckId={deck.id} imagesLeft={20} />;
      case 1: {
        if (deck) {
          return <EditCards cards={deck.cards || []} deckId={deck.id}/>;
        }
        return null;
      }
      case 2: return <Legend deck={deck} />;
      default: return <Settings deck={deck} />;
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
              <Tab label="Files" />
              <Tab disabled={!deck} label="Cards" />
              <Tab disabled={!deck} label="Legend" />
              <Tab disabled={!deck} label="Settings" />
            </Tabs>
            <CurrentTabComponent />
        </Paper>
        <ChangeFileDialog {...dialogData} close={closeModal}/>
      </Container>
    </OpenChangeFileModalContext.Provider>
  )
};

const mapStateToProps = (state: StoreState) => ({
  decksById: decksById(state)
});

const mapDispatchToProps = {
  getDeckRequest,
  getDeckCardsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
