import React, { useEffect, useRef } from 'react';
import { useUnit } from 'effector-react';
import { Chart, type ChartConfiguration } from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import { $classStudents } from '../model/students';
import { showNotification } from '../model/notifications';

export function DashboardPage() {
  const navigate = useNavigate();
  const students = useUnit($classStudents);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config: ChartConfiguration<'line', number[], string> = {
      type: 'line',
      data: {
        labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        datasets: [
          {
            label: 'Средний балл',
            data: [3.8, 4.0, 4.1, 4.2],
            borderColor: '#6a0dad',
            backgroundColor: 'rgba(106, 13, 173, 0.1)',
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 3,
            max: 5,
          },
        },
      },
    };

    const chart = new Chart(canvasRef.current, config);
    return () => chart.destroy();
  }, []);

  return (
    <section className="content-section active" id="dashboard-section">
      <div className="welcome-section">
        <h2>Добро пожаловать, Иван Иванович!</h2>
        <p>
          Ваш класс: <strong>10 "А" - Физико-математический</strong>
        </p>

        <div className="quick-actions">
          <button
            className="btn btn-primary"
            id="addStudentMainBtn"
            onClick={() => {
              // перенаправляем на страницу студентов и открываем модалку
              navigate('/students?modal=add');
            }}
          >
            <i className="fas fa-user-plus"></i> Добавить ученика
          </button>
          <button
            className="btn btn-success"
            id="exportToExcelBtn"
            onClick={() => showNotification({ message: 'Экспорт доступен на странице "Учащиеся"', type: 'info' })}
          >
            <i className="fas fa-file-excel"></i> Экспорт в Excel
          </button>
          <button className="btn btn-outline" id="printReportsBtn" onClick={() => window.print()}>
            <i className="fas fa-print"></i> Печать отчетов
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Всего учащихся</div>
            <div className="stat-value" id="totalStudents">
              {students.length}
            </div>
            <div className="stat-detail">В классе</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Средний балл</div>
            <div className="stat-value">4.2</div>
            <div className="stat-detail">Демо</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Посещаемость</div>
            <div className="stat-value">96%</div>
            <div className="stat-detail">Демо</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Нарушители</div>
            <div className="stat-value">3</div>
            <div className="stat-detail">Демо</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Последние оповещения</h3>
            <span className="badge">3 новых</span>
          </div>
          <div className="card-body">
            <div className="alert-item warning">
              <h4>Пропуски занятий</h4>
              <p>Петров Алексей пропустил 2 урока математики на этой неделе</p>
              <small>Сегодня, 10:23</small>
            </div>
            <div className="alert-item danger">
              <h4>Низкая успеваемость</h4>
              <p>Сидоров Иван имеет неудовлетворительные оценки по физике</p>
              <small>Вчера, 15:47</small>
            </div>
            <div className="alert-item info">
              <h4>Родительское собрание</h4>
              <p>Напоминание о родительском собрании 25 октября в 18:00</p>
              <small>2 дня назад</small>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Статистика успеваемости</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas id="performanceChart" ref={canvasRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

