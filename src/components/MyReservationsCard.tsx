import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Container, CircularProgress, Button } from '@material-ui/core';
import { Reservation } from '../types/reservations';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface IProps {
    reservations: Reservation[] | null,
    isLoadingReservations: boolean,
}

const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(3),
    },
    cardTitle: {
        justifyContent: 'space-between',
        display: 'flex',
    }
}));

export default function ReservationsCard(props: IProps) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.cardTitle}>
                <div>
                    <Typography variant='h5'>
                        My Reservations
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                    {moment().format('MMM Do YYYY')}
                    </Typography>
                </div>
                <div>
                    <Link to='/reservations' style={{textDecoration:'none'}}>
                        <Button 
                        variant='outlined' 
                        color='primary'
                        size='small'
                        >
                            New Reservation
                        </Button>
                    </Link>
                </div>
            </div>
            {props.isLoadingReservations ?
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
            : props.reservations?.length === 0 ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <Typography  variant="subtitle1" gutterBottom>
                No Reservations
                </Typography>
            </Container>
            :
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
            }
        </Card>
    )
}