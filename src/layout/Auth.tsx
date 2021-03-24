import React, { useState, useEffect } from 'react'

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
        textAlign: 'center',
        marginTop: theme.spacing(15),
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    logo: {
      height: '20px',
      marginRight: '7px',
    }
  }),
);


const Auth = (props: any) => {
    const classes = useStyles();

    return (
        <div>
            <main className={classes.content}>
                <div>Coke Day</div>
                {props.children}
            </main>
        </div>
    )
}

export default Auth;