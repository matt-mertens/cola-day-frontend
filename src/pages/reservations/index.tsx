import React, { useState, useEffect } from 'react';

import { Container, CircularProgress, Typography, Grid, Card, List, ListItem, ListItemSecondaryAction, ListItemText, Button } from '@material-ui/core';
import { useApiGetReservations } from '../../hooks/apiHooks';
import { makeStyles } from '@material-ui/core/styles';

import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Room } from '../../types/rooms';
import { roomsApi } from '../../services/rooms';
import moment from 'moment';

const currentDate = new Date();

const useStyles = makeStyles((theme) => ({
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


export default function Index() {
    const classes = useStyles();

    const { reservations, isLoadingReservations } = useApiGetReservations()

    const [availableAppointments, setAvailableAppointments] = useState<AppointmentModel[]>([])
    const [rooms, setRooms] = useState<Room[] | null>(null)
    const [isLoadingRooms, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const Appointment = ({
      children, style, data,...restProps
    }) => (
        <Appointments.Appointment
          {...restProps}
          style={{
            ...style,
            backgroundColor: '#FFC107',
            borderRadius: '8px',
          }}
        >
          <h5 style={{marginBottom:'2px', marginTop:'5px', marginLeft:'5px'}}>{data.title}</h5>
          <span style={{marginLeft:'5px'}}>{moment(data.startDate).format('hh mma')} - {moment(data.endDate).format('hh mma')}</span>
        </Appointments.Appointment>
    );

    // useEffect(() => {
    //     setLoading(true)
    //     roomsApi.rooms.getRooms()
    //     .then(res => {
    //         const appointments = [...new Array(9)].map((item, idx) => ({
    //             title: '5 Available Rooms',
    //             description: '5 Available Rooms',
    //             startDate: String(moment().startOf('day').hour(8 + idx).minute(0)),
    //             endDate: String(moment().startOf('day').hour(9 + idx).minute(0)),
    //             id: idx,
    //             location: 'Room 1',
    //         }))
    //         setAvailableAppointments(appointments)
    //         console.log(appointments)
    //     })
    //     .catch(error => {
    //         setError(error)
    //     })
    //     .finally(() => {
    //         setLoading(false)
    //     })
    // }, [])


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
                        <Button variant="contained" color="primary">
                          New Reservation
                        </Button>
                    </div>
                </div>
              <Card>
              <List component="div">
                    {reservations?.map(item => (
                        <ListItem item>
                            <ListItemText 
                            primary={item.title} 
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
                            <ListItemSecondaryAction>
                                <Typography variant="overline" display="block" gutterBottom>
                                    {moment.utc(item.startDate).format('hh:mm a') + ' - ' + moment.utc(item.endDate).format('hh:mm a')}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                </Card>
            </div>}
        </div>
    )
}
