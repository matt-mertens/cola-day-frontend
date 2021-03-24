export interface Reservation {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    roomId: string;
    organizer: string;
    status: ReservationStatus;
}

export enum ReservationStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED',
}