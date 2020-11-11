import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Tab, Box } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Title from '../../components/Layout/Title';
import ILoginData, { ActionStatus } from '../../types/auth/ILoginData';
import Button from '@material-ui/core/Button';
import { logout } from '../../store/features/loginSlice';

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
    },
    textButton: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface StyledTabProps {
  path: string;
  label: string;
  onClick?: () => void;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#9a9a9a',
      fontWeight: theme.typography.fontWeightRegular,
      '&.Mui-selected': {
        fontWeight: theme.typography.fontWeightBold,
        color: '#3967d6'
      },
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
    },
  }),
)((props: StyledTabProps) => (
  <NavLink className="tab" to={props.path} activeClassName="tab-active">
    <Tab disableRipple {...props} />
  </NavLink>
));

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

}

const Header = (props: IProps) => {
  const classes = useStyles();
  const login: ILoginData = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logout());
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={3}>
          <Box component="div" m={1}>
            <Title />
          </Box>
        </Grid>
        {(login.status === ActionStatus.Success && login.data && login.data.type === "super") &&
          <Grid item xs={12} lg={6} className={classes.tabs}>
            {menuItems.map((item, index) => (
              <StyledTab label={item.text} key={index} path={item.route} />
            ))}
          </Grid>
        }
        {login.status === ActionStatus.Success && <Grid item xs={12} lg={3} className={classes.signOut}>
          <Box component="div" m={1}>
            <div className={classes.textButton}>
              <Button onClick={handleSignOut}>Sign out</Button>
            </div>
          </Box>
        </Grid>}
      </Grid>
    </div>
  );
}

export default Header;