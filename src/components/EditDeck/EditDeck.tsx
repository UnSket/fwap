import React, { useCallback, useEffect, useState } from 'react';
import { Container, Paper, Tabs, Typography, Tab, CircularProgress } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import { RouteComponentProps } from 'react-router';
import FileManagment from './FileManagment/FileManagment';
import ChangeFileDialog from './ChangeFileDialog/ChangeFileDialog';
import { getDeckRequest, getDeckCardsRequest } from '../../modules/userDecks/actions';
import { connect } from 'react-redux';
import { decksById, loading } from '../../modules/userDecks/selectors';
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
  decksById: DeckByID,
  loading: boolean
}
type DialogData = {
  isOpen: boolean,
  saveHandler: (images: Array<File | Blob>) => void
}
export const OpenChangeFileModalContext = React.createContext<(saveHandler: (images: Array<File | Blob>) => void) => void>(() => {});

const EditDeck: React.FC<Props> = ({match, decksById, getDeckRequest, history, loading}) => {
  const deck: Deck | null = decksById[match.params.deckId];
  const [dialogData, setDialogData] = useState<DialogData>({isOpen: false, saveHandler: () => null});
  const _openModal = (saveHandler: (images: Array<File | Blob>) => void) => {
    setDialogData({isOpen: true, saveHandler: saveHandler});
  };
  const closeModal = () => setDialogData({isOpen: false, saveHandler: () => null});

  useEffect(() => {
    if (!decksById[match.params.deckId] && !loading) {
      getDeckRequest(match.params.deckId);
    }
  }, [deck, loading]);

  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: string) => {
    const path = ROUTE_PATHS.editDeck.withID(match.params.deckId, newValue);
    history.push(path);
  }, [deck]);

  const CurrentTabComponent: React.FC = () => {
    if (!deck) return null;
    switch (match.params.page) {
      case EDIT_DECK_PAGES.files: return <FileManagment images={deck && deck.images} deckId={deck.id} imagesLeft={deck.imagesRequired} />;
      case EDIT_DECK_PAGES.cards: return <EditCards cards={deck.cards} deckId={deck.id} left={deck.imagesRequired} loading={loading}/>;
      case EDIT_DECK_PAGES.legend: return <Legend deck={deck} left={deck.imagesRequired} loading={loading} />;
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
          <div className={styles.content}>
            {loading && (
              <div className={styles.loading}>
                <CircularProgress size={50} />
              </div>
            )}
            <CurrentTabComponent />
          </div>
        </Paper>
        <ChangeFileDialog {...dialogData} close={closeModal}/>
      </Container>
    </OpenChangeFileModalContext.Provider>
  )
};

const mapStateToProps = (state: StoreState) => ({
  decksById: decksById(state),
  loading: loading(state)
});

const mapDispatchToProps = {
  getDeckRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
