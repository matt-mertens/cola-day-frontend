import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(3),
    },
}));

export default function WelcomeCard(props: any) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Typography variant='div'>
                Welcome to Cola Day!
            </Typography>
            <Typography variant='h6'>
               {props.authenticatedUser?.email}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            {moment().format('MMM Do YYYY')}
            </Typography>
        </Card>
    )
}
