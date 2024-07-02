import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuth();
    useEffect(() => {
        if (authUser) {
            const newSocket = io('https://spec-chat-prod.onrender.com', {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(newSocket);

            newSocket.on('onlineUsers', (users) => {
                setOnlineUsers(users);
            })

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
}