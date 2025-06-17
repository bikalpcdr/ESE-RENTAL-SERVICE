import React from 'react';
import '../../styles/superadmin/DashboardOverview.css';

function DashboardOverview({ stats }) {
    return (
        <div className="dashboard-overview">
            <h2 className="overview-title">Dashboard Overview</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Properties</h3>
                    <p>{stats.totalProperties}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Bookings</h3>
                    <p>{stats.totalBookings}</p>
                </div>
                <div className="stat-card">
                    <h3>Active Bookings</h3>
                    <p>{stats.activeBookings}</p>
                </div>
            </div>

            <div className="recent-activities">
                <div className="recent-users">
                    <h3>Recent Users</h3>
                    <ul>
                        {stats.recentUsers.length > 0 ? (
                            stats.recentUsers.map(user => (
                                <li key={user.id}>{user.fullName || user.username} ({user.role})</li>
                            ))
                        ) : (
                            <li>No recent users.</li>
                        )}
                    </ul>
                </div>
                <div className="recent-bookings">
                    <h3>Recent Bookings</h3>
                    <ul>
                        {stats.recentBookings.length > 0 ? (
                            stats.recentBookings.map(booking => (
                                <li key={booking.id}>Booking for {booking.roomTitle} by {booking.customerName}</li>
                            ))
                        ) : (
                            <li>No recent bookings.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardOverview; 