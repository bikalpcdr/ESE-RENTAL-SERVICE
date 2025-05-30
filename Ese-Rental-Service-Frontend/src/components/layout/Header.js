import React, { useState } from 'react';
import '../../styles/header.css';
import { Link } from 'react-router-dom';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    <Link to="/" className="logo">Ese Rental Service</Link>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="mobile-menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <ul className="nav-list">
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/rooms" className="nav-link">Rooms</Link></li>
                            <li><Link to="/about" className="nav-link">About</Link></li>
                            <li><Link to="/contact" className="nav-link">Contact</Link></li>
                            <li><Link to="/login" className="nav-link">Login</Link></li>
                            <li><Link to="/register" className="nav-link">Register</Link></li>
                        </ul>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="mobile-nav-list">
                        <li className="mobile-nav-item"><Link to="/" className="mobile-nav-link">Home</Link></li>
                        <li className="mobile-nav-item"><Link to="/rooms" className="mobile-nav-link">Rooms</Link></li>
                        <li className="mobile-nav-item"><Link to="/about" className="mobile-nav-link">About</Link></li>
                        <li className="mobile-nav-item"><Link to="/contact" className="mobile-nav-link">Contact</Link></li>
                        <li className="mobile-nav-item"><Link to="/login" className="mobile-nav-link">Login</Link></li>
                        <li className="mobile-nav-item"><Link to="/register" className="mobile-nav-link">Register</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header; 