import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Title from '../../components/Layout/Title';
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