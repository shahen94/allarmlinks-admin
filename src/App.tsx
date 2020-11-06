import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './styles/global.scss'
import 'fontsource-roboto';
import Layout from './pages/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Volunteers from './pages/Volunteers';
import Volunteer from './pages/Volunteer';
import AdminForm from './pages/Admin/AdminForm';
import { useDispatch } from 'react-redux';

interface IRoute {
  children: React.ReactElement;
  exact?: boolean;
  path: string;
}

const userData: boolean = true;

const PrivateRoute = ({ children, ...rest }: IRoute) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData ? children : <Redirect to="/login" />
      }
    />
  );
}

const PublicRoute = ({ children, ...rest }: IRoute) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !userData ? children : (
          <Redirect to="/" />
        )
      }
    />
  );
}

const App = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(login())
  // })

  return (
    <BrowserRouter>
      <Layout userData={userData}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/volunteers" />
          </Route>
          <PrivateRoute exact path="/">
            <Volunteers />
          </PrivateRoute>
          <PrivateRoute exact path="/volunteers/">
            <Volunteers />
          </PrivateRoute>
          <PrivateRoute exact path="/volunteers/:id">
            <Volunteers />
          </PrivateRoute>
          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute exact path="/adminform/:id">
            <AdminForm />
          </PrivateRoute>
          <PrivateRoute exact path="/adminform">
            <AdminForm />
          </PrivateRoute>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          {/* <Route exact path="/login" component={Login}></Route>
          <Route exact path="/volunteers" component={Volunteers}></Route>
          <Route exact path="/volunteers/:id" component={Volunteer}></Route>
          <Route path="/settings" component={Settings}></Route>
          <Route path="/adminform/:id" component={AdminForm}></Route>
          <Route path="/adminform" component={AdminForm}></Route> */}
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
