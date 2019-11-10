import React, { useCallback, useEffect, useState } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core';
import styles from './EditDeck.module.scss';
import { RouteComponentProps } from 'react-router';
import FileManagment from './FileManagment/FileManagment';
import ChangeFileDialog from './ChangeFileDialog/ChangeFileDialog';
import { getDeckRequest } from '../../modules/userDecks/actions';
import { connect } from 'react-redux';
import { decksById, loading } from '../../modules/userDecks/selectors';
import { StoreState } from '../../modules/types';
import { Deck, DeckByID } from '../../model/types/Deck';
import Settings from './Settings/Settings';
import EditCards from './EditCards/EditCards';
import Legends from'./EditLegends/Legends';
import { EditDeckPages, ROUTE_PATHS } from '../../model/constans/routePaths';
import { NavLink } from 'react-router-dom';
import ExportCards from './Export/Cards/Cards';
import ExportLegend from './Export/Legend/Legends';
import ExportBackside from './Export/Backside/Backside';

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
  const {params: {deckId}} = match;
  const deck: Deck | null = decksById[match.params.deckId];
  const [dialogData, setDialogData] = useState<DialogData>({isOpen: false, saveHandler: () => null});
  const _openModal = (saveHandler: (images: Array<File | Blob>, bgCleanUpFlags?: boolean) => void) => {
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
      case EditDeckPages.files: return <FileManagment images={deck && deck.images} deckId={deckId} imagesRequired={deck.imagesRequired} />;
      case EditDeckPages.cards: return <EditCards cards={deck.cards} deckId={deck.id} left={deck.imagesRequired} />;
      case EditDeckPages.legend: return <Legends deck={deck} />;
      case EditDeckPages.exportCards: return <ExportCards deck={deck} />;
      case EditDeckPages.exportLegend: return <ExportLegend deck={deck} />;
      case EditDeckPages.exportBackside: return <ExportBackside deck={deck} />;
      default: return <Settings deck={deck} />;
    }
  };

  return (
    <OpenChangeFileModalContext.Provider value={_openModal}>
      <div className={styles.container}>
        <Paper className={styles.menu}>
          <Typography variant={'h5'} gutterBottom className={styles.deckName}>Deck: {deck && deck.name}</Typography>
          <Divider component='p' light />
          <ul className={styles.menuList}>
            <li>Editing</li>
            <ul>
              <li>
                <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.files)} className={styles.link}>
                  Files
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.cards)} className={styles.link}>
                  Cards
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.legend)} className={styles.link}>
                  Legend
                </NavLink>
              </li>
            </ul>
            <li>Export</li>
            <ul>
              <li>
                <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.exportCards)} className={styles.link}>
                  Cards
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.exportLegend)} className={styles.link}>
                  Legend
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.exportBackside)} className={styles.link}>
                  Backside
                </NavLink>
              </li>
            </ul>
            <li>
              <NavLink activeClassName={styles.active} to={ROUTE_PATHS.editDeck.withID(deckId, EditDeckPages.settings)} className={styles.link}>
                Settings
              </NavLink>
            </li>
          </ul>
        </Paper>
        <Paper className={styles.paper}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              {loading && (
                <div className={styles.loading}>
                  <CircularProgress size={50} />
                </div>
              )}
              <CurrentTabComponent />
            </div>
          </div>
        </Paper>
        <ChangeFileDialog {...dialogData} close={closeModal}/>
      </div>
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
