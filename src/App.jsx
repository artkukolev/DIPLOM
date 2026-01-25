import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import GradesPage from './pages/GradesPage';
import SchedulePage from './pages/SchedulePage';
import HomeworkPage from './pages/HomeworkPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
import Navigation from './components/Navigation';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [darkMode, setDarkMode] = useState(false);

  // Загрузить пользователя из localStorage при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem('ithub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleLogin = (email, role) => {
    const user = {
      email,
      role,
      name: `User ${email.split('@')[0]}`,
      id: Math.random().toString(36).substr(2, 9)
    };
    setUser(user);
    localStorage.setItem('ithub_user', JSON.stringify(user));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ithub_user');
    setCurrentPage('login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {user && <Navigation 
        user={user} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        onToggleDarkMode={toggleDarkMode}
      />}

      <main className="main-content">
        {!user ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            {currentPage === 'dashboard' && <Dashboard user={user} />}
            {currentPage === 'grades' && <GradesPage user={user} />}
            {currentPage === 'schedule' && <SchedulePage user={user} />}
            {currentPage === 'homework' && <HomeworkPage user={user} />}
            {currentPage === 'profile' && <ProfilePage user={user} />}
            {currentPage === 'admin' && user.role === 'admin' && <AdminPanel user={user} />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
