import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Header from '../Header/Header';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Router>
        <Route path="/" exact component={Landing} />
        <Route path="/some/" exact render={(): any => <div>asdf</div>} />
      </Router>
    </>
  );
};

export default App;
