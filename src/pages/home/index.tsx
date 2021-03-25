import React from 'react';
import { Grid } from '@material-ui/core';

import ReservationsCard from '../../components/MyReservationsCard';
import { useApiGetReservations } from '../../hooks/apiHooks';
import { makeStyles } from '@material-ui/core/styles';
import WelcomeCard from './WelcomeCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(0),
        padding: theme.spacing(5),
        position: 'relative',
    },
}));

export default function Index(props: any) {
    const classes = useStyles();
    const { reservations, isLoadingReservations } = useApiGetReservations()
    
    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7} lg={8}>
                        <WelcomeCard authenticatedUser={props.authenticatedUser} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4}>
                        <ReservationsCard 
                        reservations={reservations} 
                        isLoadingReservations={isLoadingReservations} 
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
