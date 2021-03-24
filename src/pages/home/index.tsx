import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom';
import ReservationsCard from '../../components/ReservationsCard';
import { useApiGetReservations } from '../../hooks/apiHooks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
      padding: theme.spacing(12),
      position: 'relative',
      background: 'linear-gradient(87deg,#11cdef,#1171ef)!important',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));

export default function Index() {
    const classes = useStyles();
    const { reservations, isLoadingReservations } = useApiGetReservations()
    
    return (
        <div>
            <div 
            className={classes.header}
            >
            </div>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={7} lg={8}>
                    TEST
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4}>
                        <ReservationsCard 
                        reservations={reservations} 
                        isLoadingReservations={isLoadingReservations} 
                        />
                    </Grid>
                </Grid>
                <Typography>
                Home
                </Typography>
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
        </div>
    )
}
