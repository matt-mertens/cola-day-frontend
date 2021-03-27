import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Container, Chip } from '@material-ui/core';
import { Delete, LocationOn } from '@material-ui/icons';

import { Room } from '../../types/rooms';

interface IProps {
    rooms: Room[],
    isLoadingRooms: boolean,
}

export default function RoomsCard(props: IProps) {
    return (
        <Card>
            {props.rooms.length === 0 ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <Typography  variant="h6" gutterBottom>
                No Rooms
                </Typography>
            </Container>
            :
            <List component="div">
                {props.rooms.map(item => (
                    <ListItem item>
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
                            {/* <IconButton edge="end" aria-label="delete">
                                <Delete />
                            </IconButton> */}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>}
        </Card>
    )
}
