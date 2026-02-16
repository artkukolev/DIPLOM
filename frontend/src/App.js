import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { authAPI } from './api/client';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Messages from './pages/Messages';
import EventsCalendar from './pages/EventsCalendar';
import SchoolNewspaper from './pages/SchoolNewspaper';
import ForParents from './pages/ForParents';
import Chat from './pages/Chat';
import Support from './pages/Support';
import ScheduleManager from './pages/ScheduleManager';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="text-center">
          <div className="animate-spin text-white text-4xl mb-4">⏳</div>
          <p className="text-white text-lg font-semibold">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/calendar" element={<EventsCalendar />} />
            <Route path="/newspaper" element={<SchoolNewspaper />} />
            <Route path="/for-parents" element={<ForParents />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/support" element={<Support />} />
            <Route path="/schedule" element={<ScheduleManager />} />
          </Routes>
          <div className="fixed bottom-4 right-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg font-bold transition"
            >
              🚪 Выход
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
