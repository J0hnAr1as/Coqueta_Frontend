// src/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { Link } from 'react-router-dom';
import '../components/Auth/AuthForm.css'; // Reutiliza el CSS para el contenedor

function RegisterPage() {
    return (
        <div className="auth-form-container">
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;