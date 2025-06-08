// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css'; // Un CSS compartido para los formularios de Auth

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!username || !email || !password || !confirmPassword) {
            setError('¡Todos los campos son obligatorios, futuro campeón!');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden. ¡Verifícalas!');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres. ¡Fuerza en esa clave!');
            return;
        }

        try {
            const data = await register(username, email, password);
            setMessage(data.message || '¡Registro exitoso! Prepárate para entrenar.');
            setTimeout(() => {
                navigate('/chat'); // Redirige a la página de chat después de un breve mensaje
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Error en el registro. ¿Quizás ese email ya está en uso?');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>¡Únete al capricho!</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            
            <div className="form-group">
                <label htmlFor="username">Nombre de Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            
            <button type="submit" className="auth-button">¡Registrarme!</button>
        </form>
    );
}

export default RegisterForm;