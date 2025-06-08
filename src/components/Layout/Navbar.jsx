// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css'; // Crea este archivo para estilos

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav 
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span>CoquetaAssistant</span>
                </Link>

                <div className="navbar-menu">
                    {isAuthenticated ? (
                        <>
                            <Link to="/chat" className="nav-link">
                                <FaUser className="nav-icon" />
                                <span>Mi Perfil</span>
                            </Link>
                            <button onClick={handleLogout} className="nav-button">
                                <FaSignOutAlt className="nav-icon" />
                                <span>Cerrar Sesión</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">
                                <FaUser className="nav-icon" />
                                <span>Iniciar Sesión</span>
                            </Link>
                            <Link to="/register" className="nav-button">
                                <span>Registrate</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;