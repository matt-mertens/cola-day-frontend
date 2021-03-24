import React, { useState } from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
    },
  }),
);


export default function NavBar(props: any) {
  const [darkMode, toggleDarkMode] = useState(false);

  const switchTheme = () => {
    let theme = localStorage.getItem('theme')
    if (theme) {
      localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    } else {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }

    toggleDarkMode(!darkMode)
    window.location.reload()
  }

  const classes = useStyles();

  return (
    <div>
      <AppBar 
      position="fixed"
      className={classes.appBar}
      >
        <Toolbar style={{ display: 'flex' }}>
          <Link to='/'>Cola Day</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}