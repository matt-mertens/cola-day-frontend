import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';
import { Reservation } from '../types/reservations';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

interface IProps {
    reservations: Reservation[] | null,
    isLoadingReservations: boolean,
}

const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(3),
    },
}));

export default function ReservationsCard(props: IProps) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Typography variant='h5'>
                Reservations
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
            {moment().format('MMM Do YYYY')}
            </Typography>
            <List component="div">
                {props.reservations?.map(item => (
                    <ListItem item>
                        <ListItemText 
                        primary={item.title} 
                        secondary={
                            <React.Fragment>
                                <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                                >
                                    {item.description}
                                </Typography>
                            </React.Fragment>
                        } 
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="overline" display="block" gutterBottom>
                                {moment.utc(item.startDate).format('hh:mm a') + ' - ' + moment.utc(item.endDate).format('hh:mm a')}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
