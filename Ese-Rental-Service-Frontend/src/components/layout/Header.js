import React, { useState } from 'react';
import '../../styles/header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-content">
                    <a href="/" className="logo">Ese Rental Service</a>
                    
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
                            <li><a href="/" className="nav-link">Home</a></li>
                            <li><a href="/rooms" className="nav-link">Rooms</a></li>
                            <li><a href="/about" className="nav-link">About</a></li>
                            <li><a href="/contact" className="nav-link">Contact</a></li>
                        </ul>
                    </nav>

                    {/* User Dropdown */}
                    <div className="user-dropdown">
                        <button 
                            className="user-button"
                            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        <div className={`dropdown-menu ${isUserDropdownOpen ? 'active' : ''}`}>
                            <a href="/login" className="dropdown-item">Login</a>
                            <a href="/register" className="dropdown-item">Register</a>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="mobile-nav-list">
                        <li className="mobile-nav-item"><a href="/" className="mobile-nav-link">Home</a></li>
                        <li className="mobile-nav-item"><a href="/rooms" className="mobile-nav-link">Rooms</a></li>
                        <li className="mobile-nav-item"><a href="/about" className="mobile-nav-link">About</a></li>
                        <li className="mobile-nav-item"><a href="/contact" className="mobile-nav-link">Contact</a></li>
                        <li className="mobile-nav-item"><a href="/login" className="mobile-nav-link">Login</a></li>
                        <li className="mobile-nav-item"><a href="/register" className="mobile-nav-link">Register</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header; 