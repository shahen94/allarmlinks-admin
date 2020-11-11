import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ILoginData, { ActionStatus } from '../../types/auth/ILoginData';
import { Redirect, Route } from 'react-router-dom'

interface IProps {
    children: React.ReactElement;
    path: string;
    exact?: boolean;
}

const PrivateRoute = ({ children, ...rest }: IProps) => {
    const login: ILoginData = useSelector((state: RootState) => state.login);
    return (
        <Route
            {...rest}
            render={() =>
                login.status === ActionStatus.Success ?
                    children :
                    <Redirect to="/login" />
            }
        />
    )
}

export default PrivateRoute;
