import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import useSignalR from '../config/signalr';
import { message, Modal, Input, Button } from 'antd';
import CryptoJS from 'crypto-js';
import { CopyOutlined, ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [userId, setUserId] = useState('');
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const [hmacKey, setHmacKey] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(true);

    // Initialize SignalR connection
    const { connection, error, invokeWithAuth } = useSignalR();
    useEffect(() => {
        if (error) {
            console.error("SignalR Connection Error:", error);
            navigate("/login");
        }
    }, [error, navigate]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const currentUserId = sessionStorage.getItem('userId') || '';
        setUserId(currentUserId);
    }, []);

    useEffect(() => {
        if (connection && hmacKey) {
            connection.on("ReceiveMessage", (senderId, messageContent) => {
                try {
                    const decryptedMessage = CryptoJS.AES.decrypt(messageContent, hmacKey).toString(CryptoJS.enc.Utf8);
                    const senderIdStr = String(senderId);
                    const isUser = String(senderId) === String(userId);
                    const senderName = isUser ? "You" : `User ${senderIdStr.substr(0, 4)}`;

                    setMessages(prev => [...prev, {
                        sender: senderName,
                        message: decryptedMessage,
                        isUser: isUser,
                        timestamp: new Date()
                    }]);
                } catch (err) {
                    message.error('Error decrypting message. Perhaps the HMAC key has changed.');
                    console.error('Error decrypting message:', err);
                }
            });
        }

        return () => {
            if (connection) {
                connection.off("ReceiveMessage");
            }
        };
    }, [connection, hmacKey, userId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim() || !connection) return;

        try {
            const encryptedMessage = CryptoJS.AES.encrypt(newMessage, hmacKey).toString();
            await invokeWithAuth("SendMessageGlobal", encryptedMessage);
            setNewMessage('');
        } catch (err) {
            message.error('Error sending message.');
            console.error('Error sending message:', err);
        }
    };

    const handleGenerateKey = () => {
        const randomKey = CryptoJS.lib.WordArray.random(16).toString();
        setHmacKey(randomKey);
        message.success('A new HMAC key has been generated.');
    };

    const handleCopyKey = () => {
        if (!hmacKey) {
            message.error('No HMAC key to copy.');
            return;
        }
        navigator.clipboard.writeText(hmacKey).then(() => {
            message.success('HMAC key copied to clipboard.');
        }).catch(err => {
            message.error('Failed to copy HMAC key.');
            console.error('Clipboard error:', err);
        });
    };

    if (error) {
        message.error('Error:', error);
    }

    return (
        <>
            <Modal
                title="Enter HMAC Key"
                open={isModalVisible}
                onOk={() => {
                    if (hmacKey.trim()) {
                        setIsModalVisible(false);
                    } else {
                        message.error('Please enter a valid HMAC key.');
                    }
                }}
                onCancel={() => setIsModalVisible(false)} 
                closable={true} 
                maskClosable={true}
                okText="Submit"
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Input.Password
                    placeholder="Enter your HMAC key"
                    value={hmacKey}
                    onChange={(e) => setHmacKey(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button icon={<ReloadOutlined />} onClick={handleGenerateKey}>
                        Generate Key
                    </Button>
                    <Button icon={<CopyOutlined />} onClick={handleCopyKey}>
                        Copy Key
                    </Button>
                </div>
            </Modal>

            <div className="flex flex-col flex-auto flex-shrink-0 bg-gray-900 h-full p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h2 className="text-white text-xl">Chat Room</h2>
                    <Button onClick={() => setIsModalVisible(true)}>Change HMAC Key</Button>
                </div>

                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            {messages.map((msg, index) => (
                                <ChatMessage
                                    key={index}
                                    message={msg.message}
                                    sender={msg.sender}
                                    isUser={msg.isUser}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSendMessage} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div>
                        <button type="button" className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656L6.757 7.757a6 6 0 108.486 8.486L20.5 13"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-grow ml-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                placeholder="Type your message..."
                            />
                        </div>
                    </div>
                    <div className="ml-4">
                        <button
                            type="submit"
                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        >
                            <span>Send</span>
                            <span className="ml-2">
                                <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ChatInterface;
