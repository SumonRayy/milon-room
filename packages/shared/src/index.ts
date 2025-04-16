// Room user type
export interface RoomUser {
  userId: string;
  username: string;
}

// Room data
export interface RoomData {
  roomId: string;
  users: RoomUser[];
}

// Message type
export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
}

// Stream type (client-side only, not used in server)
export interface UserStream {
  userId: string;
  username: string;
  stream: MediaStream;
} 