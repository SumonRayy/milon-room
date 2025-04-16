# Milon Room - Client

This is the frontend client for the Milon Room video conferencing application. It provides a modern, responsive user interface for video meetings with up to 4-5 participants.

## Features

- Video conferencing with WebRTC
- Real-time chat messaging
- Create or join rooms with unique IDs
- Mute/unmute audio and enable/disable video
- Responsive design for desktop and mobile

## Technology Stack

- React
- TypeScript
- Vite
- Socket.io Client
- PeerJS for WebRTC
- React Router for navigation
- Axios for HTTP requests

## Getting Started

### Prerequisites

- Node.js 14+ and npm installed
- Milon Room Server running (see server README)

### Installation

1. Clone the repository
2. Navigate to the client directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/`: Source code
  - `components/`: React components
    - `VideoPlayer.tsx`: Component for rendering video streams
    - `Chat.tsx`: Chat interface component
    - `Controls.tsx`: Video/audio control buttons
  - `context/`: React context
    - `RoomContext.tsx`: Context for managing room state
  - `pages/`: Application pages
    - `Home.tsx`: Landing page with create/join room options
    - `Room.tsx`: Video conferencing room page
  - `styles/`: CSS styles
  - `types/`: TypeScript type definitions

## Environment Variables

The client is configured to proxy requests to the server through Vite. You can customize the server URL by modifying the `vite.config.ts` file.

## Browser Support

The application works best in modern browsers with WebRTC support:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is licensed under the ISC License.
