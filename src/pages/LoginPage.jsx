// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Link } from 'react-router-dom';
import '../components/Auth/AuthForm.css'; // Reutiliza el CSS para el contenedor

function LoginPage() {
    return (
        <div className="auth-form-container">
            <LoginForm />
            <p className="auth-link">
                ¿Nuevo en el gimnasio? <Link to="/register">¡Regístrate aquí, campeón!</Link>
            </p>
        </div>
    );
}

export default LoginPage;