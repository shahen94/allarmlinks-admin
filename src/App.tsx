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
import { useDispatch, useSelector } from 'react-redux';
import login from './api/auth/login';
import { RootState } from './store';
import ILoginResponse from './types/auth/ILoginResponse';
import ILoginState from './types/auth/ILoginState';

interface IRoute {
  children: React.ReactElement;
  exact?: boolean;
  path: string;
}

const userData: boolean = false;

const PrivateRoute = ({ children, ...rest }: IRoute) => {
  const user: ILoginState = useSelector((state: RootState) => state.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.user.data ? children : <Redirect to="/login" />
      }
    />
  );
}

const PublicRoute = ({ children, ...rest }: IRoute) => {
  const user: ILoginState = useSelector((state: RootState) => state.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user.user.data ? children : (
          <Redirect to="/" />
        )
      }
    />
  );
}

const App = () => {
  const user: ILoginState = useSelector((state: RootState) => state.user)
  useEffect(() => {

  })

  return (
    <BrowserRouter>
      <Layout userData={user && user.user.data}>
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
            <Volunteer />
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
