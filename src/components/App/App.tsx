import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from '../Landing/Landing';


const App: React.FC = () => {
  return (
      <Router>
        <Route path='/' exact component={Landing} />
        <Route path='/some/' exact render={() => <div>asdf</div>} />
      </Router>
  );
}

export default App;
