import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card } from '@material-ui/core';
import { Formik, Form as FormikForm, Field, ErrorMessage, FormikHelpers } from 'formik';

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
    submit: {
        margin: theme.spacing(3, 0, 2),
        height: '40px',
        minWidth: '120px',
        borderRadius: '20px'
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
    
}

// const handleFormSubmit = (values: IFormikValues, { setSubmitting }: FormikHelpers<IFormikValues>): void => {
//     setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         setSubmitting(false);
//     }, 400);
// }
const handleFormSubmit = (values: any, { setSubmitting }: any): void => {
    setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        window.sessionStorage.setItem('accessToken', 'true');
    }, 400);
}

interface IError {
    email?: string
}

const Form = () => {
    const classes = useStyles();

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
                                    errors.email = 'Required';
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
                                handleSubmit,
                                isSubmitting,
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
                                        <Field
                                            name="remember"
                                            render={({ field, form }: any) => {
                                                return (                                                    
                                                    <FormControlLabel
                                                        control={<Checkbox id="remember" value="remember" name="remember" color="primary" checked={field.value} {...field} />}
                                                        label="Remember me"
                                                    />
                                                );
                                            }}
                                        />
                                        <br />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            className={classes.submit}
                                        >
                                            Login
                                        </Button>
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