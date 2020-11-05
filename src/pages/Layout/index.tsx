import React from 'react';
import { Box, Container, CssBaseline, Toolbar, AppBar } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Header from './Header';
import 'fontsource-roboto';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            color: '#000000',
            backgroundColor: '#FAFAFA',
            '& .MuiToolbar-root': { display: 'block' }
        },
        toolbar: {            
            minHeight: '50px',
        }
    }),
);

interface IProps {
    window?: () => Window;
    children: React.ReactElement;
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
    const classes = useStyles();
    return (
        <>
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
        </>
    )
}

export default Layout;