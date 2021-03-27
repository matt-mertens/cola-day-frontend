import React, { useEffect, useState } from 'react'
import { roomsApi } from '../../services/rooms';
import { Room } from '../../types/rooms';
import RoomsCard from './RoomsCard';
import { Button, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateRoomModal from './CreateRoomModal';

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

    const [rooms, setRooms] = useState<Room[]>([])
    const [isLoadingRooms, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)
        roomsApi.rooms.getRooms()
        .then(res => {
            setRooms(res.data)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <div className={classes.root}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                        <Typography  className={classes.title} variant='h4' gutterBottom>
                            Rooms
                        </Typography>
                    </div>
                    <div style={{float:'right'}}>
                        <CreateRoomModal />
                    </div>
                </div>
                {isLoadingRooms ? 
                    <Container style={{textAlign:'center', padding:'50px'}}>
                        <CircularProgress />
                    </Container>
                :
                <RoomsCard rooms={rooms} isLoadingRooms={isLoadingRooms} />
                }
           </div>
        </div>
    )
}
