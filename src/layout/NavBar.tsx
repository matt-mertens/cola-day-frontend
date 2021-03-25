import React, { useState } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Avatar, Button, Menu, MenuItem, Divider } from '@material-ui/core/';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import colaLogo from '../assets/cola-logo-light.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: 'transparent',
      boxShadow: 'none',
    },
    toolbar: {
      borderBottom: '2px solid #77c7f4',
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      justifyContent: 'space-between'
    },
    logo: {
      height: '40px'
    }
  }),
);

export default function NavBar(props: any) {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    history.push('/login')
  };

  return (
    <div>
      <AppBar 
      position="absolute"
      className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Link to='/'>
            <img src={colaLogo} className={classes.logo} />
          </Link>
          <div style={{display:'flex'}}>
            <Button onClick={handleClick}>
              <Avatar>{props.authenticatedUser ? props.authenticatedUser.email.charAt(0) : ''}</Avatar>
              <div style={{paddingTop:'10px', marginLeft: '8px'}}>{props.authenticatedUser?.email}</div>
            </Button>
              <Menu
              style={{marginTop:'35px'}}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              onClose={handleClose}
            >
              <MenuItem
              style={{minWidth:'200px'}}
              >
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Header />
    </div>
  );
}