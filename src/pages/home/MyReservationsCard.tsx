import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Container, CircularProgress, Button, Divider } from '@material-ui/core';
import { Reservation } from '../../types/reservations';
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
                    <Link to='/reservations/create' style={{textDecoration:'none'}}>
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
                    {props.reservations?.slice(0, 5).map((item, idx) => (
                    <React.Fragment>
                        <ListItem item>
                            <ListItemText 
                            primary={<Link style={{textDecoration:'none'}} to={`/reservations/${item.id}`} >{item.title}</Link>} 
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
                                    {moment(item.startDate).format('hh:mm a') + ' - ' + moment(item.endDate).format('hh:mm a')}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {props.reservations.length === (idx + 1)  ? null : <Divider />}
                    </React.Fragment>
                    ))}
                    <Link to='/reservations'>
                        <Button style={{marginTop:'15px'}} size='small' fullWidth variant='outlined'>View all</Button>
                    </Link>
                </List>
            }
        </Card>
    )
}
