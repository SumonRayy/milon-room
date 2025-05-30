import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ExpressPeerServer } from 'peer';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import net from 'net';
// Using local type declaration from types.d.ts file
import { RoomUser } from './types';

// App setup
const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Create Socket.io server with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// PeerJS server
const peerServer = ExpressPeerServer(server, {
  path: '/myapp'
});

app.use('/peerjs', peerServer);

// Define the room data type for server-side storage
interface ServerRoomData {
  users: RoomUser[];
}

// Room data store (in-memory)
const rooms = new Map<string, ServerRoomData>();

// API endpoint to create a new room
app.get('/api/room/create', (req, res) => {
  const roomId = uuidv4();
  rooms.set(roomId, { users: [] });
  res.json({ roomId });
});

// API endpoint to check if a room exists
app.get('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  
  if (rooms.has(roomId)) {
    res.json({ 
      exists: true, 
      roomId, 
      users: rooms.get(roomId)?.users || [] 
    });
  } else {
    res.status(404).json({ exists: false });
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  // Join room event
  socket.on('join-room', (roomId: string, userId: string, username: string) => {
    console.log(`User ${username} (${userId}) joined room ${roomId}`);
    
    // Create room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, { users: [] });
    }
    
    // Add user to room
    const roomData = rooms.get(roomId);
    if (roomData) {
      roomData.users.push({ userId, username });
    }
    
    // Join the room
    socket.join(roomId);
    
    // Notify others in the room
    socket.to(roomId).emit('user-connected', userId, username);
    
    // Send updated user list to everyone in the room
    io.to(roomId).emit('room-users', rooms.get(roomId)?.users || []);
    
    // Handle chat messages
    socket.on('message', (message: string) => {
      io.to(roomId).emit('createMessage', message, username);
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${username} (${userId}) left room ${roomId}`);
      
      // Remove user from room
      const roomData = rooms.get(roomId);
      if (roomData) {
        roomData.users = roomData.users.filter(user => user.userId !== userId);
        
        // Delete empty rooms
        if (roomData.users.length === 0) {
          rooms.delete(roomId);
        } else {
          // Notify others
          socket.to(roomId).emit('user-disconnected', userId, username);
          // Update user list for remaining users
          io.to(roomId).emit('room-users', roomData.users);
        }
      }
    });
  });
});

// Start server
const PORT = Number(process.env.PORT || 5000);

// Check if a port is available
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => {
        resolve(false);
      })
      .once('listening', () => {
        tester.close();
        resolve(true);
      })
      .listen(port);
  });
};

// Find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    console.log(`⚠️  Port ${port} is already in use, trying ${port + 1}...`);
    port += 1;
  }
  return port;
};

const startServer = async (initialPort: number) => {
  try {
    const port = await findAvailablePort(initialPort);
    
    server.listen(port, () => {
      console.log('\n' + 
        '------------------------------------------------------------\n' +
        `🚀 Server running on port ${port}\n` +
        `🌐 Access at http://localhost:${port}\n` +
        `🔌 Socket.IO endpoint: ws://localhost:${port}\n` +
        '------------------------------------------------------------'
      );
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server with the initial port
startServer(PORT); 