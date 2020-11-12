import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './styles/global.scss'
import 'fontsource-roboto';
import Layout from './pages/Layout';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Volunteers from './pages/Volunteers';
import Volunteer from './pages/Volunteer';
import { useDispatch } from 'react-redux';
import { adminLoginCheck } from './store/features/loginSlice';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import AdminEditForm from './pages/Admin/AdminEditForm';

const App = () => {
    const dispatch = useDispatch();
    dispatch(adminLoginCheck());

    return (
        <BrowserRouter>
            <Layout>
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
                    <PublicRoute exact path="/login">
                        <Login />
                    </PublicRoute>
                    <Route path="/">
                        <Redirect to="/volunteers" />
                    </Route>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
