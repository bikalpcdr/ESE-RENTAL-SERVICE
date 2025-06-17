import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../../styles/common/ContactPage.css';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState(''); // To show success/error message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        // In a real application, you would send this data to your backend
        // For now, we'll simulate a successful submission
        try {
            // const response = await axios.post('/api/contact', formData);
            // if (response.data.success) {
            //     setStatus('Message sent successfully!');
            //     setFormData({ name: '', email: '', subject: '', message: '' });
            // } else {
            //     setStatus('Failed to send message. Please try again.');
            // }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('Failed to send message. Please try again.');
            console.error('Contact form submission error:', error);
        }
    };

    return (
        <div className="contact-container">
            <Header />
            <main className="contact-main">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-description">
                    Have questions, suggestions, or feedback? We'd love to hear from you. Fill out the form below or reach out to us through our contact details.
                </p>
                <div className="contact-content">
                    <section className="contact-form-section">
                        <h2 className="section-title">Send Us a Message</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />

                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>

                            <button type="submit" className="submit-button" disabled={status === 'Sending...'}>
                                {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                            </button>
                            {status && <p className="form-status-message">{status}</p>}
                        </form>
                    </section>

                    <section className="contact-info-section">
                        <h2 className="section-title">Our Contact Details</h2>
                        <div className="contact-details">
                            <p><strong>Address:</strong> 123 Rental St, Cityville, Country</p>
                            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                            <p><strong>Email:</strong> info@eserental.com</p>
                            <p><strong>Business Hours:</strong> Mon - Fri: 9:00 AM - 5:00 PM</p>
                        </div>
                        <div className="social-media">
                            <h2 className="section-title">Follow Us</h2>
                            <p>Connect with us on social media:</p>
                            {/* Add social media icons/links here */}
                            <div className="social-icons">
                                <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
                                <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
                                <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ContactPage; 