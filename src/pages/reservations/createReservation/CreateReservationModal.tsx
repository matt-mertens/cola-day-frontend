import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Typography, Container, CircularProgress, TextField, Snackbar, IconButton } from '@material-ui/core'
import moment from 'moment';
import { Close, LocationOn } from '@material-ui/icons';
import { reservationApi } from '../../../services/reservations';
import { useHistory } from 'react-router';

export default function CreateReservationModal(props: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [creatingReservation, setCreatingReservation] = useState<boolean>(false);
    const [reservationTitle, setReservationTitle] = useState('');
    const [reservationDescription, setReservationDescription] = useState('');
    const [error, setError] = useState<Error | null>(null)

    const { room, selectedAppointment } = props;

    const history = useHistory()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseToast = () => {
        setError(null);
    };

    const handleSubmit = () => {
        setCreatingReservation(true)
        reservationApi.reservations.createReservation({
            title: reservationTitle,
            description: reservationDescription,
            startDate: moment(selectedAppointment.startDate),
            endDate: moment(selectedAppointment.endDate),
            room: room.id,
        })
        .then(res => {
            history.push('/reservations')
            setOpen(false);
        })
        .catch(error => {
            const { data } = error.response;
            if (data.statusCode === 403) {
                setError(data.message)
            } else {
                setError('Invalid request')
            }
        })
        .finally(() => {
            setCreatingReservation(false)
        })
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
                <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={error ? true : false}
                style={{position:'fixed', top: 20, height: "100%" }}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                message={error}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseToast}>
                    <Close fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
                />
                {creatingReservation ? 
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
                :
                <div>
                <DialogTitle>
                    <Typography component='div' variant='h5' style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <div>Reserve {room.name}</div>
                        <div>{moment(selectedAppointment.startDate).format('MMM Do YYYY')}, {moment(selectedAppointment.startDate).format('hh mma')} - {moment(selectedAppointment.endDate).format('hh mma')}</div>
                    </Typography>
                    <Typography component='div' variant="subtitle2">
                        {room.description}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                        <Typography
                        component="div"
                        variant="body2"
                        color="textPrimary"
                        >
                            <LocationOn style={{fontSize:'15px'}} />
                            <span style={{marginLeft:'7px'}}>{room.location}</span>
                        </Typography>
                        <Typography
                        variant="overline"
                        >
                            Capacity {room.capacity} | Floor {room.floor}
                        </Typography>
                        <form noValidate autoComplete="off">
                            <TextField 
                            label="Title" 
                            placeholder='Meeting title'
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
