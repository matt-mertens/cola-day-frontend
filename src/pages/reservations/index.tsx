import React from 'react';
import { Link } from 'react-router-dom';

import { Container, CircularProgress, Typography, Grid, Card, Button, CardActions, CardContent, Chip } from '@material-ui/core';
import { useApiGetReservations } from '../../hooks/apiHooks';
import { makeStyles } from '@material-ui/core/styles';
import { LocationOn } from '@material-ui/icons';

import moment from 'moment';

import CancelReservationModal from '../../components/CancelReservationModal';

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      paddingTop: theme.spacing(0),
      padding: theme.spacing(5),
      position: 'relative',
  },
  title: {
      color: '#d3ffff',
  },
  cancelButton: {
    //   background: 'linear-gradient(87deg,#f5365c 0,#f56036 100%)!important',
      textTransform: 'none'
  }
}));


export default function Index() {
    const classes = useStyles();

    const { reservations, isLoadingReservations } = useApiGetReservations()

    return (
        <div className={classes.root}>
            {isLoadingReservations ? 
            <Container style={{textAlign:'center', padding:'50px'}}>
                <CircularProgress />
            </Container>
            :
            <div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <Typography  className={classes.title} variant='h4' gutterBottom>
                        My Reservations
                        </Typography>
                    </div>
                    <div style={{float:'right'}}>
                        <Link to='/reservations/create' style={{textDecoration:'none'}}>
                            <Button 
                            variant='contained' 
                            color='primary'
                            >
                                New Reservation
                            </Button>
                        </Link>
                    </div>
                </div>
                {reservations.length === 0 ?
                    <Card>
                        <Container style={{textAlign:'center', padding:'50px'}}>
                            <Typography  variant="h6" gutterBottom>
                            No Reservations
                            </Typography>
                        </Container>
                    </Card>
                :
                    <Grid container spacing={3} style={{marginTop:'7px'}}>
                    {reservations?.map(item => (  
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <div>
                                            <Typography gutterBottom variant="h5" component="h2">
                                            <Link style={{textDecoration:'none'}} to={`/reservations/${item.id}`} >
                                            {item.title}
                                            </Link>
                                            
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            <span>{moment(item.startDate).format('MMM Do YYYY') + ', ' + moment(item.startDate).format('hh:mm a') + ' - ' + moment(item.endDate).format('hh:mm a')}</span>
                                            </Typography>
                                            <Typography
                                            component="p"
                                            variant="body2"
                                            color="textSecondary"
                                            style={{marginTop:'7px'}}
                                            >
                                                <LocationOn style={{fontSize:'15px'}} />
                                                <span style={{marginLeft:'7px'}}>{item.room.location}</span>
                                            </Typography>
                                        </div>
                                        <div>
                                            <CancelReservationModal reservationId={item.id} />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardActions style={{padding: '16px'}}>
                                    <Typography variant="body2" component="p">
                                        <span style={{marginRight:'7px'}}>Room: {item.room.name}</span>
                                        <Chip 
                                        size="small" 
                                        label={item.room.owner} 
                                        style={{background: item.room.owner === 'coke' ? '#fef1f1' : '#eff1fe', color: item.room.owner === 'coke' ? '#a13243' : '#4a3db6'}} 
                                        />
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>}
            </div>}
        </div>
    )
}
