import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    typography: {
        padding: '40px'
    }
});

interface IProps {
    message: string
}

const ErrorPage = ({ message }: IProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined">
                <Typography variant="h4" gutterBottom className={classes.typography}>
                    {message}
                </Typography>
            </Paper>

        </div>
    )
}

export default ErrorPage;
