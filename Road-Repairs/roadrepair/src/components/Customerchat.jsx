import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftCircle, Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChatMessagesAPI } from '../services/chatServices';
import { getBreakdownByIdAPI } from '../services/breakdownServices';
import { useSelector } from 'react-redux';

const ChatPage = () => {
    const navigate = useNavigate();
    const socket = useRef(null);
    const messageContainerRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const token = useSelector((state) => state.auth.token);
    const user = jwtDecode(token);
    const currentUserId = user.id;
    const queryClient = useQueryClient();
    const { breakdownId } = useParams();

    const { data: breakdown } = useQuery({
        queryFn: () => getBreakdownByIdAPI(breakdownId),
        queryKey: ['get-breakdown-by-id'],
    });

    let receiverId = null;
    if (user.role === 'workshop' && breakdown?.user) {
        receiverId = breakdown.user._id;
    } else if (user.role === 'customer' && breakdown?.assignedWorkshop) {
        receiverId = breakdown.assignedWorkshop._id;
    }

    const { data: fetchedMessages, refetch } = useQuery({
        queryKey: ['messages', currentUserId, receiverId],
        queryFn: () => getChatMessagesAPI(breakdownId, currentUserId, receiverId),
        enabled: !!receiverId && !!breakdown?._id,
    });

    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    useEffect(() => {
        if (!receiverId) return;

        socket.current = io(import.meta.env.VITE_APP_BASE_URL);
        socket.current.on('connect', () => {
            socket.current.emit('joinRoom', { senderId: currentUserId, receiverId });
        });
        socket.current.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [currentUserId, receiverId]);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const payload = {
            senderId: currentUserId,
            receiverId,
            content: newMessage,
            breakdownId,
        };

        socket.current.emit('chatMessage', payload);
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 to-blue-950 text-white">
            <div className="bg-gray-950 p-4 flex items-center gap-4 border-b border-gray-800">
                <ArrowLeftCircle className="w-6 h-6 text-yellow-400 cursor-pointer" onClick={() => navigate(-1)} />
                <h2 className="text-lg font-bold text-yellow-400">Chat</h2>
            </div>

            {!receiverId ? (
                <div className="flex-1 flex items-center justify-center text-xl text-gray-400">
                    No workshop has accepted the invitation yet.
                </div>
            ) : (
                <>
                    <div ref={messageContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
                        {messages?.map((msg) => (
                          
                            <div
                                key={msg?._id}
                                className={`max-w-[70%] p-3 rounded-lg shadow-md ${msg?.sender._id === currentUserId ? 'bg-yellow-400 text-black ml-auto' : 'bg-gray-700 text-white'}`}> 
                                {console.log(msg?.createdAt.toLocaleString())}
                                 <div>{msg?.content}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                {msg?.createdAt
                                    ? new Date(msg.createdAt).toLocaleString()
                                    : 'Invalid or Missing Date'}
                            </div>
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
                            disabled={!receiverId}
                        />
                        <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition" onClick={handleSendMessage} disabled={!receiverId}>
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatPage;