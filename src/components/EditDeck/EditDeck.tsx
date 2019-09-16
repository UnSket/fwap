import React, { useCallback, useEffect, useState } from 'react';
import { Container, Paper, Tabs, Typography, Tab } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import { RouteComponentProps } from 'react-router';
import FileManagment from './FileManagment/FileManagment';
import ChangeFileDialog from './ChangeFileDialog/ChangeFileDialog';
import { getDeckRequest, getDeckCardsRequest } from '../../modules/decks/actions';
import { connect } from 'react-redux';
import { decksById } from '../../modules/decks/selectors';
import { StoreState } from '../../modules/types';
import { Deck, DeckByID } from '../../model/types/Deck';
import Settings from './Settings/Settings';
import EditCards from './EditCards/EditCards';
import Legend from './Legend/Legend';
import { EDIT_DECK_PAGES, ROUTE_PATHS } from '../../model/constans/routePaths';

interface MatchParams {
  deckId: string;
  page: string;
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

const EditDeck: React.FC<Props> = ({match, decksById, getDeckRequest, getDeckCardsRequest, history}) => {
  const deck: Deck | null = useDeck(decksById, match.params.deckId);
  const [dialogData, setDialogData] = useState<DialogData>({isOpen: false, saveHandler: () => null});
  const _openModal = (saveHandler: (images: Array<File | Blob>) => void) => {
    setDialogData({isOpen: true, saveHandler: saveHandler});
  };
  const closeModal = () => setDialogData({isOpen: false, saveHandler: () => null});
  useEffect(() => {
    if (!deck) getDeckRequest(match.params.deckId);
  }, [deck]);
  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: string) => {
    const path = ROUTE_PATHS.editDeck.withID(match.params.deckId, newValue);
    console.log(path);
    history.push(path);
    // loading cards
    if (newValue === EDIT_DECK_PAGES.cards) {
      getDeckCardsRequest(deck!.id);
    }
  }, [deck]);

  const CurrentTabComponent: React.FC = () => {
    if (!deck) return null;
    switch (match.params.page) {
      case EDIT_DECK_PAGES.files: return <FileManagment images={deck && deck.images} deckId={deck.id} imagesLeft={deck.imagesRequired} />;
      case EDIT_DECK_PAGES.cards: {
        if (deck) {
          return <EditCards cards={deck.cards || []} deckId={deck.id}/>;
        }
        return null;
      }
      case EDIT_DECK_PAGES.legend: return <Legend deck={deck} />;
      default: return <Settings deck={deck} />;
    }
  };

  return (
    <OpenChangeFileModalContext.Provider value={_openModal}>
      <Container className={styles.wrapper}>
        <Paper className={styles.paper}>
          <Typography variant={'h3'} gutterBottom>Edit deck {deck && deck.name}</Typography>
          <Tabs
            value={match.params.page}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth">
              <Tab value={EDIT_DECK_PAGES.files} label="Files" />
              <Tab value={EDIT_DECK_PAGES.cards} disabled={!deck} label="Cards" />
              <Tab value={EDIT_DECK_PAGES.legend} disabled={!deck} label="Legend" />
              <Tab value={EDIT_DECK_PAGES.settings} disabled={!deck} label="Settings" />
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
