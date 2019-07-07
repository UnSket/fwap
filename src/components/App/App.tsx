import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles'
import green from '@material-ui/core/colors/green';
import gray from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green.A700,
      contrastText: '#fff'
    },
  },

});
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/some/" exact render={(): any => <div>asdf</div>} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
