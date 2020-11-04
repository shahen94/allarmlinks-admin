import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './pages/Main';
import Volounteers from './pages/Volounteers/index';
import './styles/global.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/volounteers" component={Volounteers} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
