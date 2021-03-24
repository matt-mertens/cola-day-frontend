import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
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
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
