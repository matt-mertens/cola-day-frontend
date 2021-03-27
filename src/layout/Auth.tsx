import React, { useState, useEffect } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, Container, Grid } from '@material-ui/core';
import colaLogo from '../assets/cola-logo-light.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
        textAlign: 'center',
        flexGrow: 1,
    },
    header: {
      paddingTop: theme.spacing(7),
      paddingBottom: theme.spacing(14),
      background: 'linear-gradient(87deg,#1171ef,#11cdef)!important', //'linear-gradient(87deg, #2dce89, #2dcecc)',
    },
    title: {
      justifyContent: 'center',
      color: '#fff',
      // paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(1),
    },
    logo: {
      height: '60px',
      borderRadius: '50%',
      background:'linear-gradient(87deg,#f5365c 0,#f56036 100%)!important'
    },
    separator: {
      height: '70px',
      top: 'auto',
      paddingTop: theme.spacing(7),
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
    },
    skew: {
      fill: '#172b4d',
    },
    component: {
      position: 'relative',
      marginTop: theme.spacing(-10)
    },
  }),
);


const Auth = (props: any) => {
    const classes = useStyles();

    useEffect(() => {
      document.body.classList.add("bg-navy");
      return () => {
        document.body.classList.remove("bg-navy");
      };
    }, []);

    return (
        <div>
            <main className={classes.content}>
            <div className={classes.header}>
              <Container>
                  <img src={colaLogo} className={classes.logo} />
                  <Grid className={classes.title}>
                      <h1 className="text-white">Welcome to Cola Day!</h1>
                      <p className="text-lead text-light">
                        Reserve your room for Cola Day.
                      </p>
                  </Grid>
              </Container>
              <div className={classes.separator}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                     className={classes.skew}
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </div>
              <div className={classes.component}>
                {props.children}
              </div>
            </main>
        </div>
    )
}

export default Auth;