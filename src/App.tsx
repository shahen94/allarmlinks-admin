import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'fontsource-roboto';
import Layout from './pages/Layout';
import AdminList from './pages/AdminList';
import Login from './pages/Login';
import Volunteers from './pages/Volunteers';

const authorized: boolean = true;

function App() {
  return (
    <div>
      {authorized ?
        <BrowserRouter>
          <Layout authorized={authorized} />
          <Switch>
            <Route exact path="/" component={Volunteers}></Route>
            <Route path="/admins" component={AdminList}></Route>
            <Route path="/settings" component={Volunteers}></Route>
          </Switch>
        </BrowserRouter> :
        <Login />
      }
    </div>
  );
}

export default App;
