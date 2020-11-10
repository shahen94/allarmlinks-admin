import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CircularProgress } from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { ActionStatus } from '../../types/auth/ILoginData';
import { Redirect, useParams } from 'react-router-dom';
import { fetchById as fetchAdminById, updateAdminById } from '../../store/features/adminsSlice';
import { IAdminState } from '../../types/admins/IAdminState';
import IAdminRecord from '../../types/admins/IAdminRecord';

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

interface IParams {
    id: string
}

interface IFormikValues {
    name: string;
    surname: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

interface IError {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

const AdminEditForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: idFromParams } = useParams<IParams>();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const admins: IAdminState = useSelector((state: RootState) => state.admins);
    const adminInStore: IAdminRecord | undefined = useSelector((state: RootState) => state.admins.data.find((admin: IAdminRecord) => admin._id === idFromParams));

    useEffect(() => {
        debugger
        //const adminInStore = admins.data.find((admin: IAdminRecord) => admin._id === idFromParams);
        if (idFromParams && !adminInStore) {
            dispatch(fetchAdminById(idFromParams));
        }
    }, [adminInStore, dispatch, idFromParams]);

    useEffect(() => {
        if (admins.status !== ActionStatus.Pending) {
            setSubmitting(false);
        }
    }, [admins.status]);

    const editFormInitialValues = { ...adminInStore, password: '', passwordConfirm: '' };

    const handleFormSubmit = (values: IFormikValues): void => {
        const submitValues: { name?: string, surname?: string, email?: string, password?: string } = {};
        if (values.name !== adminInStore?.name) {
            submitValues.name = values.name
        }
        if (values.surname !== adminInStore?.surname) {
            submitValues.surname = values.surname
        }
        if (values.email !== adminInStore?.email) {
            submitValues.email = values.email
        }
        if (values.password !== '') {
            submitValues.password = values.password
        }
        dispatch(updateAdminById({ _id: idFromParams, ...submitValues }));
        setSubmitting(true);
    }

    if (!adminInStore || !adminInStore._id) return null;

    if (submitting && admins.status === ActionStatus.Success) {
        return <Redirect to="/settings" />
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
                        {adminInStore && adminInStore._id ? <Formik
                            initialValues={editFormInitialValues as any}
                            validate={values => {
                                const errors: IError = {};
                                if (!values.name) {
                                    errors.name = 'Name is required';
                                }
                                if (!values.surname) {
                                    errors.surname = 'Surname is required';
                                }
                                if (!values.email) {
                                    errors.email = 'Email is required';
                                }
                                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                    errors.email = 'Invalid email address';
                                }
                                if (values.password !== values.passwordConfirm) {
                                    errors.passwordConfirm = 'Passwords do not match';
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
                                            id="name"
                                            label="Name"
                                            name="name"
                                            autoComplete="name"
                                            autoFocus
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={classes.textField}
                                            value={values.name}
                                        />
                                        {errors.name && touched.name && <ErrorMessage name="name" component="div" className="form-error" />}
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
                                            className={classes.textField}
                                            value={values.surname}
                                        />
                                        {errors.surname && touched.surname && <ErrorMessage name="surname" component="div" className="form-error" />}
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
                                            className={classes.textField}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && <ErrorMessage name="email" component="div" className="form-error" />}
                                        <TextField
                                            variant="filled"
                                            margin="normal"                                            
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
                                        <TextField
                                            variant="filled"
                                            margin="normal"                                            
                                            fullWidth
                                            name="passwordConfirm"
                                            label="Confirm Password"
                                            type="password"
                                            id="passwordConfirm"
                                            autoComplete="current-password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={classes.textField}
                                        />
                                        <ErrorMessage name="passwordConfirm" component="div" />
                                        <br />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={submitting}
                                            className={classes.submit}
                                        >
                                            Save
                                        </Button>
                                        {admins.status === ActionStatus.Pending &&
                                            <div className={classes.progress}>
                                                <CircularProgress />
                                            </div>
                                        }
                                        {admins.status === ActionStatus.Error &&
                                            <div className="form-error">{admins.error}</div>
                                        }
                                    </form>
                                )}
                        </Formik> :
                            <div className={classes.progress}>
                                <CircularProgress />
                            </div>}
                    </div>
                </Container>
            </Card>
        </div >
    );
}

export default AdminEditForm;