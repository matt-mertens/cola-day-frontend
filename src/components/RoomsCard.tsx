import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { Room } from '../types/rooms';

interface IProps {
    rooms: Room[] | null,
    isLoadingRooms: boolean,
}

export default function RoomsCard(props: IProps) {
    return (
        <Card>
            <List component="div">
                {props.rooms?.map(item => (
                    <ListItem button>
                        <ListItemText 
                        primary={item.name.toUpperCase()} 
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
                        <div>
                            <p>Capacity</p>
                            <span>{item.capacity}</span>
                        </div>
                        <div>
                            <p>Location</p>
                            <span>{item.location}</span>
                        </div>
                        <div>
                            <p>Floor</p>
                            <span>{item.floor}</span>
                        </div>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
