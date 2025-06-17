import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../styles/admin/AdminDashboardPage.css';

function AdminDashboardPage() {
    return (
        <div className="admin-dashboard-container">
            <Header />
            <main className="admin-dashboard-main">
                <h1 className="dashboard-title">Welcome, Admin!</h1>
                <section className="dashboard-section">
                    <h2>Property Management</h2>
                    <p>Manage all properties listed on the platform.</p>
                    {/* TODO: Implement property management components */}
                </section>
                <section className="dashboard-section">
                    <h2>Booking Oversight</h2>
                    <p>View and manage all bookings across the platform.</p>
                    {/* TODO: Implement booking oversight components */}
                </section>
                <section className="dashboard-section">
                    <h2>User Oversight</h2>
                    <p>View all users and their details (without edit/delete capabilities like Super Admin).</p>
                    {/* TODO: Implement user viewing component */}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AdminDashboardPage; 