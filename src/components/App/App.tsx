import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
import green from '@material-ui/core/colors/green';
import LoginDialog from '../LoginDialog/LoginDialog';
import Footer from '../Footer/Footer'
import MyDecks from '../MyDecks/MyDecks';
import { ROUTE_PATHS } from '../../model/constans/routePaths';

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
    <OpenModalContext.Provider value={_openModal}>
      <ThemeProvider theme={theme}>
        <LoginDialog isOpen={isSignInModalOpen} close={closeModal} />
        <Header />
        <Router>
          <Route path={ROUTE_PATHS.landing} exact component={Landing} />
          <Route path={ROUTE_PATHS.myDecks} exact component={MyDecks} />
        </Router>
        <Footer/>
      </ThemeProvider>
    </OpenModalContext.Provider>
  );
};

export default App;
