import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import { RoomUser, UserStream, ChatMessage } from '@milon-room/shared';

interface RoomContextType {
  socket: Socket | null;
  peer: Peer | null;
  userId: string;
  roomId: string | null;
  username: string;
  isConnected: boolean;
  users: RoomUser[];
  streams: UserStream[];
  messages: ChatMessage[];
  localStream: MediaStream | null;
  setRoomId: (roomId: string) => void;
  setUsername: (username: string) => void;
  sendMessage: (message: string) => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
}

const RoomContext = createContext<RoomContextType | null>(null);

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [userId] = useState<string>(uuidv4());
  const [roomId, setRoomId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [streams, setStreams] = useState<UserStream[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Initialize peer connection
  useEffect(() => {
    if (!socket) return;

    const newPeer = new Peer(userId, {
      host: '/',
      path: '/peerjs/myapp',
    });

    setPeer(newPeer);

    // Clean up on unmount
    return () => {
      newPeer.destroy();
    };
  }, [socket, userId]);

  // Join room
  useEffect(() => {
    if (!socket || !peer || !roomId || !username) return;

    // Get local media stream
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setLocalStream(stream);

        // Add local stream to the list
        setStreams((prevStreams) => [
          ...prevStreams,
          { userId, username, stream },
        ]);

        // Listen for calls and answer with local stream
        peer.on('call', (call) => {
          call.answer(stream);
          call.on('stream', (userVideoStream) => {
            // Get the caller's ID and find their username
            const callerId = call.peer;
            const caller = users.find((user) => user.userId === callerId);
            
            if (caller) {
              // Add the remote stream only if it doesn't already exist
              setStreams((prevStreams) => {
                if (!prevStreams.some((s) => s.userId === callerId)) {
                  return [
                    ...prevStreams,
                    { userId: callerId, username: caller.username, stream: userVideoStream },
                  ];
                }
                return prevStreams;
              });
            }
          });
        });

        // Join the room
        socket.emit('join-room', roomId, userId, username);
        setIsConnected(true);
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    // Handle user connected event
    socket.on('user-connected', (newUserId: string, newUsername: string) => {
      // Call the new user and send our stream
      if (peer && localStream) {
        const call = peer.call(newUserId, localStream);
        call.on('stream', (userVideoStream) => {
          // Add the remote stream only if it doesn't already exist
          setStreams((prevStreams) => {
            if (!prevStreams.some((s) => s.userId === newUserId)) {
              return [
                ...prevStreams,
                { userId: newUserId, username: newUsername, stream: userVideoStream },
              ];
            }
            return prevStreams;
          });
        });
      }
    });

    // Handle room users event
    socket.on('room-users', (roomUsers: RoomUser[]) => {
      setUsers(roomUsers);
    });

    // Handle user disconnected event
    socket.on('user-disconnected', (disconnectedUserId: string) => {
      setStreams((prevStreams) => 
        prevStreams.filter((stream) => stream.userId !== disconnectedUserId)
      );
    });

    // Handle chat messages
    socket.on('createMessage', (messageText: string, senderName: string) => {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        sender: senderName,
        text: messageText,
        timestamp: Date.now(),
      };
      
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up on unmount or when roomId changes
    return () => {
      socket.off('user-connected');
      socket.off('room-users');
      socket.off('user-disconnected');
      socket.off('createMessage');
      
      if (isConnected) {
        leaveRoom();
      }
    };
  }, [socket, peer, roomId, username, userId, users, localStream, isConnected]);

  // Function to send a message
  const sendMessage = (message: string) => {
    if (socket && roomId) {
      socket.emit('message', message);
    }
  };

  // Function to toggle audio
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  // Function to toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Function to leave the room
  const leaveRoom = () => {
    if (socket && roomId) {
      socket.emit('leave-room', roomId, userId);
    }
    
    // Stop all tracks in the local stream
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    
    setLocalStream(null);
    setStreams([]);
    setMessages([]);
    setIsConnected(false);
    setRoomId(null);
  };

  const value = {
    socket,
    peer,
    userId,
    roomId,
    username,
    isConnected,
    users,
    streams,
    messages,
    localStream,
    setRoomId,
    setUsername,
    sendMessage,
    toggleAudio,
    toggleVideo,
    leaveRoom,
    isAudioEnabled,
    isVideoEnabled,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
}; 