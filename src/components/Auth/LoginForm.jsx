// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Reutiliza el CSS compartido

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!email || !password) {
            setError('¡Email y contraseña son necesarios para entrar al templo!');
            return;
        }
        try {
            const data = await login(email, password);
            setMessage(data.message || '¡Acceso concedido! A darle duro.');
             setTimeout(() => {
                navigate('/chat');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión. ¡Revisa tus credenciales!');
            console.error(err);
        }
    };

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                
                <div className="form-group">
                    <label htmlFor="email-login">Email:</label>
                    <input
                        type="email"
                        id="email-login" // Diferente id si ambos formularios estuvieran en la misma vista (no es el caso aquí)
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="password-login">Contraseña:</label>
                    <input
                        type="password"
                        id="password-login"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit" className="auth-button">¡Entrar!</button>
            </form>
        </div>
    );
}

export default LoginForm;