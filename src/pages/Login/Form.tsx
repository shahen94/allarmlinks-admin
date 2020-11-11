import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CircularProgress } from '@material-ui/core';
import { Formik, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { adminLogin } from '../../store/features/loginSlice';
import { RootState } from '../../store';
import ILoginData, { ActionStatus } from '../../types/auth/ILoginData';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 500,

    },
    mainContainer: {
        padding: theme.spacing(6, 20, 4, 20),
    },
    card: {
        marginTop: theme.spacing(4),
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        border: 'none',
        borderRadius: '10px'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: '280px'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
    button: {
        boxShadow: 'none',
        margin: theme.spacing(3, 2, 2),
        textTransform: 'none',
        height: '35px',
        minWidth: '100px',
        borderRadius: '20px',
        '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
          },
    },
    progress: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    textField: {
        border: 'none',
        '& .MuiInputBase-root': {
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            boxShadow: '0px 3px 6px #CCCCCC',
        },
        '& .MuiFilledInput-underline:before': {
            content: 'none',
        },
        '& .MuiFormLabel-root': {
            color: '#bababa',
        },
        '& .MuiFormLabel-asterisk': {
            display: 'none',
        },

    }
}));

interface IFormikValues {
    email: string;
    password: string;
}

interface IError {
    email?: string;
}

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const login: ILoginData = useSelector((state: RootState) => state.login);

    useEffect(() => {
        if(login.status !== ActionStatus.Pending) {
            setSubmitting(false);
        }
    }, [login.status]);

    const handleFormSubmit = (values: IFormikValues): void => {
        dispatch(adminLogin(values));
        setSubmitting(true);
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card} variant="outlined">
                <Container component="main" maxWidth="sm" className={classes.mainContainer}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4">
                            Log in
                        </Typography>
                        <Formik                            
                            initialValues={{ email: '', password: '', remember: false }}
                            validate={values => {
                                const errors: IError = {};
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={handleFormSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            }) => (
                                    <form className={classes.form} onSubmit={handleSubmit}>
                                        <TextField
                                            variant="filled"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={classes.textField}
                                        />
                                        {errors.email && touched.email && <ErrorMessage name="email" component="div" className="form-error" />}
                                        <TextField
                                            variant="filled"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={classes.textField}
                                        />
                                        {/* <Field
                                            name="remember"
                                            render={({ field, form }: any) => {
                                                return (
                                                    <FormControlLabel
                                                        control={<Checkbox id="remember" value="remember" name="remember" color="primary" checked={field.value} {...field} />}
                                                        label="Remember me"
                                                    />
                                                );
                                            }}
                                        /> */}
                                        <br />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={submitting}
                                            className={classes.button}
                                        >
                                            Login
                                        </Button>
                                        {login.status === ActionStatus.Pending &&
                                            <div className={classes.progress}>
                                                <CircularProgress />
                                            </div>
                                        }
                                        {login.status === ActionStatus.Error &&
                                            <div className="form-error">{login.error}</div>
                                        }
                                    </form>
                                )}
                        </Formik>
                    </div>
                </Container>
            </Card>
        </div >
    );
}

export default Form;