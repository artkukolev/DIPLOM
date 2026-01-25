import React from 'react';
import { useUnit } from 'effector-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { DEFAULT_USER } from '../model/currentUser';
import { logoutClicked } from '../model/auth';
import { mobileMenuClosed, mobileMenuToggled, sidebarToggled, themeToggled, $mobileMenuOpen, $sidebarCollapsed } from '../model/ui';

function linkClassName({ isActive }: { isActive: boolean }) {
  return ['nav-link', isActive ? 'active' : ''].filter(Boolean).join(' ');
}

function sideLinkClassName({ isActive }: { isActive: boolean }) {
  return ['sidebar-link', isActive ? 'active' : ''].filter(Boolean).join(' ');
}

export function Layout() {
  const navigate = useNavigate();
  const [collapsed, mobileOpen] = useUnit([$sidebarCollapsed, $mobileMenuOpen]);

  return (
    <>
      <header>
        <div className="logo">
          <button className="mobile-menu-toggle" id="mobileMenuToggle" onClick={() => mobileMenuToggled()}>
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo-icon">🏫</div>
          <h1>ITHub Школа - Электронный Журнал</h1>
        </div>
        <div className="user-menu">
          <button className="theme-toggle" id="themeToggle" onClick={() => themeToggled()}>
            <i className="fas fa-moon"></i>
          </button>
          <div className="user-dropdown">
            <div className="user-avatar">ИИ</div>
            <div className="dropdown-content">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-user"></i> Мой профиль
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-cog"></i> Настройки
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <i className="fas fa-question-circle"></i> Помощь
              </a>
              <a
                href="#"
                id="logoutLink"
                onClick={(e) => {
                  e.preventDefault();
                  logoutClicked();
                  mobileMenuClosed();
                  navigate('/login', { replace: true });
                }}
              >
                <i className="fas fa-sign-out-alt"></i> Выйти
              </a>
            </div>
          </div>
          <span className="user-name">
            {DEFAULT_USER.name} (Классный руководитель)
          </span>
        </div>
      </header>

      <nav className={['main-nav', mobileOpen ? 'active' : ''].filter(Boolean).join(' ')} id="mainNav">
        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-home"></i> Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-users"></i> Учащиеся
            </NavLink>
          </li>
          <li>
            <NavLink to="/journals" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-book"></i> Журналы
            </NavLink>
          </li>
          <li>
            <NavLink to="/grades" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-chart-line"></i> Оценки
            </NavLink>
          </li>
          <li>
            <NavLink to="/homework" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-tasks"></i> Задания
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-comments"></i> Сообщения
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-calendar-alt"></i> Календарь
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-chart-bar"></i> Отчеты
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-clock"></i> Расписание
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={linkClassName} onClick={() => mobileMenuClosed()}>
              <i className="fas fa-cog"></i> Администрирование
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="container">
        <aside
          className={[
            'sidebar',
            collapsed ? 'collapsed' : '',
            mobileOpen ? 'active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          id="sidebar"
        >
          <button className="toggle-sidebar" id="toggleSidebar" onClick={() => sidebarToggled()}>
            <i className={collapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'}></i>
          </button>

          <div className="sidebar-section">
            <h3>Мой класс</h3>
            <ul className="sidebar-links">
              <li>
                <NavLink to="/dashboard" className={sideLinkClassName} onClick={() => mobileMenuClosed()}>
                  <span className="icon">
                    <i className="fas fa-users"></i>
                  </span>{' '}
                  <span>10 "А" - Физ-мат</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/students" className={sideLinkClassName} onClick={() => mobileMenuClosed()}>
                  <span className="icon">
                    <i className="fas fa-list"></i>
                  </span>{' '}
                  <span>Список учащихся</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/grades" className={sideLinkClassName} onClick={() => mobileMenuClosed()}>
                  <span className="icon">
                    <i className="fas fa-chart-line"></i>
                  </span>{' '}
                  <span>Успеваемость</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className={sideLinkClassName} onClick={() => mobileMenuClosed()}>
                  <span className="icon">
                    <i className="fas fa-calendar-check"></i>
                  </span>{' '}
                  <span>Посещаемость</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/messages" className={sideLinkClassName} onClick={() => mobileMenuClosed()}>
                  <span className="icon">
                    <i className="fas fa-user-friends"></i>
                  </span>{' '}
                  <span>Родители</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Администрирование</h3>
            <ul className="sidebar-links">
              <li>
                <NavLink to="/admin" className={sideLinkClassName} onClick={() => mobileMenuClosed()}>
                  <span className="icon">
                    <i className="fas fa-folder"></i>
                  </span>{' '}
                  <span>Личные дела</span>
                </NavLink>
              </li>
              <li>
                <a href="#" className="sidebar-link" onClick={(e) => e.preventDefault()}>
                  <span className="icon">
                    <i className="fas fa-file-alt"></i>
                  </span>{' '}
                  <span>Приказы</span>
                </a>
              </li>
              <li>
                <a href="#" className="sidebar-link" onClick={(e) => e.preventDefault()}>
                  <span className="icon">
                    <i className="fas fa-archive"></i>
                  </span>{' '}
                  <span>Архив</span>
                </a>
              </li>
              <li>
                <a href="#" className="sidebar-link" onClick={(e) => e.preventDefault()}>
                  <span className="icon">
                    <i className="fas fa-sliders-h"></i>
                  </span>{' '}
                  <span>Настройки</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Быстрый доступ</h3>
            <ul className="sidebar-links">
              <li>
                <a
                  href="#"
                  id="addStudentBtn"
                  className="sidebar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    // страницы сами откроют нужную модалку
                    navigate('/students?modal=add');
                    mobileMenuClosed();
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-user-plus"></i>
                  </span>{' '}
                  <span>Добавить ученика</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="exportExcelBtn"
                  className="sidebar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/students?export=1');
                    mobileMenuClosed();
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-file-excel"></i>
                  </span>{' '}
                  <span>Экспорт в Excel</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="createReportBtn"
                  className="sidebar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/reports');
                    mobileMenuClosed();
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-file-export"></i>
                  </span>{' '}
                  <span>Создать отчет</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="sendMessageBtn"
                  className="sidebar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/messages');
                    mobileMenuClosed();
                  }}
                >
                  <span className="icon">
                    <i className="fas fa-envelope"></i>
                  </span>{' '}
                  <span>Написать сообщение</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

