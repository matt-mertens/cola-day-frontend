import React from 'react';
import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@material-ui/core';

import ReservationsCard from './MyReservationsCard';
import { useApiGetReservations } from '../../hooks/apiHooks';
import { makeStyles } from '@material-ui/core/styles';
import WelcomeCard from './WelcomeCard';
import { CallMade, Event, Info } from '@material-ui/icons';
import { useHistory } from 'react-router';

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
    const history = useHistory();
    const { reservations, isLoadingReservations } = useApiGetReservations()
    
    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7} lg={8}>
                        <WelcomeCard authenticatedUser={props.authenticatedUser} />
                        <div style={{marginTop:'20px'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Card>
                                    <CardActionArea style={{minHeight:'180px'}} onClick={() => history.push('/reservations/create')}>
                                    <CardHeader
                                        avatar={
                                        <Avatar variant="square" style={{background:'#f3fefa', borderRadius:'7px'}}>
                                            <Event style={{color:'#3d6f66'}} /> 
                                        </Avatar>
                                        }
                                        action={
                                        <IconButton aria-label="settings">
                                            <CallMade />
                                        </IconButton>
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="h5">
                                            Reserve Room
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Get started booking a room to meet with Coke or Pepsi
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card>
                                    <CardActionArea style={{minHeight:'180px'}} onClick={() => history.push('/about')}>
                                    <CardHeader
                                        avatar={
                                        <Avatar variant="square" style={{background:'#f5f3fe', borderRadius:'7px'}} >
                                            <Info style={{color:'#6539b8'}} />
                                        </Avatar>
                                        }
                                        action={
                                        <IconButton aria-label="settings">
                                            <CallMade/>
                                        </IconButton>
                                        }
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="h5">
                                            About Cola Day
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Read up on Cola day and all the interesting activites planned
                                        </Typography>
                                    </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                        </div>
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
