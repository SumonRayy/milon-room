# 🎥 Milon Room - Video Conferencing Web App

<div align="center">
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)
  
  A modern video conferencing web application built with TypeScript that allows up to 4-5 users to join video calls with a built-in group chat system.
  
</div>

## ✨ Features

- 📹 Real-time video conferencing with WebRTC
- 💬 Group text chat alongside video
- 🔈 Audio mute/unmute and video on/off controls
- 🔐 Unique room IDs for each meeting
- 📱 Responsive design for desktop and mobile
- 🔄 TypeScript for better type safety

## 🏗️ Architecture

This monorepo uses [Turborepo](https://turbo.build/repo) and contains:

### 📦 Apps and Packages

- `apps/client`: React frontend client with TypeScript and Vite
- `apps/server`: Node.js backend server with Express, Socket.io, and PeerJS
- `packages/shared`: Shared TypeScript types and utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/SumonRayy/milon-room.git
   cd milon-room
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

The client will run on http://localhost:3000 and the server on http://localhost:5000.

## 🛠️ Development

### Commands

```bash
# Build all packages and applications
npm run build

# Start development servers
npm run dev

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

## 🌐 How It Works

1. **Creating a Room**: Generate a unique room ID
2. **Joining a Room**: Enter your name and the room ID
3. **Video Chat**: Connect with other participants using WebRTC
4. **Text Chat**: Send and receive messages in real-time

## 🔧 Tech Stack

### Client
- React with TypeScript
- Vite for fast development
- Socket.io client for real-time communication
- PeerJS for WebRTC peer connections
- React Router for navigation

### Server
- Node.js with TypeScript
- Express for API routing
- Socket.io for real-time messaging
- PeerJS server for WebRTC signaling
- UUID for generating unique room IDs

## 📝 License

This project is licensed under the ISC License.

## 👏 Acknowledgments

This project is based on the original Milon-Room project but has been updated with the latest packages and migrated to TypeScript with a Turborepo monorepo architecture.

---

## 🙏 Thanks for checking out the project!
## ⭐ Give it a star if you like it!

### Follow me:

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SumonRayy/)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/sumonrayyy)
[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://sumonrayy.netlify.app/)
