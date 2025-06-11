import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RoomList from '../components/rooms/RoomList';
import '../styles/HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <Header />
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Ese Rental Service</h1>
                    <p className="hero-subtitle">Find your perfect rental space with ease.</p>
                    <button className="hero-button">
                        Explore Rooms
                    </button>
                </div>
            </section>

            {/* Featured Rooms Section */}
            <section className="featured-section">
                <div className="featured-container">
                    <h2 className="featured-title">Featured Rooms</h2>
                    <RoomList />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default HomePage