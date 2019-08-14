import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styles from './App.module.scss';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
import green from '@material-ui/core/colors/green';
import LoginDialog from '../LoginDialog/LoginDialog';
import Footer from '../Footer/Footer'
import MyDecks from '../MyDecks/MyDecks';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import CreateDeck from '../CreateDeck/CreateDeck';
import EditDeck from '../EditDeck/EditDeck';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { Store } from '../../model/types/Store';
import { currentLocation } from '../../modules/router/selectors';
import { loginRequest } from '../../modules/user/actions';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green.A700,
      contrastText: '#fff'
    },
  },
});

export const OpenModalContext = React.createContext<() => void>(() => {});

const App: React.FC = () => {
  const [isSignInModalOpen, toggleModal] = useState(false);
  const _openModal = () => {
    toggleModal( true);
  };
  const closeModal = () => {
    toggleModal( false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <OpenModalContext.Provider value={_openModal}>
        <ThemeProvider theme={theme}>
          <div className={styles.mainBackground}>
            <LoginDialog isOpen={isSignInModalOpen} close={closeModal} />
            <Header />
              <Route path={ROUTE_PATHS.landing} exact component={Landing} />
              <Route path={ROUTE_PATHS.myDecks} exact component={MyDecks} />
              <Route path={ROUTE_PATHS.createDeck} exact component={CreateDeck} />
              <Route path={ROUTE_PATHS.editDeck.route} exact component={EditDeck} />
            <Footer/>
          </div>
        </ThemeProvider>
      </OpenModalContext.Provider>
    </DndProvider>
  );
};

export default App;
