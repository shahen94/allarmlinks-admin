import React from 'react';
import Form from './Form';
import './style.scss'

interface IProps {
}

const Login = (props: IProps) => {
    return (
        <div className='login-form-container'>
            <Form />
        </div>
    )
}

export default Login;