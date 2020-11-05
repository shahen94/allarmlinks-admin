import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/global.scss'
import 'fontsource-roboto';
import Layout from './pages/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Volunteers from './pages/Volunteers';

const authorized: boolean = true;

function App() {
  return (
    <>
      {authorized ?
        <BrowserRouter>
          <Layout>
          <Switch>
            <Route exact path="/" component={Volunteers}></Route>
            <Route path="/settings" component={Settings}></Route>
          </Switch>
          </Layout>
        </BrowserRouter> :
        <Login />
      }

    </>
  );
}

export default App;
