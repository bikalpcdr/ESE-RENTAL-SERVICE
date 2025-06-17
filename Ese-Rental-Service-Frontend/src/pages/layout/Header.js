import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // We will create this context soon
import '../../styles/layout/header.css';

function Header() {
    const { isAuthenticated, logout, userRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to login after logout
    };

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    Ese Rental
                </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            {userRole === 'SUPER_ADMIN' && (
                                <li className="nav-item">
                                    <Link to="/superadmin/dashboard" className="nav-link">Super Admin</Link>
                                </li>
                            )}
                            {userRole === 'ADMIN' && (
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
                                </li>
                            )}
                            {userRole === 'LANDLORD' && (
                                <li className="nav-item">
                                    <Link to="/landlord/dashboard" className="nav-link">Landlord Dashboard</Link>
                                </li>
                            )}
                            {userRole === 'CUSTOMER' && (
                                <li className="nav-item">
                                    <Link to="/customer/dashboard" className="nav-link">My Dashboard</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header; 