import React, { useState } from 'react'
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Container, CircularProgress, Button, Divider, ButtonGroup, Chip } from '@material-ui/core';
import { Room } from '../types/rooms';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { LocationOn } from '@material-ui/icons';
import CreateReservationModal from './CreateReservationModal';

interface IProps {
    availableRooms: Room[] | null,
    isLoadingAvailableRooms: boolean,
    selectedAppointment: any
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
    const [roomType, setRoomType] = useState<'coke' | 'pepsi' | ''>('');

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
                    <div style={{textAlign:'right'}}>Filter Room Type</div>
                    <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={() => setRoomType(roomType === 'coke' ? '' : 'coke')} variant={roomType === 'coke' ? 'contained' : 'outlined'}>Coke</Button>
                    <Button onClick={() => setRoomType(roomType === 'pepsi' ? '' : 'pepsi')} variant={roomType === 'pepsi' ? 'contained' : 'outlined'}>Pepsi</Button>
                    </ButtonGroup>
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
            : props.availableRooms?.length === 0 || props.availableRooms.filter(item => item.owner.includes(roomType)).length == 0 ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <Typography  variant="subtitle1" gutterBottom>
                No rooms available for the specified time
                </Typography>
            </Container>
            :
                <List component="div">
                    {props.availableRooms.filter(item => item.owner.includes(roomType)).map((item, idx) => (
                        <div>
                        <ListItem key={idx}>
                            <ListItemText 
                            primary={
                                <Typography
                                variant="subtitle1"
                                color="textPrimary"
                                >
                                    <span style={{marginRight:'7px'}}>{item.name}</span>
                                    <Chip 
                                    size="small" 
                                    label={item.owner} 
                                    style={{background: item.owner === 'coke' ? '#fef1f1' : '#eff1fe', color: item.owner === 'coke' ? '#a13243' : '#4a3db6'}} 
                                    /> 
                                </Typography>
                            } 
                            secondary={
                                <React.Fragment>
                                    <div>
                                    <Typography
                                    variant="overline"
                                    >
                                        Capacity {item.capacity} | Floor {item.floor}
                                    </Typography>

                                    </div>
                                    <Typography
                                    component="span"
                                    variant="body2"
                                    color="textSecondary"
                                    >
                                        <LocationOn style={{fontSize:'15px'}} />
                                        <span style={{marginLeft:'7px'}}>{item.location}</span>
                                    </Typography>
                                </React.Fragment>
                            } 
                            />
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
