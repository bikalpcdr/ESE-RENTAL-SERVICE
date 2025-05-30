import React from 'react';

function RoomCard({ title, description }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

export default RoomCard; 