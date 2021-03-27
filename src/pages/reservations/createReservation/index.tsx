import React, { useState, useEffect } from 'react';

import { Typography, Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AppointmentModel, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import AvailableRoomsCard from './AvailableRoomsCard';
import { Room } from '../../../types/rooms';
import { roomsApi } from '../../../services/rooms';
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

    const [selectedAppointment, setSelectedAppointment] = useState(null)
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
            backgroundColor: data.id === selectedAppointment?.id ? '#64b5f6' : '#FFC107',
            borderRadius: '8px',
          }}
          onClick={() => setSelectedAppointment({ id: data.id, startDate: data.startDate, endDate: data.endDate })}
        >
          <h5 style={{marginBottom:'2px', marginTop:'5px', marginLeft:'5px'}}>{moment(data.startDate).format('hh mma')} - {moment(data.endDate).format('hh mma')}</h5>
          {/* <span style={{marginLeft:'5px'}}>{moment(data.startDate).format('hh mma')} - {moment(data.endDate).format('hh mma')}</span> */}
        </Appointments.Appointment>
    );

    useEffect(() => {
        setLoading(true)
        roomsApi.rooms.getAvailableRooms(moment().startOf('day').hour(8).minute(0).format('YYYY-MM-DDTHH:mm:ss.SSS'), moment().startOf('day').hour(16).minute(0).format('YYYY-MM-DDTHH:mm:ss.SSS'), true)
        .then(res => {
            console.log(res.data)
            const appointments = res.data.map((item, idx) => ({
                title: `${item.availableRooms} Available Rooms`,
                startDate: String(moment(item.startDate)),
                endDate: String(moment(item.endDate)),
                id: idx,
            }))
            setAvailableAppointments(appointments)
            console.log(appointments)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
      if(selectedAppointment?.startDate && selectedAppointment?.endDate) {
        setLoading(true)

        roomsApi.rooms.getAvailableRooms(moment(selectedAppointment.startDate).format('YYYY-MM-DDTHH:mm:ss.SSS'), moment(selectedAppointment.endDate).format('YYYY-MM-DDTHH:mm:ss'))
        .then(res => {
            let rooms = res.data.sort((a, b) => a.name - b.name)
            setRooms(rooms)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
      }
  }, [selectedAppointment])

    return (
        <div className={classes.root}>
            <div>
              <Typography className={classes.title} variant='h4' gutterBottom>
                New Reservation
              </Typography>
              <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7} lg={8}>
                        <AvailableRoomsCard
                        availableRooms={rooms}
                        isLoadingAvailableRooms={isLoadingRooms}
                        selectedAppointment={selectedAppointment}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} lg={4}>
                      <Card>
                          <Scheduler
                          data={availableAppointments ? availableAppointments : []}
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
            </div>
        </div>
    )
}
