import React, { useState, useEffect } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import NavBar from './NavBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      marginTop: '64px',
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      paddingBottom:'65px',
    },
    logo: {
      height: '20px',
      marginRight: '7px',
    }
  }),
);


const Main = (props: any) => {
    const classes = useStyles();

    const [themeMode, toggleThemeMode] = useState('light');

    useEffect(() => {
      let theme = localStorage.getItem('theme')

      if (theme) {
        toggleThemeMode(String(localStorage.getItem('theme')))
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleThemeMode('dark')
      }
  
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        toggleThemeMode(e.matches ? "dark" : "light")
      });

      return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', e => {
        toggleThemeMode(e.matches ? "dark" : "light")
      })
    }, [])

    let childrenInjectedWithProps = React.cloneElement(props.children)

    return (
        <div>
            <NavBar themeMode={themeMode} />
            <main className={classes.content} >
                {childrenInjectedWithProps}
            </main>
        </div>
    )
}

export default Main;