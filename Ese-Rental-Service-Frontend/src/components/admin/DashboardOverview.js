import React from 'react';

function DashboardOverview({ stats }) {
  return (
    <section className="dashboard-section">
      <h3>System Overview</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Users</h4>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h4>Total Properties</h4>
          <p className="stat-number">{stats.totalProperties}</p>
        </div>
        <div className="stat-card">
          <h4>Total Bookings</h4>
          <p className="stat-number">{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h4>Active Bookings</h4>
          <p className="stat-number">{stats.activeBookings}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Recent Users</h4>
          <div className="recent-list">
            {stats.recentUsers.map(user => (
              <div key={user.id} className="recent-item">
                <span className="item-name">{user.fullName}</span>
                <span className="item-role">{user.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h4>Recent Bookings</h4>
          <div className="recent-list">
            {stats.recentBookings.length > 0 ? (
              stats.recentBookings.map(booking => (
                <div key={booking.id} className="recent-item">
                  <span className="item-name">{booking.propertyName}</span>
                  <span className="item-status">{booking.status}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No recent bookings</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardOverview; 