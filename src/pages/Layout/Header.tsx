import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Title from '../../components/Layout/Title';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    tab: {
      textTransform: 'none',
    },
    tabs: {
      display: 'flex',
      justifyContent: 'center',
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
    route: "/",
  },
  {
    text: "Settings",
    route: "/settings",
  },
];

if (true) {
  menuItems.unshift(
    {
      text: "Admininstrators",
      route: "/admins",
    }
  )
}


interface IProps {
  authorized: boolean;
}

const Header = (props: IProps) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const history = useHistory();

  const handleTabClick = (route: string) => {
    if (history.location.pathname === route) return;
    history.push(route)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <Title />
        </Grid>
        {props.authorized &&
          <Grid item xs={12} lg={6} className={classes.tabs}>
            <StyledTabs value={value} onChange={handleChange}>
              {menuItems.map((item, index) => (
                <StyledTab label={item.text} onClick={() => handleTabClick(item.route)} />
              ))}
            </StyledTabs>
          </Grid>
        }
      </Grid>
    </div>
  );
}

export default Header;