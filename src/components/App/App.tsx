import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import Header from '../Header/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
import green from '@material-ui/core/colors/green';
import Footer from '../Footer/Footer'
import MyDecks from '../MyDecks/MyDecks';
import { ROUTE_PATHS } from '../../model/constans/routePaths';
import CreateDeck from '../CreateDeck/CreateDeck';
import EditDeck from '../EditDeck/EditDeck';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Login from '../Login/Login';
import Auth from '../Auth/Auth';
import UserManagement from '../UserManagment/UserManagement';
import AllDecks from '../AllDecks/AllDecks';
import Cards from '../EditDeck/Export/PDFGenerator/Cards';

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

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <div className={styles.mainBackground}>
          <Switch>
            <Route path={ROUTE_PATHS.login} exact component={Login} />
            <Route render={() =>
              <Auth>
                <Header />
                <Switch>
                  <Route path={ROUTE_PATHS.myDecks} exact component={MyDecks} />
                  <Route path={ROUTE_PATHS.allDecks} exact component={AllDecks} />
                  <Route path={ROUTE_PATHS.createDeck} exact component={CreateDeck} />
                  <Route path={ROUTE_PATHS.editDeck.route} component={EditDeck} />
                  <Route path={ROUTE_PATHS.userManagement} exact component={UserManagement} />
                  <Redirect to={ROUTE_PATHS.myDecks} />
                </Switch>
                <Footer />
              </Auth>} />
          </Switch>
        </div>
      </ThemeProvider>
    </DndProvider>
  );
};

export default App;
