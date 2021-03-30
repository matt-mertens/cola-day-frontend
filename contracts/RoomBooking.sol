pragma solidity ^0.6.0;

contract RoomBooking {

    string public name;
    uint public reservationCount = 0;
    mapping(uint => Reservation) public reservations;
    
    uint public roomCount = 0;
    mapping(uint => Room) public rooms;
    
    enum Owners { coke, pepsi }

    struct Room {
        uint id;
        string name;
        string description;
        uint capacity;
        string floor;
        string location;
        string owner;
    }
    
    event RoomCreated(
        uint id,
        string name,
        string description,
        uint capacity,
        string floor,
        string location,
        string owner
    );
    
    enum Statuses { Confirmed, Canceled }

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
    
    function createRoom(
        string memory _name, 
        string memory _description,
        string memory _owner, 
        string memory _floor, 
        string memory _location, 
        uint _capacity
    ) public {
        // check if items exist
        require(bytes(_name).length > 0);
        require(bytes(_description).length > 0);
        require(bytes(_owner).length > 0);
        require(bytes(_floor).length > 0);
        require(bytes(_location).length > 0);
        require(_capacity > 0);

        // increment rooms
        roomCount ++;

        rooms[roomCount] = Room(roomCount, _name, _description, _capacity, _floor, _location, _owner);

        emit RoomCreated(roomCount, _name, _description, _capacity, _floor, _location, _owner);
    }

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
        require(bytes(rooms[_roomId].name).length > 0, "Room does not exist.");

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