import React from 'react';
import { Typography } from '@material-ui/core';

import { Link } from 'react-router-dom';
import ReservationsCard from '../../components/ReservationsCard';
import { useApiGetReservations } from '../../hooks/apiHooks';

export default function Index() {
    const { reservations, isLoadingReservations } = useApiGetReservations()
    
    return (
        <div>
            <Typography>
            Home
            </Typography>
            <ReservationsCard reservations={reservations} isLoadingReservations={isLoadingReservations} />
            <Link to='/rooms'>
            Rooms
            </Link>
            <Link to='/reservations'>
            Reservations
            </Link>
            <Link to='/login'>
            Login
            </Link>
        </div>
    )
}
