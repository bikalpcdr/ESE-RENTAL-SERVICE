import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/ContactPage.css';
import { useNavigate } from 'react-router-dom';

function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Here you would typically send the form data to your backend
    };

    return (
        <div className="contact-container">
            <Header />
            <main className="contact-main">
                <section className="contact-hero">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-description">We'd love to hear from you! Fill out the form or reach us directly using the information below.</p>
                </section>
                <div className="contact-content">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="contact-submit">Send Message</button>
                        {submitted && <div className="contact-success">Thank you for contacting us!</div>}
                    </form>
                    <div className="contact-info">
                        <h2>Our Contact Information</h2>
                        <ul>
                            <li>Email: bikalpcdr42@gmail.com</li>
                            <li>Phone: 9863261000</li>
                            <li>Address: Bhatke-Paati, Kirtipur, Kathmandu</li>
                        </ul>
                    </div>
                </div>
                <div className="page-nav-buttons">
                    <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
                    <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ContactPage; 