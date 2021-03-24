import React, { useState, useEffect } from "react";

import { reservationApi } from '../services/reservations';

import { Reservation } from '../types/reservations';

export const useApiGetReservations = () => {
    const [reservations, setReservations] = useState<Reservation[] | null>(null)
    const [isLoadingReservations, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => { 
        setLoading(true)
        reservationApi.reservations.getReservations()
        .then(res => {
            setReservations(res.data)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return { reservations, isLoadingReservations, error } ;
}