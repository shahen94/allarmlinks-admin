import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './styles/global.scss'
import 'fontsource-roboto';
import Layout from './pages/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Volunteers from './pages/Volunteers';

const userData: boolean = true;

function App() {
  return (
    <>
      {userData ?
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/volunteers" />
              </Route>
              <Route exact path="/volunteers" component={Volunteers}></Route>
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
