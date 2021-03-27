import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useApiCancelReservation } from '../hooks/apiHooks';
import { reservationApi } from '../services/reservations';

export default function CancelReservationModal(props: any) {
  const [open, setOpen] = useState(false);

  const [isDeleted, setDeleted] = useState<boolean>(false)
  const [isLoadingReservations, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setLoading(true)
    reservationApi.reservations.deleteReservation(props.reservationId)
    .then(res => {
        setDeleted(true)
        window.location.reload()
    })
    .catch(error => {
        setError(error)
    })
    .finally(() => {
        setLoading(false)
    })

    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" size='small' onClick={handleClickOpen}>
          Cancel Reservation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Cancel Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel your reservation? Once cancelled your room will no longer be reserved for the specified time.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go back
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
