import React, { useState } from 'react';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import {
  FaHome, FaGraduate, FaCalendar, FaListCheck,
  FaUser, FaCog, FaSignOutAlt
} from 'react-icons/fa';
import './Navigation.css';

function Navigation({ user, currentPage, setCurrentPage, onLogout, onToggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: FaHome },
    { id: 'grades', label: 'Оценки', icon: FaGraduate },
    { id: 'schedule', label: 'Расписание', icon: FaCalendar },
    { id: 'homework', label: 'Задания', icon: FaListCheck },
    { id: 'profile', label: 'Профиль', icon: FaUser },
    ...(user?.role === 'admin' ? [{ id: 'admin', label: 'Админ', icon: FaCog }] : [])
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar glass-card">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>📚 IThub Journal</h1>
          </div>

          {/* Desktop Menu */}
          <div className="nav-links-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="nav-controls">
            <button className="btn-icon" onClick={onToggleDarkMode} title="Тёмный режим">
              <FiMoon />
            </button>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
            </div>
            <button className="btn btn-danger" onClick={onLogout}>
              <FaSignOutAlt /> Выход
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="nav-links-mobile">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navigation;
