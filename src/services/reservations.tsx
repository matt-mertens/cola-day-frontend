import axios, { AxiosInstance } from 'axios';

export const reservationsApiClient = async (): Promise<AxiosInstance> => {
    let accessToken = localStorage.getItem('accessToken')

    return axios.create({
        baseURL:  `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PREFIX}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const reservationApi = {
    reservations: {
        async getReservations() {
            return (await reservationsApiClient()).get('/reservations')
        },
        async getReservationsById(id: string) {
            return (await reservationsApiClient()).get(`/reservations/${id}`)
        },
        async createReservation(payload: any) {
            return (await reservationsApiClient()).post('/reservations', payload)
        },
        async deleteReservation(id: number) {
            return (await reservationsApiClient()).delete(`/reservations/${id}`)
        }
    }
}