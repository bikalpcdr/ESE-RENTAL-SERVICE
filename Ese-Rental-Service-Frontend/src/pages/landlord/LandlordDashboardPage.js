import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../styles/landlord/LandlordDashboardPage.css'; // We'll create this CSS

function LandlordDashboardPage() {
    return (
        <div className="landlord-dashboard-container">
            <Header />
            <main className="landlord-dashboard-main">
                <h1 className="dashboard-title">Welcome, Landlord!</h1>
                <section className="dashboard-section">
                    <h2>Your Properties</h2>
                    <p>Manage your listed rental properties here. Add new properties, edit details, or remove them.</p>
                    {/* TODO: Implement landlord's property list and management components */}
                </section>
                <section className="dashboard-section">
                    <h2>Property Bookings</h2>
                    <p>View and manage bookings for your properties.</p>
                    {/* TODO: Implement landlord's booking management components */}
                </section>
                <section className="dashboard-section">
                    <h2>Rental Applications</h2>
                    <p>Review and approve rental applications for your properties.</p>
                    {/* TODO: Implement rental application management */}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default LandlordDashboardPage; 