/**
 * Type definitions for the server application
 */

declare module '@milon-room/shared' {
  export interface RoomUser {
    userId: string;
    username: string;
  }

  export interface RoomData {
    roomId: string;
    users: RoomUser[];
  }

  export interface ChatMessage {
    id: string;
    sender: string;
    text: string;
    timestamp: number;
  }

  export interface UserStream {
    userId: string;
    username: string;
    stream: MediaStream;
  }
}

export interface RoomUser {
  userId: string;
  username: string;
} 