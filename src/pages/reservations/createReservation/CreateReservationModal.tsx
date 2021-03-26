import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Typography, Container, CircularProgress, TextField } from '@material-ui/core'
import moment from 'moment';
import { LocationOn } from '@material-ui/icons';
import { reservationApi } from '../../../services/reservations';
import { useHistory } from 'react-router';

export default function CreateReservationModal(props: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [creatingReservation, setCreatingReservation] = useState<boolean>(false);
    const [reservationTitle, setReservationTitle] = useState('');
    const [reservationDescription, setReservationDescription] = useState('');

    const { room, selectedAppointment } = props;

    const history = useHistory()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setCreatingReservation(true)
        reservationApi.reservations.createReservation({
            title: reservationTitle,
            description: reservationDescription,
            startDate: moment.utc(selectedAppointment.startDate),
            endDate: moment.utc(selectedAppointment.endDate),
            room: room.id,
        })
        .then(res => {
            history.push('/reservations')
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            setCreatingReservation(false)
        })

        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Reserve
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth
            >
                {creatingReservation ? 
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
                :
                <div>
                <DialogTitle>
                    <Typography variant='h5' style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <div>Reserve {room.name}</div>
                        <div>{moment(selectedAppointment.startDate).format('MMM Do YYYY')}, {moment(selectedAppointment.startDate).format('hh mma')} - {moment(selectedAppointment.endDate).format('hh mma')}</div>
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {room.description}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                        component="div"
                        variant="body2"
                        color="textPrimary"
                        >
                            <LocationOn />{room.location}
                        </Typography>
                        <form noValidate autoComplete="off">
                            <TextField 
                            label="Title" 
                            fullWidth 
                            onChange={(e) => setReservationTitle(e.target.value)}
                            style={{marginBottom:'10px'}} 
                            />
                            <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            onChange={(e) => setReservationDescription(e.target.value)}
                            placeholder='Meeting Description'
                            />
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant='contained'  autoFocus>
                        Reserve
                    </Button>
                </DialogActions>
                </div>}
            </Dialog>
        </div>
    )
}
