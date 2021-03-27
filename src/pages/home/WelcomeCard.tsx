import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Divider } from '@material-ui/core';
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
            <Typography variant='h5'>
                Welcome to Cola Day!
            </Typography>
            <Typography variant='body1'>
               {props.authenticatedUser?.email}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            {moment().format('MMM Do YYYY')}
            </Typography>
            <Divider style={{marginTop:'20px'}} />
            <p>We are glad you could join us for Cola day! To get started reserve a room to meet with one of the Coke or Pepsi teams</p>
        </Card>
    )
}
