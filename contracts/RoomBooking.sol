pragma solidity ^0.5.2;

contract RoomBooking {

    string public name;
    uint public reservationCount = 0;
    mapping(uint => Reservation) public reservations;

    enum Statuses { Confirmed, Canceled }

    struct Room {
        uint id;
        string name;
        string description;
        uint capacity;
        string floor;
        string location;
        address owner;
    }

    struct Reservation {
        uint id;
        string title;
        string description;
        uint startDate;
        uint endDate;
        uint roomId;
        string status;
        address organizer;
    }

    event ReservationCreated(
        uint id,
        string title,
        string description,
        uint startDate,
        uint endDate,
        uint roomId,
        string status,
        address organizer
    );

    event ReservationCanceled(
        uint id,
        string title,
        string description,
        uint startDate,
        uint endDate,
        uint roomId,
        string status,
        address organizer
    );

    constructor() public {
        name = "Room Booking";
    }

    // modifier onlyWhileVacant {
    //     require(currentStatus == Statuses.Vacant, "Currently occupied.");
    //     _;
    // }

    function createReservation(
        string memory _title, 
        string memory _description, 
        uint _startDate, 
        uint _endDate,
        uint _roomId
    ) public {
        // check if items exist
        require(bytes(_title).length > 0);
        require(bytes(_description).length > 0);
        require(_startDate > 0);
        require(_endDate > 0);
        require(_roomId > 0);

        // Make sure uploader address exists
        require(msg.sender!=address(0));

        // increment reservations
        reservationCount ++;

        reservations[reservationCount] = Reservation(reservationCount, _title, _description, _startDate, _endDate, _roomId, "Confirmed", msg.sender);

        emit ReservationCreated(reservationCount, _title, _description, _startDate, _endDate, _roomId, "Confirmed", msg.sender);
    }


    function cancelReservation(uint _id) public {
        require(_id > 0 && _id <= reservationCount);

        Reservation memory _reservation = reservations[_id];
        
        require(msg.sender == _reservation.organizer, "Caller is not the organizer");
        
        string memory _status = _reservation.status;
        
        _reservation.status = "Canceled";
        // Update the reservation
        reservations[_id] = _reservation;

        emit ReservationCanceled(_reservation.id, _reservation.title, _reservation.description, _reservation.startDate, _reservation.endDate, _reservation.roomId, "Canceled", msg.sender);
    }
}