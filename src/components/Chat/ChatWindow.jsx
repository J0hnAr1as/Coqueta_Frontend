// src/components/Chat/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import * as chatService from '../../api/chatService'; // Asegúrate de que la ruta es correcta
import './ChatWindow.css'; // Crea este archivo para estilos

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchHistory = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const history = await chatService.getConversationHistory();
                // Asegurarse de que cada mensaje tenga un ID y timestamp válido
                const formattedHistory = history.map((msg, index) => ({
                    ...msg,
                    id: msg.id || `history-${Date.now()}-${index}`,
                    timestamp: msg.timestamp || new Date().toISOString() 
                }));
                setMessages(formattedHistory);
            } catch (err) {
                console.error("Error al cargar el historial:", err);
                setError('Error al cargar tu progreso. Intenta recargar o más tarde.');
                // Podrías añadir un mensaje de error al chat si lo deseas
                setMessages([{ 
                    id: `error-${Date.now()}`,
                    sender: 'bot', 
                    text: 'Big Sam no pudo cargar el historial. ¡Intenta de nuevo!', 
                    timestamp: new Date().toISOString() 
                }]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { 
            id: `user-${Date.now()}`,
            text,
            sender: 'user', 
            timestamp: new Date().toISOString() 
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const { botResponse } = await chatService.sendMessage(text);
             // Asegurarse de que la respuesta del bot también tenga un timestamp
            const formattedBotResponse = {
                ...botResponse,
                id: `bot-${Date.now()}`,
                timestamp: botResponse.timestamp || new Date().toISOString()
            };
            setMessages(prev => [...prev, formattedBotResponse]);
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
            setError('Big Sam está en un descanso, no pudo responder. Intenta de nuevo.');
            const errorBotMessage = {
                id: `error-${Date.now()}`,
                text: 'Hubo un problema al contactar a Big Sam. Intenta más tarde.',
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            // Add error message from bot to the chat
            setMessages(prev => [...prev, errorBotMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div 
            className="chat-window"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="chat-header">
                <FaRobot className="chat-icon" />
                <h2>Asistente de Fitness</h2>
            </div>

            <div className="chat-messages">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MessageList messages={[message]} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && (
                    <motion.div 
                        className="loading-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <FaSpinner className="spinner" />
                        <span>Asistente escribiendo...</span>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </motion.div>
    );
};

export default ChatWindow;