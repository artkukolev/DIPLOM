// ===== IThub School - Электронный журнал =====
// Демо-данные и управление приложением

const APP = {
  // Текущий пользователь
  user: null,

  // Демо-данные приложения
  data: {
    students: [
      { id: 1, name: 'Алексей Петров', role: 'student', email: 'alexey@ithub.school', class: '7А', avatar: '👨‍🎓' },
      { id: 2, name: 'Мария Иванова', role: 'student', email: 'maria@ithub.school', class: '7А', avatar: '👩‍🎓' },
      { id: 3, name: 'Иван Сидоров', role: 'student', email: 'ivan@ithub.school', class: '7Б', avatar: '👨‍🎓' },
      { id: 4, name: 'Сафия Азарова', role: 'student', email: 'safiya@ithub.school', class: '7Б', avatar: '👩‍🎓' },
      { id: 5, name: 'Артём Волков', role: 'student', email: 'artem@ithub.school', class: '7В', avatar: '👨‍🎓' },
      { id: 6, name: 'Диана Морозова', role: 'student', email: 'diana@ithub.school', class: '7В', avatar: '👩‍🎓' },
      { id: 7, name: 'Максим Новиков', role: 'student', email: 'maksim@ithub.school', class: '8А', avatar: '👨‍🎓' },
      { id: 8, name: 'Екатерина Лебедева', role: 'student', email: 'ekaterina@ithub.school', class: '8А', avatar: '👩‍🎓' },
    ],
    teachers: [
      { id: 101, name: 'Людмила Сергеевна', role: 'teacher', email: 'lyudmila@ithub.school', subject: 'Python', avatar: '👨‍🏫' },
      { id: 102, name: 'Павел Иванович', role: 'teacher', email: 'pavel@ithub.school', subject: 'Figma', avatar: '👨‍🏫' },
      { id: 103, name: 'Ольга Викторовна', role: 'teacher', email: 'olga@ithub.school', subject: 'Unity', avatar: '👩‍🏫' },
    ],
    parents: [
      { id: 201, name: 'Игорь Петров', role: 'parent', email: 'igor@mail.com', child_id: 1 },
      { id: 202, name: 'Светлана Иванова', role: 'parent', email: 'sveta@mail.com', child_id: 2 },
    ],
    subjects: [
      { id: 1, name: 'Python', teacher_id: 101, color: '#4CAF50' },
      { id: 2, name: 'Figma', teacher_id: 102, color: '#2196F3' },
      { id: 3, name: 'Unity', teacher_id: 103, color: '#FF9800' },
      { id: 4, name: 'Веб-дизайн', teacher_id: 102, color: '#9C27B0' },
      { id: 5, name: 'Информатика', teacher_id: 101, color: '#00BCD4' },
    ],
    grades: [
      { id: 1, student_id: 1, subject_id: 1, grade: 5, date: '2026-01-20', note: 'Отличная работа!' },
      { id: 2, student_id: 1, subject_id: 2, grade: 4, date: '2026-01-19', note: 'Хорошо' },
      { id: 3, student_id: 2, subject_id: 1, grade: 5, date: '2026-01-21', note: 'Превосходно!' },
      { id: 4, student_id: 2, subject_id: 3, grade: 3, date: '2026-01-18', note: 'Нужно больше практики' },
      { id: 5, student_id: 3, subject_id: 2, grade: 4, date: '2026-01-20', note: 'Хороший прогресс' },
      { id: 6, student_id: 4, subject_id: 1, grade: 5, date: '2026-01-21', note: 'Блестящий результат' },
      { id: 7, student_id: 5, subject_id: 3, grade: 4, date: '2026-01-19', note: 'Хорошо справился' },
      { id: 8, student_id: 6, subject_id: 2, grade: 5, date: '2026-01-20', note: 'Отличная работа!' },
    ],
    homework: [
      { id: 1, subject_id: 1, title: 'Написать Змейку на Python', description: 'Реализовать классическую игру Змейка с использованием Pygame', deadline: '2026-01-27', status: 'pending' },
      { id: 2, subject_id: 2, title: 'Дизайн логотипа IThub', description: 'Создать логотип школы в Figma, использовать фирменные цвета', deadline: '2026-01-25', status: 'pending' },
      { id: 3, subject_id: 3, title: 'Сцена в Unity', description: 'Создать сцену с 3D моделями и освещением', deadline: '2026-02-01', status: 'pending' },
      { id: 4, subject_id: 1, title: 'Парсер данных на Python', description: 'Написать парсер, который собирает данные с веб-сайта', deadline: '2026-01-28', status: 'pending' },
      { id: 5, subject_id: 4, title: 'Макет веб-сайта', description: 'Создать макет лендинга в Figma (дизайн+прототип)', deadline: '2026-02-02', status: 'pending' },
    ],
    schedule: {
      'Monday': [
        { time: '09:00-09:45', subject: 'Python', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '10:00-10:45', subject: 'Информатика', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '11:00-11:45', subject: 'Figma', teacher: 'Павел Иванович', room: '102' },
        { time: '12:00-12:45', subject: 'Обед', teacher: '-', room: 'Столовая' },
        { time: '13:00-13:45', subject: 'Unity', teacher: 'Ольга Викторовна', room: '103' },
      ],
      'Tuesday': [
        { time: '09:00-09:45', subject: 'Figma', teacher: 'Павел Иванович', room: '102' },
        { time: '10:00-10:45', subject: 'Python', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '11:00-11:45', subject: 'Веб-дизайн', teacher: 'Павел Иванович', room: '102' },
        { time: '12:00-12:45', subject: 'Обед', teacher: '-', room: 'Столовая' },
        { time: '13:00-13:45', subject: 'Информатика', teacher: 'Людмила Сергеевна', room: '101' },
      ],
      'Wednesday': [
        { time: '09:00-09:45', subject: 'Unity', teacher: 'Ольга Викторовна', room: '103' },
        { time: '10:00-10:45', subject: 'Figma', teacher: 'Павел Иванович', room: '102' },
        { time: '11:00-11:45', subject: 'Python', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '12:00-12:45', subject: 'Обед', teacher: '-', room: 'Столовая' },
        { time: '13:00-13:45', subject: 'Веб-дизайн', teacher: 'Павел Иванович', room: '102' },
      ],
      'Thursday': [
        { time: '09:00-09:45', subject: 'Python', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '10:00-10:45', subject: 'Unity', teacher: 'Ольга Викторовна', room: '103' },
        { time: '11:00-11:45', subject: 'Информатика', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '12:00-12:45', subject: 'Обед', teacher: '-', room: 'Столовая' },
        { time: '13:00-13:45', subject: 'Figma', teacher: 'Павел Иванович', room: '102' },
      ],
      'Friday': [
        { time: '09:00-09:45', subject: 'Веб-дизайн', teacher: 'Павел Иванович', room: '102' },
        { time: '10:00-10:45', subject: 'Python', teacher: 'Людмила Сергеевна', room: '101' },
        { time: '11:00-11:45', subject: 'Unity', teacher: 'Ольга Викторовна', room: '103' },
        { time: '12:00-12:45', subject: 'Обед', teacher: '-', room: 'Столовая' },
        { time: '13:00-13:45', subject: 'Проект', teacher: 'Людмила Сергеевна', room: '101' },
      ],
    },
  },

  // Инициализация приложения
  init() {
    try {
      this.loadUser();
      this.setupEventListeners();
      this.setupNavigation();
      if (this.user) {
        this.showPage('dashboard');
      }
    } catch (error) {
      console.error('Ошибка инициализации приложения:', error);
    }
  },

  // Загрузка пользователя из localStorage
  loadUser() {
    try {
      const savedUser = localStorage.getItem('ithub_user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    } catch (error) {
      console.error('Ошибка загрузки пользователя:', error);
      this.user = null;
    }
  },

  // Сохранение пользователя в localStorage
  saveUser() {
    try {
      localStorage.setItem('ithub_user', JSON.stringify(this.user));
    } catch (error) {
      console.error('Ошибка сохранения пользователя:', error);
    }
  },

  // Вход пользователя
  login(email, role) {
    try {
      let user = null;

      if (role === 'student') {
        user = this.data.students.find(s => s.email.toLowerCase() === email.toLowerCase());
      } else if (role === 'teacher') {
        user = this.data.teachers.find(t => t.email.toLowerCase() === email.toLowerCase());
      } else if (role === 'parent') {
        user = this.data.parents.find(p => p.email.toLowerCase() === email.toLowerCase());
      } else if (role === 'admin') {
        if (email === 'admin@ithub.school') {
          user = { id: 0, name: 'Администратор', role: 'admin', email: 'admin@ithub.school', avatar: '👨‍💼' };
        }
      }

      if (user) {
        this.user = user;
        this.saveUser();
        this.showNotification(`Добро пожаловать, ${user.name}!`, 'success');
        this.showPage('dashboard');
        this.updateHeaderInfo();
        return true;
      } else {
        this.showNotification('Пользователь не найден', 'error');
        return false;
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      this.showNotification('Ошибка при входе', 'error');
      return false;
    }
  },

  // Выход пользователя
  logout() {
    try {
      this.user = null;
      localStorage.removeItem('ithub_user');
      this.showNotification('Вы вышли из системы', 'info');
      this.showPage('login');
      this.updateHeaderInfo();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  },

  // Отображение страницы
  showPage(pageName) {
    try {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const page = document.getElementById(`${pageName}-page`);
      if (page) {
        page.classList.add('active');
        
        // Закрыть мобильное меню
        const aside = document.querySelector('aside');
        if (aside) aside.classList.remove('active');

        // Обновить активный пункт меню
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
          link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-page="${pageName}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Загрузить данные страницы
        if (pageName === 'dashboard') this.loadDashboard();
        if (pageName === 'grades') this.loadGrades();
        if (pageName === 'schedule') this.loadSchedule();
        if (pageName === 'homework') this.loadHomework();
        if (pageName === 'profile') this.loadProfile();
        if (pageName === 'admin') this.loadAdmin();
      }
    } catch (error) {
      console.error('Ошибка отображения страницы:', error);
    }
  },

  // ===== ДАШБОРД =====
  loadDashboard() {
    try {
      const container = document.getElementById('dashboard-content');
      if (!container) return;

      if (this.user.role === 'student') {
        this.loadStudentDashboard(container);
      } else if (this.user.role === 'teacher') {
        this.loadTeacherDashboard(container);
      } else if (this.user.role === 'admin') {
        this.loadAdminDashboard(container);
      }
    } catch (error) {
      console.error('Ошибка загрузки дашборда:', error);
    }
  },

  loadStudentDashboard(container) {
    const studentGrades = this.data.grades.filter(g => g.student_id === this.user.id);
    const recentGrades = studentGrades.slice(-3).reverse();
    const avgGrade = (studentGrades.reduce((sum, g) => sum + g.grade, 0) / studentGrades.length).toFixed(1);
    const upcomingHomework = this.data.homework.filter(h => h.status === 'pending').slice(0, 3);

    container.innerHTML = `
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">${avgGrade}</div>
          <div class="stat-label">Средняя оценка</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${studentGrades.length}</div>
          <div class="stat-label">Всего оценок</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${upcomingHomework.length}</div>
          <div class="stat-label">Активные задания</div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>📊 Последние оценки</h3>
          <div id="recent-grades-list"></div>
        </div>

        <div class="dashboard-card">
          <h3>📝 Предстоящие задания</h3>
          <div id="upcoming-homework-list"></div>
        </div>

        <div class="dashboard-card">
          <h3>📅 Расписание сегодня</h3>
          <div id="today-schedule"></div>
        </div>
      </div>
    `;

    // Заполнить последние оценки
    let gradesHtml = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
    recentGrades.forEach(g => {
      const subject = this.data.subjects.find(s => s.id === g.subject_id);
      gradesHtml += `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: #f5f5f5; border-radius: 4px;">
          <span>${subject.name}</span>
          <span class="grade-badge grade-${g.grade}">${g.grade}</span>
        </div>
      `;
    });
    gradesHtml += '</div>';
    document.getElementById('recent-grades-list').innerHTML = gradesHtml || '<p style="color: #666;">Оценок нет</p>';

    // Заполнить предстоящие задания
    let homeworkHtml = '';
    upcomingHomework.forEach(hw => {
      const subject = this.data.subjects.find(s => s.id === hw.subject_id);
      const daysLeft = Math.ceil((new Date(hw.deadline) - new Date()) / (1000 * 60 * 60 * 24));
      homeworkHtml += `
        <div style="padding: 0.75rem 0; border-bottom: 1px solid #eee;">
          <div style="font-weight: 600; color: #333;">${hw.title}</div>
          <div style="font-size: 0.85rem; color: #666;">От: ${subject.name}</div>
          <div style="font-size: 0.85rem; color: #FF9800; margin-top: 0.25rem;">⏳ ${daysLeft} дн.</div>
        </div>
      `;
    });
    document.getElementById('upcoming-homework-list').innerHTML = homeworkHtml || '<p style="color: #666;">Активные задания отсутствуют</p>';

    // Расписание на сегодня
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayKey = days[new Date().getDay()];
    const todaySchedule = this.data.schedule[dayKey] || [];
    let scheduleHtml = '';
    todaySchedule.forEach(lesson => {
      if (lesson.subject !== 'Обед') {
        scheduleHtml += `
          <div style="padding: 0.75rem 0; border-bottom: 1px solid #eee;">
            <div style="font-weight: 600;">${lesson.time} - ${lesson.subject}</div>
            <div style="font-size: 0.85rem; color: #666;">Кабинет ${lesson.room}</div>
          </div>
        `;
      }
    });
    document.getElementById('today-schedule').innerHTML = scheduleHtml || '<p style="color: #666;">Уроков нет</p>';
  },

  loadTeacherDashboard(container) {
    const teacherSubjects = this.data.subjects.filter(s => s.teacher_id === this.user.id);
    const studentsCount = this.data.students.length;
    const recentGradesCount = this.data.grades.filter(g => {
      const subj = this.data.subjects.find(s => s.id === g.subject_id);
      return subj && subj.teacher_id === this.user.id;
    }).length;

    container.innerHTML = `
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">${teacherSubjects.length}</div>
          <div class="stat-label">Предметы</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${studentsCount}</div>
          <div class="stat-label">Учеников</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${recentGradesCount}</div>
          <div class="stat-label">Выставленных оценок</div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>📚 Мои предметы</h3>
          <div id="teacher-subjects"></div>
        </div>

        <div class="dashboard-card">
          <h3>👥 Мои ученики</h3>
          <div id="teacher-students"></div>
        </div>

        <div class="dashboard-card">
          <h3>📝 Активные задания</h3>
          <div id="teacher-homework"></div>
        </div>
      </div>

      <button class="btn btn-primary" onclick="APP.showModal('addGradeModal')">➕ Выставить оценку</button>
    `;

    let subjectsHtml = '';
    teacherSubjects.forEach(s => {
      subjectsHtml += `<div style="padding: 0.5rem; background: #f5f5f5; border-radius: 4px; margin-bottom: 0.5rem;">${s.name}</div>`;
    });
    document.getElementById('teacher-subjects').innerHTML = subjectsHtml;

    let studentsHtml = '';
    this.data.students.slice(0, 5).forEach(s => {
      studentsHtml += `<div style="padding: 0.5rem; border-bottom: 1px solid #eee;">${s.name}</div>`;
    });
    document.getElementById('teacher-students').innerHTML = studentsHtml;

    let homeworkHtml = '';
    this.data.homework.slice(0, 3).forEach(hw => {
      const subject = this.data.subjects.find(s => s.id === hw.subject_id);
      if (subject && subject.teacher_id === this.user.id) {
        homeworkHtml += `<div style="padding: 0.5rem; border-bottom: 1px solid #eee;">${hw.title}</div>`;
      }
    });
    document.getElementById('teacher-homework').innerHTML = homeworkHtml || '<p style="color: #666;">Нет активных заданий</p>';
  },

  loadAdminDashboard(container) {
    const totalStudents = this.data.students.length;
    const totalTeachers = this.data.teachers.length;
    const totalSubjects = this.data.subjects.length;

    container.innerHTML = `
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">${totalStudents}</div>
          <div class="stat-label">Студентов</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${totalTeachers}</div>
          <div class="stat-label">Учителей</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${totalSubjects}</div>
          <div class="stat-label">Предметов</div>
        </div>
      </div>

      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>👥 Управление пользователями</h3>
          <p>Ученики: ${totalStudents}</p>
          <p>Учителя: ${totalTeachers}</p>
          <button class="btn btn-primary btn-small" onclick="APP.showPage('admin')">Перейти в админ-панель</button>
        </div>

        <div class="dashboard-card">
          <h3>📊 Статистика</h3>
          <p>Всего оценок: ${this.data.grades.length}</p>
          <p>Активных заданий: ${this.data.homework.filter(h => h.status === 'pending').length}</p>
        </div>

        <div class="dashboard-card">
          <h3>📚 Управление контентом</h3>
          <p>Предметов: ${totalSubjects}</p>
          <button class="btn btn-primary btn-small" onclick="APP.showPage('admin')">Редактировать</button>
        </div>
      </div>
    `;
  },

  // ===== ОЦЕНКИ =====
  loadGrades() {
    try {
      const container = document.getElementById('grades-content');
      if (!container) return;

      let grades = this.data.grades;
      if (this.user.role === 'student') {
        grades = grades.filter(g => g.student_id === this.user.id);
      }

      const subjects = this.data.subjects;
      
      container.innerHTML = `
        <div class="search-filter">
          <input type="text" id="search-grades" placeholder="Поиск по предмету...">
          <select id="filter-subject">
            <option value="">Все предметы</option>
            ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
          </select>
          <select id="filter-grade">
            <option value="">Все оценки</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button class="btn btn-primary" onclick="APP.loadGrades()">🔍 Поиск</button>
        </div>

        <div class="table-wrapper">
          <table id="grades-table">
            <thead>
              <tr>
                <th onclick="APP.sortTable('grades-table', 0)">Ученик</th>
                <th onclick="APP.sortTable('grades-table', 1)">Предмет</th>
                <th onclick="APP.sortTable('grades-table', 2)">Оценка</th>
                <th onclick="APP.sortTable('grades-table', 3)">Дата</th>
                <th>Примечание</th>
                ${this.user.role === 'teacher' || this.user.role === 'admin' ? '<th>Действия</th>' : ''}
              </tr>
            </thead>
            <tbody id="grades-tbody"></tbody>
          </table>
        </div>

        ${this.user.role === 'teacher' || this.user.role === 'admin' ? `
          <button class="btn btn-primary" onclick="APP.showModal('addGradeModal')">➕ Добавить оценку</button>
        ` : ''}
      `;

      this.filterAndDisplayGrades(grades, subjects);

      // Обработчики фильтров
      const searchInput = document.getElementById('search-grades');
      const filterSubject = document.getElementById('filter-subject');
      const filterGrade = document.getElementById('filter-grade');

      const applyFilters = () => {
        let filtered = this.data.grades;
        if (this.user.role === 'student') {
          filtered = filtered.filter(g => g.student_id === this.user.id);
        }

        const searchTerm = searchInput.value.toLowerCase();
        const subjectFilter = filterSubject.value;
        const gradeFilter = filterGrade.value;

        filtered = filtered.filter(g => {
          const subject = subjects.find(s => s.id === g.subject_id);
          const student = this.data.students.find(s => s.id === g.student_id);
          
          const matchSearch = !searchTerm || subject.name.toLowerCase().includes(searchTerm) || student.name.toLowerCase().includes(searchTerm);
          const matchSubject = !subjectFilter || g.subject_id === parseInt(subjectFilter);
          const matchGrade = !gradeFilter || g.grade === parseInt(gradeFilter);

          return matchSearch && matchSubject && matchGrade;
        });

        this.filterAndDisplayGrades(filtered, subjects);
      };

      searchInput.addEventListener('input', applyFilters);
      filterSubject.addEventListener('change', applyFilters);
      filterGrade.addEventListener('change', applyFilters);

    } catch (error) {
      console.error('Ошибка загрузки оценок:', error);
    }
  },

  filterAndDisplayGrades(grades, subjects) {
    try {
      const tbody = document.getElementById('grades-tbody');
      if (!tbody) return;

      tbody.innerHTML = grades.map(g => {
        const subject = subjects.find(s => s.id === g.subject_id);
        const student = this.data.students.find(s => s.id === g.student_id);
        const gradeClass = g.grade >= 4 ? 'grade-good' : g.grade === 3 ? '' : 'grade-danger';

        return `
          <tr class="${gradeClass}">
            <td>${student.name}</td>
            <td>${subject.name}</td>
            <td><span class="grade-badge grade-${g.grade}">${g.grade}</span></td>
            <td>${new Date(g.date).toLocaleDateString('ru-RU')}</td>
            <td>${g.note}</td>
            ${this.user.role === 'teacher' || this.user.role === 'admin' ? `
              <td>
                <button class="btn btn-small btn-secondary" onclick="APP.deleteGrade(${g.id})">🗑️ Удалить</button>
              </td>
            ` : ''}
          </tr>
        `;
      }).join('');
    } catch (error) {
      console.error('Ошибка отображения оценок:', error);
    }
  },

  deleteGrade(id) {
    try {
      if (confirm('Удалить оценку?')) {
        this.data.grades = this.data.grades.filter(g => g.id !== id);
        this.showNotification('Оценка удалена', 'success');
        this.loadGrades();
      }
    } catch (error) {
      console.error('Ошибка удаления оценки:', error);
    }
  },

  // ===== РАСПИСАНИЕ =====
  loadSchedule() {
    try {
      const container = document.getElementById('schedule-content');
      if (!container) return;

      const days = {
        'Monday': 'Понедельник',
        'Tuesday': 'Вторник',
        'Wednesday': 'Среда',
        'Thursday': 'Четверг',
        'Friday': 'Пятница',
      };

      let scheduleHtml = '<div class="schedule-grid">';
      
      for (const [dayKey, dayLabel] of Object.entries(days)) {
        const lessons = this.data.schedule[dayKey] || [];
        scheduleHtml += `
          <div class="schedule-day">
            <h3>${dayLabel}</h3>
            ${lessons.map(lesson => `
              <div class="lesson">
                <div class="lesson-time">${lesson.time}</div>
                <div class="lesson-name">${lesson.subject}</div>
                <div class="lesson-room">📍 Кабинет ${lesson.room}</div>
                ${lesson.subject !== 'Обед' ? `<div style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">👨‍🏫 ${lesson.teacher}</div>` : ''}
              </div>
            `).join('')}
          </div>
        `;
      }
      
      scheduleHtml += '</div>';
      container.innerHTML = scheduleHtml;

    } catch (error) {
      console.error('Ошибка загрузки расписания:', error);
    }
  },

  // ===== ЗАДАНИЯ =====
  loadHomework() {
    try {
      const container = document.getElementById('homework-content');
      if (!container) return;

      const subjects = this.data.subjects;
      
      container.innerHTML = `
        <div class="search-filter">
          <input type="text" id="search-homework" placeholder="Поиск по названию...">
          <select id="filter-hw-subject">
            <option value="">Все предметы</option>
            ${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
          </select>
          <select id="filter-hw-status">
            <option value="">Все статусы</option>
            <option value="pending">В работе</option>
            <option value="completed">Выполнено</option>
            <option value="overdue">Просрочено</option>
          </select>
          <button class="btn btn-primary" onclick="APP.loadHomework()">🔍 Поиск</button>
        </div>

        <div id="homework-list"></div>

        ${this.user.role === 'teacher' || this.user.role === 'admin' ? `
          <button class="btn btn-primary" onclick="APP.showModal('addHomeworkModal')">➕ Добавить задание</button>
        ` : ''}
      `;

      this.filterAndDisplayHomework(this.data.homework);

      const searchInput = document.getElementById('search-homework');
      const filterSubject = document.getElementById('filter-hw-subject');
      const filterStatus = document.getElementById('filter-hw-status');

      const applyFilters = () => {
        let filtered = this.data.homework;
        const searchTerm = searchInput.value.toLowerCase();
        const subjectFilter = filterSubject.value;
        const statusFilter = filterStatus.value;

        filtered = filtered.filter(hw => {
          const matchSearch = !searchTerm || hw.title.toLowerCase().includes(searchTerm);
          const matchSubject = !subjectFilter || hw.subject_id === parseInt(subjectFilter);
          const matchStatus = !statusFilter || hw.status === statusFilter;

          return matchSearch && matchSubject && matchStatus;
        });

        this.filterAndDisplayHomework(filtered);
      };

      searchInput.addEventListener('input', applyFilters);
      filterSubject.addEventListener('change', applyFilters);
      filterStatus.addEventListener('change', applyFilters);

    } catch (error) {
      console.error('Ошибка загрузки заданий:', error);
    }
  },

  filterAndDisplayHomework(homework) {
    try {
      const container = document.getElementById('homework-list');
      if (!container) return;

      container.innerHTML = homework.map(hw => {
        const subject = this.data.subjects.find(s => s.id === hw.subject_id);
        const deadlineDate = new Date(hw.deadline);
        const today = new Date();
        const isOverdue = deadlineDate < today && hw.status === 'pending';
        const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

        let statusClass = 'status-pending';
        if (hw.status === 'completed') statusClass = 'status-completed';
        if (isOverdue) statusClass = 'status-overdue';

        return `
          <div class="homework-item">
            <div class="homework-header">
              <div>
                <div class="homework-subject">📌 ${subject.name}</div>
                <div style="font-size: 0.85rem; color: #666; margin-top: 0.25rem;">От: ${this.data.teachers.find(t => t.id === subject.teacher_id).name}</div>
              </div>
              <div class="homework-deadline">${isOverdue ? '⚠️ Просрочено' : `⏳ ${daysLeft} дн.`}</div>
            </div>
            <div class="homework-description">${hw.title}</div>
            <div style="color: #666; margin-bottom: 1rem;">${hw.description}</div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="homework-status ${statusClass}">${hw.status === 'completed' ? '✅ Выполнено' : isOverdue ? '❌ Просрочено' : '⏳ В работе'}</span>
              ${this.user.role === 'teacher' || this.user.role === 'admin' ? `
                <button class="btn btn-small btn-danger" onclick="APP.deleteHomework(${hw.id})">🗑️ Удалить</button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');

      if (homework.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Нет заданий по вашему запросу</p>';
      }

    } catch (error) {
      console.error('Ошибка отображения заданий:', error);
    }
  },

  deleteHomework(id) {
    try {
      if (confirm('Удалить задание?')) {
        this.data.homework = this.data.homework.filter(hw => hw.id !== id);
        this.showNotification('Задание удалено', 'success');
        this.loadHomework();
      }
    } catch (error) {
      console.error('Ошибка удаления задания:', error);
    }
  },

  // ===== ПРОФИЛЬ =====
  loadProfile() {
    try {
      const container = document.getElementById('profile-content');
      if (!container) return;

      container.innerHTML = `
        <div class="card">
          <div class="profile-header">
            <div class="profile-avatar">${this.user.avatar || '👤'}</div>
            <div class="profile-info">
              <h2>${this.user.name}</h2>
              <p><strong>Роль:</strong> ${this.getRoleLabel(this.user.role)}</p>
              <p><strong>Email:</strong> ${this.user.email}</p>
              ${this.user.class ? `<p><strong>Класс:</strong> ${this.user.class}</p>` : ''}
              ${this.user.subject ? `<p><strong>Предмет:</strong> ${this.user.subject}</p>` : ''}
              ${this.user.child_id ? `<p><strong>Ребёнок:</strong> ${this.data.students.find(s => s.id === this.user.child_id)?.name}</p>` : ''}
            </div>
          </div>
        </div>

        ${this.user.role === 'student' ? this.getStudentStats() : ''}
        ${this.user.role === 'teacher' ? this.getTeacherStats() : ''}
      `;

    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  },

  getStudentStats() {
    const grades = this.data.grades.filter(g => g.student_id === this.user.id);
    const avgGrade = grades.length > 0 ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1) : '0';
    const bestGrade = grades.length > 0 ? Math.max(...grades.map(g => g.grade)) : 0;
    const homeworkCount = this.data.homework.filter(h => h.status === 'completed').length;

    return `
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">${avgGrade}</div>
          <div class="stat-label">Средняя оценка</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${bestGrade}</div>
          <div class="stat-label">Лучшая оценка</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${grades.length}</div>
          <div class="stat-label">Всего оценок</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${homeworkCount}</div>
          <div class="stat-label">Выполнено заданий</div>
        </div>
      </div>
    `;
  },

  getTeacherStats() {
    const subjects = this.data.subjects.filter(s => s.teacher_id === this.user.id);
    const gradesGiven = this.data.grades.filter(g => {
      const subj = this.data.subjects.find(s => s.id === g.subject_id);
      return subj && subj.teacher_id === this.user.id;
    }).length;

    return `
      <div class="stats">
        <div class="stat-box">
          <div class="stat-value">${subjects.length}</div>
          <div class="stat-label">Преподаю предметов</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${this.data.students.length}</div>
          <div class="stat-label">Учеников всего</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${gradesGiven}</div>
          <div class="stat-label">Выставлено оценок</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">${this.data.homework.length}</div>
          <div class="stat-label">Заданий создано</div>
        </div>
      </div>
    `;
  },

  // ===== АДМИН-ПАНЕЛЬ =====
  loadAdmin() {
    try {
      if (this.user.role !== 'admin') {
        document.getElementById('admin-content').innerHTML = '<p style="color: red;">Доступ запрещён</p>';
        return;
      }

      const container = document.getElementById('admin-content');
      if (!container) return;

      container.innerHTML = `
        <div class="admin-grid">
          <div class="admin-card">
            <h3>👥 Пользователи</h3>
            <p>Студентов: ${this.data.students.length}</p>
            <p>Учителей: ${this.data.teachers.length}</p>
            <p>Родителей: ${this.data.parents.length}</p>
            <button class="btn btn-primary btn-small" onclick="APP.showModal('userListModal')">Управлять</button>
          </div>

          <div class="admin-card">
            <h3>📚 Предметы</h3>
            <p>Всего предметов: ${this.data.subjects.length}</p>
            <button class="btn btn-primary btn-small" onclick="APP.showModal('subjectListModal')">Управлять</button>
          </div>

          <div class="admin-card">
            <h3>📊 Статистика</h3>
            <p>Оценок: ${this.data.grades.length}</p>
            <p>Заданий: ${this.data.homework.length}</p>
          </div>
        </div>

        <div class="card">
          <h3>Быстрые действия</h3>
          <button class="btn btn-primary" onclick="APP.showModal('addGradeModal')">➕ Добавить оценку</button>
          <button class="btn btn-primary" onclick="APP.showModal('addHomeworkModal')" style="margin-left: 0.5rem;">➕ Добавить задание</button>
        </div>
      `;

    } catch (error) {
      console.error('Ошибка загрузки админ-панели:', error);
    }
  },

  // ===== УТИЛИТЫ =====
  getRoleLabel(role) {
    const labels = {
      'student': 'Ученик',
      'teacher': 'Учитель',
      'parent': 'Родитель',
      'admin': 'Администратор'
    };
    return labels[role] || role;
  },

  sortTable(tableId, columnIndex) {
    try {
      const table = document.getElementById(tableId);
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      rows.sort((a, b) => {
        const cellA = a.children[columnIndex].textContent.trim();
        const cellB = b.children[columnIndex].textContent.trim();
        return cellA.localeCompare(cellB);
      });

      tbody.innerHTML = '';
      rows.forEach(row => tbody.appendChild(row));
      this.showNotification('Таблица отсортирована', 'info');
    } catch (error) {
      console.error('Ошибка сортировки:', error);
    }
  },

  showModal(modalId) {
    try {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    } catch (error) {
      console.error('Ошибка открытия модали:', error);
    }
  },

  closeModal(modalId) {
    try {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('active');
    } catch (error) {
      console.error('Ошибка закрытия модали:', error);
    }
  },

  showNotification(message, type = 'info') {
    try {
      const notif = document.createElement('div');
      notif.className = `notification ${type}`;
      notif.textContent = message;
      document.body.appendChild(notif);

      setTimeout(() => {
        notif.classList.add('removing');
        setTimeout(() => notif.remove(), 300);
      }, 3000);
    } catch (error) {
      console.error('Ошибка показа уведомления:', error);
    }
  },

  updateHeaderInfo() {
    try {
      const userNameEl = document.querySelector('.user-name');
      const userRoleEl = document.querySelector('.user-role');

      if (this.user) {
        if (userNameEl) userNameEl.textContent = this.user.name;
        if (userRoleEl) userRoleEl.textContent = this.getRoleLabel(this.user.role);
      } else {
        if (userNameEl) userNameEl.textContent = 'Гость';
        if (userRoleEl) userRoleEl.textContent = '';
      }
    } catch (error) {
      console.error('Ошибка обновления инфо пользователя:', error);
    }
  },

  setupNavigation() {
    try {
      const navLinks = document.querySelectorAll('[data-page]');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const pageName = link.getAttribute('data-page');
          this.showPage(pageName);
        });
      });
    } catch (error) {
      console.error('Ошибка настройки навигации:', error);
    }
  },

  setupEventListeners() {
    try {
      // Мобильное меню
      const burgerBtn = document.querySelector('.burger-menu');
      const sidebar = document.querySelector('aside');
      if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
          sidebar.classList.toggle('active');
        });
      }

      // Логин форма
      const loginForm = document.getElementById('login-form');
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          const role = document.getElementById('login-role').value;
          this.login(email, role);
        });
      }

      // Форма добавления оценки
      const addGradeForm = document.getElementById('add-grade-form');
      if (addGradeForm) {
        addGradeForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const studentId = parseInt(document.getElementById('grade-student').value);
          const subjectId = parseInt(document.getElementById('grade-subject').value);
          const grade = parseInt(document.getElementById('grade-value').value);
          const note = document.getElementById('grade-note').value;

          if (!studentId || !subjectId || !grade) {
            this.showNotification('Заполните все поля', 'error');
            return;
          }

          const newGrade = {
            id: Math.max(...this.data.grades.map(g => g.id), 0) + 1,
            student_id: studentId,
            subject_id: subjectId,
            grade: grade,
            date: new Date().toISOString().split('T')[0],
            note: note
          };

          this.data.grades.push(newGrade);
          this.showNotification('Оценка добавлена', 'success');
          this.closeModal('addGradeModal');
          addGradeForm.reset();
          this.loadGrades();
        });
      }

      // Форма добавления задания
      const addHomeworkForm = document.getElementById('add-homework-form');
      if (addHomeworkForm) {
        addHomeworkForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const subjectId = parseInt(document.getElementById('hw-subject').value);
          const title = document.getElementById('hw-title').value;
          const description = document.getElementById('hw-description').value;
          const deadline = document.getElementById('hw-deadline').value;

          if (!subjectId || !title || !deadline) {
            this.showNotification('Заполните все обязательные поля', 'error');
            return;
          }

          const newHomework = {
            id: Math.max(...this.data.homework.map(h => h.id), 0) + 1,
            subject_id: subjectId,
            title: title,
            description: description,
            deadline: deadline,
            status: 'pending'
          };

          this.data.homework.push(newHomework);
          this.showNotification('Задание добавлено', 'success');
          this.closeModal('addHomeworkModal');
          addHomeworkForm.reset();
          this.loadHomework();
        });
      }

      // Логаут
      const logoutBtn = document.querySelector('.logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => this.logout());
      }

      // Закрытие модалей
      document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const modal = e.target.closest('.modal');
          if (modal) modal.classList.remove('active');
        });
      });

      // Закрытие модали по клику на фон
      document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('active');
          }
        });
      });

    } catch (error) {
      console.error('Ошибка настройки обработчиков:', error);
    }
  }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
});
