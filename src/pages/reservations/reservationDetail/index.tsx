import React from 'react'
import { Card, CardActions, Chip, CircularProgress, Container, Typography, CardContent } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import { useApiGetReservationById } from '../../../hooks/apiHooks'
import { makeStyles } from '@material-ui/core/styles';
import CancelReservationModal from '../../../components/CancelReservationModal';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    card: {
      padding: theme.spacing(3),
    },
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(0),
        padding: theme.spacing(5),
        position: 'relative',
    },
    title: {
        color: '#d3ffff',
    }
}));

export default function Index(props: any) {
    const classes = useStyles();

    const { reservation, isLoadingReservation } = useApiGetReservationById(props.match.params.reservationId)

    return (
        <div className={classes.root}>
            {isLoadingReservation ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <CircularProgress />
            </Container>
            :
            !reservation ?
            <Container style={{textAlign:'center', padding:'50px'}}>
                <Card  style={{padding:'50px'}}>
                <Typography  variant="h5" gutterBottom>
                Reservation not found
                </Typography>
                </Card>
            </Container>
            :
            <div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <Typography  className={classes.title} variant='h4' gutterBottom>
                        {reservation.title}
                        </Typography>
                    </div>
                    <div style={{float:'right'}}>
                        <CancelReservationModal reservationId={reservation.id} />
                    </div>
                </div>
                <Card>
                <CardContent>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div>
                            <Typography variant="h5" color="textSecondary" component="h5">
                            <span>{moment(reservation.startDate).format('MMM Do YYYY') + ', ' + moment(reservation.startDate).format('hh:mm a') + ' - ' + moment(reservation.endDate).format('hh:mm a')}</span>
                            </Typography>
                            <Typography
                            component="p"
                            variant="body2"
                            color="textSecondary"
                            style={{marginTop:'7px'}}
                            >
                                <LocationOn style={{fontSize:'15px'}} />
                                <span style={{marginLeft:'7px'}}>{reservation.room.location}</span>
                            </Typography>
                            <Typography variant="body2" component="p" style={{marginTop:'7px'}}>
                                <span style={{marginRight:'7px'}}>Room: {reservation.room.name}</span>
                                <Chip 
                                size="small" 
                                label={reservation.room.owner} 
                                style={{background: reservation.room.owner === 'coke' ? '#fef1f1' : '#eff1fe', color: reservation.room.owner === 'coke' ? '#a13243' : '#4a3db6'}} 
                                />
                            </Typography>
                        </div>
                    </div>
                </CardContent>
                <CardActions style={{padding: '16px'}}>
                    <Typography gutterBottom variant="body2" component="p">
                        {reservation.description}
                    </Typography>
                </CardActions>
                </Card>
            </div>
            }
        </div>
    )
}
