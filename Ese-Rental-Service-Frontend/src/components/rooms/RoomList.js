import React from 'react';
import RoomCard from './RoomCard';

function RoomList() {
    const rooms = [
        { title: 'Luxury Apartment', description: 'Beautiful apartment in the heart of the city.' },
        { title: 'Cozy Private Room', description: 'Perfect for solo travelers.' },
        { title: 'Spacious House', description: 'Ideal for families and groups.' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
                <RoomCard key={index} title={room.title} description={room.description} />
            ))}
        </div>
    );
}

export default RoomList; 