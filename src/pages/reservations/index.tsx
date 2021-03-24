import React from 'react';

import { Container, CircularProgress, Typography } from '@material-ui/core';
import { useApiGetReservations } from '../../hooks/apiHooks';

import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = new Date();

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
      <h5>{data.title}</h5>
      <span>{data.description}</span>
      <span>{data.roomId}</span>
    </Appointments.Appointment>
);

export default function Index() {
    const { reservations, isLoadingReservations } = useApiGetReservations()

    return (
        <div>
            {isLoadingReservations ? 
            <Container style={{textAlign:'center', padding:'50px'}}>
                <CircularProgress />
            </Container>
            :
            <div>
              <Typography variant='h4' gutterBottom>
                  Reservations
              </Typography>
              <Paper>
                  <Scheduler
                  data={reservations ? reservations : []}
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
                  </Scheduler>
              </Paper>
            </div>}
        </div>
    )
}
