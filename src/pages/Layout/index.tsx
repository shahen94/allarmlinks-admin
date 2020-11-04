import React from 'react';
import { Box } from '@material-ui/core';
import Header from './Header';
import 'fontsource-roboto';

interface IProps {
    authorized: boolean;
    window?: () => Window;
}

const Layout = (props: IProps) => {
    return (
        <Box component="span" m={1}>
            <Header authorized={props.authorized} />
        </Box>
    )
}

export default Layout;