// src/pages/ChatPage.jsx
import React from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import { useAuth } from '../context/AuthContext'; // Para el saludo o info del usuario
import './ChatPage.css'; // Puedes mantener estilos generales para la página aquí

function ChatPage() {
    const { user, logout } = useAuth(); // `logout` no se usa aquí pero podría ser para un header de página

    // Si `user` aún no está cargado (por ejemplo, en la carga inicial de la app)
    // `ProtectedRoute` ya debería manejar esto, pero una comprobación adicional no hace daño.
    if (!user) {
        return <p className="loading-chat">Cargando tu sesión de entrenamiento...</p>;
    }
    
    return (
        <div className="chat-page-container">
            {/* Podrías tener un encabezado específico para la página de chat aquí si lo deseas.
                Por ejemplo:
                <header className="chat-page-header">
                    <h1>Habla con Big Sam</h1>
                    <p>¡Listo para planificar tu rutina, {user.username}!</p>
                </header> 
            */}
            <ChatWindow />
        </div>
    );
}

export default ChatPage;