import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
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
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
  onClick: () => void;
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
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface IMenuItems {
  text: string;
  route: string;
}

const menuItems: IMenuItems[] = [
  {
    text: "Volunteers",
    route: "/"
  },
  {
    text: "Settings",
    route: "/settings"
  },
];

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const activeTabIndex = menuItems.findIndex(item => item.route === history.location.pathname);
  const [selectedTab, setSelectedTab] = useState(activeTabIndex);

  const handleTabClick = (route: string) => {
    if (history.location.pathname === route) return;
    history.push(route)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <Box component="div" m={1}>
            <Title />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6} className={classes.tabs}>
          <StyledTabs value={selectedTab} onChange={handleChange}>
            {menuItems.map((item, index) => (
              <StyledTab label={item.text} onClick={() => handleTabClick(item.route)} />
            ))}
          </StyledTabs>
        </Grid>
        <Grid item xs={12} lg={3} className={classes.signOut}>
          <Box component="div" m={1}>
            Sign out
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;