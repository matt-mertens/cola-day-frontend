import React from 'react'
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Container, CircularProgress, Button, Divider } from '@material-ui/core';
import { Room } from '../types/rooms';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { LocationOn } from '@material-ui/icons';
import CreateReservationModal from './CreateReservationModal';

interface IProps {
    availableRooms: Room[] | null,
    isLoadingAvailableRooms: boolean,
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

export default function AvailableRoomsCard(props: IProps) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.cardTitle}>
                <div>
                    <Typography variant='h5'>
                        Available Rooms
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                    {moment().format('MMM Do YYYY')}
                    </Typography>
                </div>
                <div>
                </div>
            </div>
            {props.isLoadingAvailableRooms ?
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
            : !props.availableRooms ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <Typography  variant="subtitle1" gutterBottom>
                Please select a time from the calendar to get availability
                </Typography>
            </Container>
            : props.availableRooms?.length === 0 ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <Typography  variant="subtitle1" gutterBottom>
                No rooms available for the specified time
                </Typography>
            </Container>
            :
                <List component="div">
                    {props.availableRooms.map(item => (
                        <div>
                        <ListItem>
                            <ListItemText 
                            primary={
                                <Typography
                                variant="subtitle1"
                                color="textPrimary"
                                >
                                    {item.name}
                                </Typography>
                            } 
                            secondary={
                                <React.Fragment>
                                    <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                    >
                                        <LocationOn />{item.location}
                                    </Typography>
                                    <Typography
                                    variant="overline"
                                    >
                                        Capacity: {item.capacity} | Floor {item.floor}
                                    </Typography>
                                </React.Fragment>
                            } 
                            />
                            {/* <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                                <span><LocationOn />{item.location}</span>
                            </div> */}
                            <ListItemSecondaryAction>
                                <CreateReservationModal room={item} selectedAppointment={props.selectedAppointment}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                        </div>
                    ))}
                </List>
            }
        </Card>
    )
}
