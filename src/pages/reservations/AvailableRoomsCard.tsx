import React from 'react'
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Container, CircularProgress, Button, Divider } from '@material-ui/core';
import { Room } from '../types/rooms';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
                    {/* <Link to='/reservations'>
                        <Button 
                        variant='outlined' 
                        color='primary'
                        size='small'
                        >
                            Reservation
                        </Button>
                    </Link> */}
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
                        <ListItem item>
                            <ListItemText 
                            primary={item.name} 
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
                            <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                                <p>Capacity</p>
                                <span>{item.capacity}</span>
                            </div>
                            <div style={{paddingLeft:'15px',paddingRight:'15px'}}>
                                <p>Location</p>
                                <span>{item.location}</span>
                            </div>
                            <div style={{paddingLeft:'15px',paddingRight:'35px'}}>
                                <p>Floor</p>
                                <span>{item.floor}</span>
                            </div>
                            <ListItemSecondaryAction>
                                <Button variant='outlined' color='primary'>Book</Button>
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
