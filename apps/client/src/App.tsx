import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoomProvider } from './context/RoomContext';
import Home from './pages/Home';
import Room from './pages/Room';
import './styles/App.css';

function App() {
  return (
    <Router>
      <RoomProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </RoomProvider>
    </Router>
  );
}

export default App;
