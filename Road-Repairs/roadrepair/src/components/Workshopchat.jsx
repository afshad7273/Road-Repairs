import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ArrowLeftCircle, Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const Workshopchat = () => {
    const { breakdownId, userId } = useParams(); // userId is the customer
    const navigate = useNavigate();
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageContainerRef = useRef(null);
    const currentUserId = useSelector((state) => state.auth.id);
    const [canChat, setCanChat] = useState(true);

    const { data: breakdown } = useQuery({
        queryKey: ['breakdown', breakdownId],
        queryFn: () => getBreakdownByIdAPI(breakdownId),
    });

    useEffect(() => {
        if (breakdown) {
            setCanChat(breakdown.status !== 'completed');
        }
    }, [breakdown]);

    useEffect(() => {
        if (!canChat) {
            alert('This breakdown is completed, you cannot chat.');
        }
    }, [canChat]);

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_APP_BASE_URL);

        socket.current.on('connect', () => {
            console.log('Socket connected');
            socket.current.emit('joinRoom', {
                senderId: currentUserId,
                receiverId: userId,
            });
        });

        socket.current.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [currentUserId, userId]);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (breakdownId && currentUserId && userId) {
                try {
                    const fetchedMessages = await getChatMessagesAPI(breakdownId, currentUserId, userId);
                    setMessages(fetchedMessages);
                } catch (err) {
                    console.error('Error fetching messages:', err);
                }
            }
        };

        fetchMessages();
    }, [breakdownId, currentUserId, userId]);

    const handleSendMessage = async () => {
        if (newMessage && canChat) {
            const messageData = {
                senderId: currentUserId,
                receiverId: userId,
                content: newMessage,
                breakdownId,
            };
            try {
                const createdMessage = await createChatMessageAPI(messageData);
                socket.current.emit('chatMessage', {
                    senderId: currentUserId,
                    receiverId: userId,
                    message: createdMessage,
                });
                setNewMessage('');
            } catch (err) {
                console.error('Error sending message:', err);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 to-blue-950 text-white">
            <div className="bg-gray-950 p-4 flex items-center gap-4 border-b border-gray-800">
                <ArrowLeftCircle className="w-6 h-6 text-yellow-400 cursor-pointer" onClick={() => navigate(-1)} />
                <h2 className="text-lg font-bold text-yellow-400">
                    Chat with {breakdown?.user?.name || 'Customer'}
                </h2>
            </div>

            <div ref={messageContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`max-w-[70%] p-3 rounded-lg shadow-md ${msg.sender._id === currentUserId ? 'bg-yellow-400 text-black ml-auto' : 'bg-gray-700 text-white'}`}
                    >
                        <div>{msg.content}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-gray-800 flex items-center gap-2 border-t border-gray-700">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-3 rounded bg-gray-700 text-white focus:outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
                    onClick={handleSendMessage}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Workshopchat;
