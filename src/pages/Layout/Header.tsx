import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import Title from '../../components/Layout/Title';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    tab: {
      textTransform: 'none',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
    },
    signOut: {
      position: 'fixed',
      right: '20px',
      textAlign: 'right'
    }
  }),
);

interface StyledTabsProps {
  value?: number;
}

interface StyledTabProps {
  path: string;
  label: string;
  onClick?: () => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#000',
      fontWeight: theme.typography.fontWeightRegular,
      '&.Mui-selected': { fontWeight: theme.typography.fontWeightBold },
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
    },
  }),
)((props: StyledTabProps) => <NavLink className="tab" to={props.path} activeClassName="tab-active"><Tab disableRipple {...props} /></NavLink>);

interface IMenuItems {
  text: string;
  route: string;
}

const menuItems: IMenuItems[] = [
  {
    text: "Volunteers",
    route: "/volunteers"
  },
  {
    text: "Settings",
    route: "/settings"
  },
];

interface IProps {
  userData?: any //TODO
}

const Header = (props: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <Box component="div" m={1}>
            <Title />
          </Box>
        </Grid>
        {(props.userData /*&& props.userData.type === "SUPER_ADMIN" */) && <Grid item xs={12} lg={6} className={classes.tabs}>
          <StyledTabs>
            {menuItems.map((item, index) => (
              <StyledTab label={item.text} key={index} path={item.route} />
            ))}
          </StyledTabs>
        </Grid>}
        {(props.userData /*&& props.userData.type === "SUPER_ADMIN" */) && <Grid item xs={12} lg={3} className={classes.signOut}>
          <Box component="div" m={1}>
            Sign out
          </Box>
        </Grid>}
      </Grid>
    </div>
  );
}

export default Header;