import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CircularProgress } from '@material-ui/core';
import { ErrorMessage, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ActionStatus } from '../../types/auth/ILoginData';
import { createNewAdmin } from '../../store/features/adminsSlice';
import { IAdminState } from '../../types/admins/IAdminState';
import useGlobalStyles from '../../styles/styles';
import { IFormikError, IFormikValues } from '../../types/admins/FormikTypes';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        minWidth: 400,
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
    progress: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    inputsContainer: {
        minHeight: '360px'
    }
}));

interface IProps {
    onModalClose: () => void,
}

const AdminForm = ({ onModalClose }: IProps) => {
    const classes = useStyles();
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const admins: IAdminState = useSelector((state: RootState) => state.admins);

    useEffect(() => {
        if (admins.status !== `CREATE_ADMIN_${ActionStatus.Pending}`) {
            setSubmitting(false);
        }
    }, [admins.status]);

    useEffect(() => {
        if (submitting && admins.status === `CREATE_ADMIN_${ActionStatus.Success}`) {
            onModalClose();
        }
    }, [admins.status, onModalClose, submitting]);

    const handleFormSubmit = (values: IFormikValues): void => {
        dispatch(createNewAdmin(values));
        setSubmitting(true);
    }

    const handleCancel = () => {
        onModalClose();
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card} variant="outlined">
                <Container component="main" maxWidth="sm" className={classes.mainContainer}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4">
                            Add Admin
                        </Typography>
                        <Formik
                            initialValues={{ name: '', surname: '', email: '', password: '' }}
                            validate={values => {
                                const errors: IFormikError = {};
                                if (!values.name) {
                                    errors.name = 'Name is required';
                                }
                                if (!values.surname) {
                                    errors.surname = 'Surname is required';
                                }
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'Password is required';
                                } else if (values.password.length < 8) {
                                    errors.password = 'Password must have 8 or more characters';
                                } else if (!/(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
                                    errors.password = 'Password must contain at least one uppercase and lowercase letters and a number';
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
                                        <div className={classes.inputsContainer}>
                                            <TextField
                                                variant="filled"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="name"
                                                label="Name"
                                                name="name"
                                                autoComplete="name"
                                                autoFocus
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={globalClasses.textField}
                                            />
                                            {errors.name && touched.name &&
                                                <ErrorMessage name="name" component="div" className="form-error" />}
                                            <TextField
                                                variant="filled"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="surname"
                                                label="Surname"
                                                name="surname"
                                                autoComplete="surname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={globalClasses.textField}
                                            />
                                            {errors.surname && touched.surname &&
                                                <ErrorMessage name="surname" component="div" className="form-error" />}
                                            <TextField
                                                variant="filled"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                name="email"
                                                autoComplete="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={globalClasses.textField}
                                            />
                                            {errors.email && touched.email &&
                                                <ErrorMessage name="email" component="div" className="form-error" />}
                                            <TextField
                                                variant="filled"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="text"
                                                id="password"
                                                autoComplete="current-password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={globalClasses.textField}
                                            />
                                            {errors.password && touched.password &&
                                                <ErrorMessage name="password" component="div" className="form-error" />}
                                        </div>
                                        <div>
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="default"
                                                disabled={submitting}
                                                className={globalClasses.button}
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                        </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={submitting}
                                                className={globalClasses.button}
                                            >
                                                Create
                                        </Button>
                                        </div>
                                        {admins.status === `CREATE_ADMIN_${ActionStatus.Pending}` &&
                                            <div className={classes.progress}>
                                                <CircularProgress />
                                            </div>
                                        }
                                        {admins.status === `CREATE_ADMIN_${ActionStatus.Error}` &&
                                            <div className="form-error">{admins.error}</div>
                                        }
                                    </form>
                                )}
                        </Formik>
                    </div>
                </Container>
            </Card>
        </div>
    );
}

export default AdminForm;