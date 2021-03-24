import React, { useEffect, useState } from 'react'
import { roomsApi } from '../../services/rooms';
import { Room } from '../../types/rooms';
import RoomsCard from '../../components/RoomsCard';
import { Typography } from '@material-ui/core';

export default function Index() {
    const [rooms, setRooms] = useState<Room[] | null>(null)
    const [isLoadingRooms, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
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
            <Typography variant='h4' gutterBottom>
                Rooms
            </Typography>
           <RoomsCard rooms={rooms} isLoadingRooms={isLoadingRooms} />
        </div>
    )
}
