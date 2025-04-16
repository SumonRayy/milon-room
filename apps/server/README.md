 # Milon Room - Server

This is the backend server for the Milon Room video conferencing application. It provides the necessary API endpoints and real-time communication infrastructure for the client application.

## Features

- WebRTC signaling via Socket.io
- PeerJS server for WebRTC peer connections
- RESTful API for room management
- Real-time chat messaging

## Technology Stack

- Node.js
- TypeScript
- Express
- Socket.io
- PeerJS Server
- UUID for unique room identifiers

## Getting Started

### Prerequisites

- Node.js 14+ and npm installed

### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm start
   ```

For development with hot reloading:
```bash
npm run dev
```

## Environment Variables

You can configure the following environment variables:

- `PORT`: The port the server will run on (default: 5000)
- `CLIENT_URL`: The URL of the client application for CORS (default: http://localhost:3000)

## API Endpoints

- `GET /api/room/create` - Create a new room and get the room ID
- `GET /api/room/:roomId` - Check if a room exists

## Socket.io Events

### Client to Server
- `join-room` - Join a room with roomId, userId, and username
- `message` - Send a chat message
- `leave-room` - Leave the current room

### Server to Client
- `user-connected` - Notifies when a new user connects
- `user-disconnected` - Notifies when a user disconnects
- `room-users` - Sends the updated list of users in a room
- `createMessage` - Broadcasts a chat message to all users in a room

## PeerJS Server

The server hosts a PeerJS server at `/peerjs/myapp` to facilitate WebRTC connections between peers.

## License

This project is licensed under the ISC License.