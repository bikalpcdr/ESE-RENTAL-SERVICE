import React from 'react';
import '../../styles/rooms/RoomList.css'; // We'll create this CSS file

function RoomList() {
    // This is a placeholder component. In a real application, you would fetch room data here.
    const rooms = [
        {
            id: 1,
            title: 'Cozy Apartment in City Center',
            description: 'A beautiful 1-bedroom apartment close to all amenities.',
            pricePerMonth: 800,
            imageUrl: 'https://via.placeholder.com/300x200?text=Room+1'
        },
        {
            id: 2,
            title: 'Spacious Family House',
            description: '4-bedroom house with a large backyard, perfect for families.',
            pricePerMonth: 1500,
            imageUrl: 'https://via.placeholder.com/300x200?text=Room+2'
        },
        {
            id: 3,
            title: 'Modern Studio Flat',
            description: 'Compact and stylish studio, ideal for singles or couples.',
            pricePerMonth: 600,
            imageUrl: 'https://via.placeholder.com/300x200?text=Room+3'
        }
    ];

    return (
        <div className="room-list-container">
            {rooms.map(room => (
                <div key={room.id} className="room-card">
                    <img src={room.imageUrl} alt={room.title} className="room-image" />
                    <div className="room-info">
                        <h3 className="room-title">{room.title}</h3>
                        <p className="room-description">{room.description}</p>
                        <p className="room-price">${room.pricePerMonth} / month</p>
                        <button className="view-details-btn">View Details</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RoomList; 