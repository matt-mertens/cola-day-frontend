import React, { useState, useEffect } from "react";

import { reservationApi } from '../services/reservations';

import { Reservation } from '../types/reservations';

export const useApiGetReservations = () => {
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [isLoadingReservations, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => { 
        setLoading(true)
        reservationApi.reservations.getReservations()
        .then(res => {
            let reservations = res.data.sort((a, b) => new Date(a.startDate) - new Date(b.startdate))
            setReservations(reservations)
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

export const useApiGetReservationById = (reservationId: string) => {
    const [reservation, setReservation] = useState<Reservation | null>(null)
    const [isLoadingReservation, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => { 
        setLoading(true)
        reservationApi.reservations.getReservationsById(reservationId)
        .then(res => {
            setReservation(res.data)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return { reservation, isLoadingReservation, error } ;
}

export const useApiCancelReservation = (reservationId: number) => {
    const [isDeleted, setDeleted] = useState<boolean>(false)
    const [isLoadingReservations, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => { 
        setLoading(true)
        reservationApi.reservations.deleteReservation(reservationId)
        .then(res => {
            setDeleted(true)
        })
        .catch(error => {
            setError(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return { isDeleted, isLoadingReservations, error } ;
}