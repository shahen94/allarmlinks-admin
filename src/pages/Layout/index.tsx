import React from 'react';
import { AppBar, Box, CssBaseline, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Header from './Header';
import 'fontsource-roboto';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ILoginData from '../../types/auth/ILoginData';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            maxWidth: '90%',
            margin: '0 auto'
        },
        appBar: {
            color: '#000000',
            backgroundColor: '#FAFAFA',
            '& .MuiToolbar-root': { display: 'block' }
        },
        toolbar: {
            //minHeight: '50px',
        }
    }),
);

interface IProps {
    window?: () => Window;
    children: React.ReactElement
}

function ElevationScroll(props: IProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const Layout = (props: IProps) => {
    const login: ILoginData = useSelector((state: RootState) => state.login);
    const classes = useStyles();

    const containerClass = login.data && login.data.type === "super" ? classes.container : `${classes.container} no-tabs`


    return (
        <div className={containerClass}>
            <CssBaseline />
            <ElevationScroll {...props} >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Box component="span" m={0}>
                            <Header />
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            {props.children}
        </div>
    )
}

export default Layout;