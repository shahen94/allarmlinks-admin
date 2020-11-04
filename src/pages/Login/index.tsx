import React from 'react';
import { Grid } from '@material-ui/core';
import Title from '../../components/Layout/Title';
import Form from './Form';

const Login = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Title />
        </Grid>
      </Grid>
      <Form />
    </div>
  )
}

export default Login;