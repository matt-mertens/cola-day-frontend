import React from 'react';
import { Card, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Reservation } from '../types/reservations';
// import {  } from '@material-ui/icons';

interface IProps {
    reservations: Reservation[] | null,
    isLoadingReservations: boolean,
}

export default function ReservationsCard(props: IProps) {
    return (
        <Card>
            <List component="div">
                {props.reservations?.map(item => (
                    <ListItem button>
                        <ListItemText primary="Inbox" />
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
