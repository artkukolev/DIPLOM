import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
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

const navigation = [
  { name: 'Главная', href: '/', icon: '🏠' },
  { name: 'Журнал', href: '/journal', icon: '📚' },
  { name: 'Сообщения', href: '/messages', icon: '💬' },
  { name: 'Календарь', href: '/calendar', icon: '📅' },
  { name: 'Газета', href: '/newspaper', icon: '📰' },
  { name: 'Родителям', href: '/for-parents', icon: '👨‍👩‍👧‍👦' },
  { name: 'Чат', href: '/chat', icon: '💭' },
  { name: 'Поддержка', href: '/support', icon: '🆘' },
  { name: 'Расписание', href: '/schedule', icon: '⏰' },
];

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const location = useLocation();

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

    // Load theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (loading) {
    return (
      <div className="hawk-flex hawk-items-center hawk-justify-center" style={{ minHeight: '100vh', background: 'var(--hawk-background-primary)' }}>
        <div className="hawk-text-center hawk-animate-fade-in-up">
          <div className="hawk-spinner hawk-mb-4"></div>
          <h2 className="hawk-font-semibold" style={{ color: 'var(--hawk-text-primary)' }}>Загрузка EduManager...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!user ? (
        <Login />
      ) : (
        <div className="hawk-flex" style={{ minHeight: '100vh', background: 'var(--hawk-background-primary)' }}>
          {/* Sidebar */}
          <div
            className={`hawk-flex-col ${sidebarOpen ? 'hawk-translate-x-0' : '-hawk-translate-x-full'} hawk-transition-transform hawk-duration-300 hawk-ease-in-out lg:hawk-translate-x-0 lg:hawk-static lg:hawk-inset-0`}
            style={{
              position: 'fixed',
              inset: '0 0 0 0',
              width: '320px',
              zIndex: 50,
              background: 'var(--elle-background-primary)',
              borderRight: '1px solid var(--elle-gray-4)',
              transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div className="hawk-flex hawk-flex-col hawk-h-full hawk-pt-6 hawk-pb-4 hawk-overflow-y-auto">
              {/* Logo and Brand */}
              <div className="hawk-flex hawk-items-center hawk-flex-shrink-0 hawk-px-6 hawk-mb-8">
                <div className="hawk-logo hawk-mr-4">
                  🎓
                </div>
                <div>
                  <h1 className="hawk-font-bold" style={{ fontSize: 'var(--hawk-font-size-2xl)', color: 'var(--hawk-text-primary)', fontFamily: 'Inter, sans-serif' }}>
                    EduManager
                  </h1>
                  <p className="hawk-text-secondary" style={{ fontSize: 'var(--hawk-font-size-sm)' }}>
                    Профессиональная система
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="hawk-flex-1 hawk-px-4 hawk-space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`hawk-nav-item ${location.pathname === item.href ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="icon">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>

              {/* User Section */}
              <div className="hawk-flex-shrink-0 hawk-px-4 hawk-mt-8">
                <div className="hawk-card hawk-p-4 hawk-mb-4">
                  <div className="hawk-flex hawk-items-center hawk-space-x-3">
                    <div className="hawk-w-10 hawk-h-10 hawk-rounded-full hawk-bg-blue-500 hawk-flex hawk-items-center hawk-justify-center hawk-text-white hawk-font-semibold">
                      {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="hawk-flex-1 hawk-min-w-0">
                      <p className="hawk-font-medium hawk-truncate" style={{ color: 'var(--hawk-text-primary)' }}>
                        {user?.fullName || 'Пользователь'}
                      </p>
                      <p className="hawk-text-secondary hawk-text-sm hawk-truncate">
                        {user?.role === 'admin' ? 'Администратор' :
                         user?.role === 'teacher' ? 'Преподаватель' : 'Ученик'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Theme Toggle */}
                <div className="hawk-flex hawk-items-center hawk-justify-between hawk-mb-4">
                  <span className="hawk-text-secondary" style={{ fontSize: 'var(--hawk-font-size-sm)' }}>
                    Тема
                  </span>
                  <button
                    onClick={toggleTheme}
                    className={`hawk-theme-toggle ${theme === 'dark' ? 'active' : ''}`}
                    aria-label="Переключить тему"
                  />
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="hawk-btn hawk-btn-secondary hawk-w-full"
                >
                  🚪 Выйти
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="hawk-flex-1 hawk-flex hawk-flex-col hawk-min-h-screen">
            {/* Top Bar */}
            <header className="hawk-flex hawk-items-center hawk-justify-between hawk-px-6 hawk-py-4 hawk-border-b" style={{ borderColor: 'var(--hawk-border)' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hawk-hidden hawk-p-2 hawk-rounded-lg hover:hawk-bg-gray-100 dark:hover:hawk-bg-gray-800 hawk-transition-colors"
                style={{ color: 'var(--hawk-text-primary)' }}
              >
                <svg className="hawk-w-6 hawk-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="hawk-flex hawk-items-center hawk-space-x-4">
                <div className="hawk-text-secondary" style={{ fontSize: 'var(--hawk-font-size-sm)' }}>
                  {new Date().toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="hawk-flex-1 hawk-p-6 hawk-overflow-y-auto">
              <div className="hawk-container hawk-animate-fade-in-up">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/calendar" element={<EventsCalendar />} />
                  <Route path="/newspaper" element={<SchoolNewspaper />} />
                  <Route path="/for-parents" element={<ForParents />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/schedule" element={<ScheduleManager />} />
                </Routes>
              </div>
            </main>
          </div>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="hawk-fixed hawk-inset-0 hawk-z-40 hawk-bg-black hawk-bg-opacity-50 lg:hawk-hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
