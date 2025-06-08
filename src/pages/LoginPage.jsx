// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Link } from 'react-router-dom';
import '../components/Auth/AuthForm.css'; // Reutiliza el CSS para el contenedor

function LoginPage() {
    return (
        <div className="login-page">
            <LoginForm />
        </div>
    );
}

export default LoginPage;