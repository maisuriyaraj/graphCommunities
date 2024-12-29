import React, { createContext, useContext, useEffect } from 'react';
import SocketClient from '../utils/SocketService';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socketClient = new SocketClient('http://localhost:8080', {
        withCredentials: true,
    });

    useEffect(() => {
        socketClient.connect();

        return () => {
            socketClient.disconnect();
        };
    }, [socketClient]);

    return (
        <SocketContext.Provider value={socketClient}>
            {children}
        </SocketContext.Provider>
    );
};
