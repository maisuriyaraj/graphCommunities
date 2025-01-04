import { io } from 'socket.io-client';

class SocketClient {
    constructor(serverUrl, options = {}) {
        this.serverUrl = serverUrl;
        this.options = options;
        this.socket = null; // The Socket.IO instance
    }

    // Connect to the server
    connect() {
        if (!this.socket) {
            this.socket = io(this.serverUrl, this.options);

            // Handle connection success
            this.socket.on('connect', () => {
                // console.log('Connected to the server:', this.socket.id);
            });

            // Handle connection errors
            this.socket.on('connect_error', (error) => {
                console.error('Connection error:', error);
            });

            // Handle disconnection
            this.socket.on('disconnect', (reason) => {
                // console.log('Disconnected from the server:', reason);
            });
        }
    }

    // Disconnect from the server
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    // Emit an event to the server
    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    // Listen for an event from the server
    on(event, callback) {
        if (this.socket) {
            this.socket.on(event, callback);
        }
    }

    // Remove a listener for an event
    off(event) {
        if (this.socket) {
            this.socket.off(event);
        }
    }
}

export default SocketClient;
