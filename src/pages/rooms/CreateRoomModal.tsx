import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Typography, Container, CircularProgress, TextField, Select, MenuItem } from '@material-ui/core'
import moment from 'moment';
import { LocationOn } from '@material-ui/icons';
import { roomsApi } from '../../services/rooms';
import { useHistory } from 'react-router';

export default function CreateRoomModal(props: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [creatingRoom, setCreatingRoom] = useState<boolean>(false);
    const [roomTitle, setRoomTitle] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomOwner, setRoomOwner] = useState<'coke' | 'pepsi'>('');
    const [roomCapacity, setRoomCapacity] = useState<number>('');
    const [roomFloor, setRoomFloor] = useState<string>('');
    const [roomLocation, setRoomLocation] = useState<string>('');

    const { room, selectedAppointment } = props;

    const history = useHistory()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setCreatingRoom(true)
        let payload = {
            name: roomTitle,
            description: roomDescription,
            owner: roomOwner,
            capacity: roomCapacity,
            floor: roomFloor,
            location: roomLocation,
        }
        console.log(payload)
        roomsApi.rooms.createRoom({
            name: roomTitle,
            description: roomDescription,
            owner: roomOwner,
            capacity: roomCapacity,
            floor: roomFloor,
            location: roomLocation,
        })
        .then(res => {
            history.push('/rooms')
            window.location.reload()
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            setCreatingRoom(false)
        })

        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Room
            </Button>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth
            >
                {creatingRoom ? 
                <Container style={{textAlign:'center', padding:'50px'}}>
                    <CircularProgress />
                </Container>
                :
                <div>
                <DialogTitle>
                    <Typography variant='h5' style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <div>Add Room</div>
                        {/* <div>{moment(selectedAppointment.startDate).format('MMM Do YYYY')}, {moment(selectedAppointment.startDate).format('hh mma')} - {moment(selectedAppointment.endDate).format('hh mma')}</div> */}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        {/* {room.description} */}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                        component="div"
                        variant="body2"
                        color="textPrimary"
                        >
                            {/* <LocationOn />{room.location} */}
                        </Typography>
                        <form noValidate autoComplete="off">
                            <TextField 
                            label="Title" 
                            fullWidth 
                            variant="filled"
                            onChange={(e) => setRoomTitle(e.target.value)}
                            margin="normal"
                            />
                            <TextField
                            label="Description"
                            fullWidth
                            multiline
                            variant="filled"
                            rows={4}
                            onChange={(e) => setRoomDescription(e.target.value)}
                            placeholder='Meeting Description'
                            margin="normal"
                            />
                            <Select
                            label='Owner'
                            value={''}
                            fullWidth
                            variant="filled"
                            placeholder='Room owner'
                            value={roomOwner}
                            onChange={(e) => setRoomOwner(e.target.value)}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'coke'}>Coke</MenuItem>
                                <MenuItem value={'pepsi'}>Pepsi</MenuItem>
                            </Select>
                            <TextField
                            label="Capacity"
                            type="number"
                            fullWidth
                            variant="filled"
                            margin="normal" 
                            onChange={(e) => setRoomCapacity(e.target.value)}
                            />
                            <TextField 
                            label="Floor" 
                            fullWidth 
                            variant="filled"
                            margin="normal"
                            onChange={(e) => setRoomFloor(e.target.value)}
                            style={{marginBottom:'10px'}} 
                            />
                            <TextField 
                            label="Location" 
                            fullWidth 
                            variant="filled"
                            margin="normal"
                            onChange={(e) => setRoomLocation(e.target.value)}
                            style={{marginBottom:'10px'}} 
                            />
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant='contained'  autoFocus>
                        Add
                    </Button>
                </DialogActions>
                </div>}
            </Dialog>
        </div>
    )
}
