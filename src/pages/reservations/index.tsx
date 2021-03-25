import React, { useState, useEffect } from 'react';

import { Container, CircularProgress, Typography, Grid, Card } from '@material-ui/core';
import { useApiGetReservations } from '../../hooks/apiHooks';
import { makeStyles } from '@material-ui/core/styles';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import AvailableRoomsCard from './AvailableRoomsCard';
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


export const appointments = [
  {
    title: '5 Available Rooms',
    description: '5 Available Rooms',
    startDate: String(moment().startOf('day').hour(8).minute(0)),
    endDate: String(moment().startOf('day').hour(9).minute(0)),
    id: 0,
    location: 'Room 1',
  }
]

export default function Index() {
    const classes = useStyles();

    const { reservations, isLoadingReservations } = useApiGetReservations()

    const [selectedTimePeriod, setSelectedTimePeriod] = useState(null)
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
          onClick={() => setSelectedTimePeriod({ startDate: data.startDate, endDate: data.endDate })}
        >
          <h5>{data.title}</h5>
          <span>{data.description}</span>
          <span>{data.roomId}</span>
        </Appointments.Appointment>
    );

    useEffect(() => {
        // setLoading(true)
        // roomsApi.rooms.getRooms()
        // .then(res => {
        //     setRooms(res.data)
        // })
        // .catch(error => {
        //     setError(error)
        // })
        // .finally(() => {
        //     setLoading(false)
        // })
    }, [])

    useEffect(() => {
      console.log(selectedTimePeriod)
      if(selectedTimePeriod?.startDate && selectedTimePeriod?.endDate) {
        setLoading(true)
        roomsApi.rooms.getAvailableRooms(moment(selectedTimePeriod.startDate).format(), moment(selectedTimePeriod.endDate).format())
        .then(res => {
            setRooms(res.data)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
      }
  }, [selectedTimePeriod])

    return (
        <div className={classes.root}>
            {isLoadingReservations ? 
            <Container style={{textAlign:'center', padding:'50px'}}>
                <CircularProgress />
            </Container>
            :
            <div>
              <Typography className={classes.title} variant='h4' gutterBottom>
                New Reservation
              </Typography>
              <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7} lg={8}>
                        <AvailableRoomsCard
                        availableRooms={rooms}
                        isLoadingAvailableRooms={isLoadingRooms}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4}>
                      <Card>
                          <Scheduler
                          data={appointments ? appointments : []}
                          >
                          <ViewState
                          currentDate={currentDate}
                          />
                          <DayView
                          startDayHour={7}
                          endDayHour={18}
                          intervalCount={1}
                          cellDuration={60}
                          />
                          <Appointments 
                          appointmentComponent={Appointment}
                          />
                          {/* <AppointmentTooltip /> */}
                          </Scheduler>
                      </Card>
                    </Grid>
                </Grid>
            </div>}
        </div>
    )
}
