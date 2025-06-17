import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../../styles/common/AboutPage.css';

function AboutPage() {
    return (
        <div className="about-container">
            <Header />
            <main className="about-main">
                <h1 className="about-title">About Us</h1>
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>At Ese Rental Service, our mission is to simplify the rental process for both landlords and tenants. We strive to provide a seamless, secure, and efficient platform where individuals can easily find and rent properties, and property owners can effortlessly manage their listings and bookings.</p>
                </section>
                <section className="about-section">
                    <h2>Our Vision</h2>
                    <p>We envision a world where renting is a stress-free experience, powered by innovative technology and a commitment to customer satisfaction. We aim to be the leading rental service provider, recognized for our reliability, transparency, and user-friendly interface.</p>
                </section>
                <section className="about-section">
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Customer Focus:</strong> We prioritize the needs and satisfaction of our users.</li>
                        <li><strong>Innovation:</strong> We continuously seek new ways to improve our platform and services.</li>
                        <li><strong>Integrity:</strong> We operate with honesty and transparency in all our dealings.</li>
                        <li><strong>Community:</strong> We foster a supportive and connected rental community.</li>
                        <li><strong>Excellence:</strong> We are committed to delivering high-quality services and exceptional user experiences.</li>
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AboutPage; 