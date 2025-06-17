import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../styles/customer/CustomerDashboardPage.css'; // We'll create this CSS

function CustomerDashboardPage() {
    return (
        <div className="customer-dashboard-container">
            <Header />
            <main className="customer-dashboard-main">
                <h1 className="dashboard-title">Welcome, Customer!</h1>
                <section className="dashboard-section">
                    <h2>Your Bookings</h2>
                    <p>Manage your current and past bookings here.</p>
                    {/* TODO: Implement customer bookings list component */}
                </section>
                <section className="dashboard-section">
                    <h2>Browse Rooms</h2>
                    <p>Explore available rooms for rent.</p>
                    {/* TODO: Implement room browsing component */}
                </section>
                <section className="dashboard-section">
                    <h2>Your Profile</h2>
                    <p>Update your personal information.</p>
                    {/* TODO: Implement customer profile management component */}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default CustomerDashboardPage; 