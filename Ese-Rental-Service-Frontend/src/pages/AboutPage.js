import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/AboutPage.css';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <Header />
            <main className="about-main">
                <section className="about-hero">
                    <h1 className="about-title">About Ese Rental Service</h1>
                    <p className="about-description">
                        Ese Rental Service is dedicated to making it easy for you to find your perfect rental space. Whether you're looking for a cozy apartment, a spacious house, or a private room, our platform connects you with the best options available.
                    </p>
                </section>
                <section className="about-mission-section">
                    <h2 className="about-mission-title">Our Mission</h2>
                    <p className="about-mission-text">
                        Our mission is to simplify the rental process for everyone. We believe in transparency, trust, and providing a seamless experience for both renters and landlords. With a user-friendly interface and a wide range of listings, we strive to be your go-to rental service.
                    </p>
                </section>
                <div className="page-nav-buttons">
                    <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
                    <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default AboutPage; 