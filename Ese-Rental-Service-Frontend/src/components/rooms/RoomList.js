import React from 'react';

function RoomList() {
    const rooms = [
        { title: 'Luxury Apartment', description: 'Beautiful apartment in the heart of the city.' },
        { title: 'Cozy Private Room', description: 'Perfect for solo travelers.' },
        { title: 'Spacious House', description: 'Ideal for families and groups.' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.title}</h3>
                    <p className="text-gray-600">{room.description}</p>
                </div>
            ))}
        </div>
    );
}

export default RoomList; 