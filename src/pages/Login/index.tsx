import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Title from '../../components/Layout/Title';
import Form from './Form';
import './style.scss'

const Login = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Box component="div" m={1}>
            <Title />
          </Box>
        </Grid>
      </Grid>
      <div className='login-form-container'>
        <Form />
      </div>
    </>
  )
}

export default Login;