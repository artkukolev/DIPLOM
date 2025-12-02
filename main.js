let studentsData = JSON.parse(localStorage.getItem('studentsData')) || [];
let gradesData = JSON.parse(localStorage.getItem('gradesData')) || [];
let messagesData = JSON.parse(localStorage.getItem('messagesData')) || [];
let homeworkData = JSON.parse(localStorage.getItem('homeworkData')) || [];
let nextStudentId = parseInt(localStorage.getItem('nextStudentId')) || 1;
let nextGradeId = parseInt(localStorage.getItem('nextGradeId')) || 1;

// Текущий пользователь
const currentUser = {
    id: 1,
    name: "Иван Иванов",
    role: "teacher",
    class: "10А"
};

const SUBJECT_LABELS = {
    math: 'Математика',
    physics: 'Физика',
    informatics: 'Информатика',
    russian: 'Русский язык',
    literature: 'Литература'
};

// Проверка аутентификации для всех страниц кроме index.html
// ОШИБКА: Исправляем проверку пути
const currentPath = window.location.pathname;
if (!currentPath.includes('index.html') && 
    sessionStorage.getItem('isAuthenticated') !== 'true') {
    window.location.href = 'index.html';
    // Прерываем выполнение скрипта
    throw new Error('Not authenticated');
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    try {
        loadStudentsData();
        loadGradesData();
        updateStatistics();
        initializeCharts();
        
        // Установка активной страницы в навигации
        setActiveNavigation();
        
        // Общие обработчики
        setupCommonEventListeners();
        
        // Специфичные для страницы инициализации
        setupPageSpecificHandlers();
        
        // Добавление тестовых данных если их нет
        if (studentsData.length === 0) {
            initializeSampleData();
        }
    } catch (error) {
        console.error('Ошибка инициализации приложения:', error);
        showNotification('Ошибка загрузки приложения', 'error');
    }
}

function setActiveNavigation() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;
    
    // Навигация в шапке
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage + '.html')) {
            link.classList.add('active');
        }
    });
    
    // Боковая панель
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage + '.html')) {
            link.classList.add('active');
        }
    });
}

function setupCommonEventListeners() {
    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Восстановление темы
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }

    // Выход из системы
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('isAuthenticated');
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // Боковая панель
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
                localStorage.setItem('sidebarCollapsed', 'true');
            } else {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
                localStorage.setItem('sidebarCollapsed', 'false');
            }
        });
        
        // Восстановление состояния боковой панели
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
            const icon = toggleSidebarBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            }
        }
    }

    // Мобильное меню
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
        });
    }

    // Модальные окна
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    if (modals.length && closeModalBtns.length) {
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });

        window.addEventListener('click', function(event) {
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // Общие кнопки действий - ОШИБКА: функция bindActionButton должна быть определена раньше
    // Перенесем вызовы этой функции ниже, после ее определения
    // (они будут вызваны в конце этой функции)

    // Сохранение ученика
    const saveStudentBtn = document.getElementById('saveStudentBtn');
    if (saveStudentBtn) {
        saveStudentBtn.addEventListener('click', function(event) {
            event.preventDefault();
            saveStudent();
        });
    }

    // Сохранение оценки
    const saveGradeBtn = document.getElementById('saveGradeBtn');
    if (saveGradeBtn) {
        saveGradeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            saveGrade();
        });
    }

    // Вкладки
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                if (!tabName) return;
                
                tabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                this.classList.add('active');
                const target = document.getElementById(tabName + '-tab');
                if (target) {
                    target.classList.add('active');
                }
            });
        });
    }

    // Поиск студентов
    const searchInput = document.getElementById('searchStudents');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterStudentsTable(this.value);
        });
    }

    // Поиск оценок
    const searchGradesInput = document.getElementById('searchGrades');
    if (searchGradesInput) {
        searchGradesInput.addEventListener('input', function() {
            filterGradesTable(this.value);
        });
    }

    // Фильтры
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function(event) {
            event.preventDefault();
            applyFilters();
        });
    }

    // Фильтр предметов для оценок
    const gradeSubjectFilter = document.getElementById('gradeSubject');
    if (gradeSubjectFilter) {
        gradeSubjectFilter.addEventListener('change', function() {
            filterGradesBySubject(this.value);
        });
    }

    // Мобильные уведомления
    const mobileNotification = document.getElementById('mobileNotification');
    if (mobileNotification) {
        setInterval(() => {
            if (Math.random() > 0.7) {
                showMobileNotification('Новое сообщение', 'У вас новое сообщение от ученика');
            }
        }, 30000);
    }
    
    // Теперь вызываем bindActionButton для общих кнопок
    // Используем try-catch для каждой кнопки
    const actionButtons = [
        { id: 'addStudentBtn', handler: openAddStudentModal },
        { id: 'addStudentMainBtn', handler: openAddStudentModal },
        { id: 'addGradeBtn', handler: openAddGradeModal },
        { id: 'exportExcelBtn', handler: exportToExcel },
        { id: 'exportToExcelBtn', handler: exportToExcel },
        { id: 'createHomeworkBtn', handler: openHomeworkModal },
        { id: 'distributeHomeworkBtn', handler: distributeHomework },
        { id: 'checkHomeworkBtn', handler: checkHomework },
        { id: 'sendMessageBtn', handler: openSendMessageModal },
        { id: 'createReportBtn', handler: openCreateReportModal },
        { id: 'generatePerformanceReport', handler: generatePerformanceReport },
        { id: 'generateAttendanceReport', handler: generateAttendanceReport },
        { id: 'generateClassReport', handler: generateClassReport },
        { id: 'printReportsBtn', handler: printReports }
    ];
    
    actionButtons.forEach(btn => {
        try {
            bindActionButton(btn.id, btn.handler);
        } catch (error) {
            console.warn(`Кнопка ${btn.id} не найдена:`, error);
        }
    });
}

function setupPageSpecificHandlers() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;
    
    try {
        switch(currentPage) {
            case 'dashboard':
                setupDashboardHandlers();
                break;
            case 'students':
                setupStudentsHandlers();
                break;
            case 'grades':
                setupGradesHandlers();
                break;
            case 'journals':
                setupJournalsHandlers();
                break;
            case 'homework':
                setupHomeworkHandlers();
                break;
            case 'messages':
                setupMessagesHandlers();
                break;
            case 'calendar':
                setupCalendarHandlers();
                break;
            case 'reports':
                setupReportsHandlers();
                break;
            case 'schedule':
                setupScheduleHandlers();
                break;
            case 'admin':
                setupAdminHandlers();
                break;
        }
    } catch (error) {
        console.error(`Ошибка в setupPageSpecificHandlers для страницы ${currentPage}:`, error);
    }
}

function setupDashboardHandlers() {
    // Ничего не делаем, так как на dashboard нет специфичных обработчиков
}

function setupStudentsHandlers() {
    // Можно добавить специфичные обработчики для students.html
}

function setupGradesHandlers() {
    // Можно добавить специфичные обработчики для grades.html
}

function setupJournalsHandlers() {
    const subjectSelect = document.getElementById('subjectSelect');
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            updateJournalTable(this.value);
        });
        // Инициализируем таблицу при загрузке
        updateJournalTable(subjectSelect.value);
    }
}

function setupHomeworkHandlers() {
    // Можно добавить специфичные обработчики для homework.html
}

function setupMessagesHandlers() {
    const chatItems = document.querySelectorAll('.chat-item');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input .btn');
    
    if (chatItems.length) {
        chatItems.forEach(item => {
            item.addEventListener('click', function() {
                chatItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                // Здесь можно загрузить историю переписки
            });
        });
    }
    
    if (chatInput && sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function setupCalendarHandlers() {
    const prevBtn = document.querySelector('.calendar-header .btn:first-child');
    const nextBtn = document.querySelector('.calendar-header .btn:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigateCalendarMonth(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigateCalendarMonth(1);
        });
    }
}

function setupReportsHandlers() {
    // Можно добавить специфичные обработчики для reports.html
}

function setupScheduleHandlers() {
    const prevBtn = document.querySelector('.schedule-nav .btn:first-child');
    const nextBtn = document.querySelector('.schedule-nav .btn:last-child');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            navigateScheduleWeek(-1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            navigateScheduleWeek(1);
        });
    }
}

function setupAdminHandlers() {
    // Можно добавить специфичные обработчики для admin.html
}

// Основные функции приложения

function bindActionButton(elementId, handler) {
    const element = document.getElementById(elementId);
    if (!element || typeof handler !== 'function') {
        throw new Error(`Элемент ${elementId} не найден или handler не является функцией`);
    }
    element.addEventListener('click', (event) => {
        event.preventDefault();
        handler(event);
    });
}

function openAddStudentModal() {
    const modal = document.getElementById('addStudentModal');
    const form = document.getElementById('addStudentForm');
    if (!modal || !form) {
        showNotification('Модальное окно не найдено', 'error');
        return;
    }
    modal.style.display = 'flex';
    form.reset();
    // Устанавливаем текущую дату рождения (16 лет назад)
    const birthDateInput = document.getElementById('birthDate');
    if (birthDateInput) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 16);
        birthDateInput.valueAsDate = date;
    }
}

function saveStudent() {
    const form = document.getElementById('addStudentForm');
    if (!form) return;
    
    if (!form.checkValidity()) {
        showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
        return;
    }

    try {
        const student = {
            id: nextStudentId++,
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.getElementById('gender').value,
            class: document.getElementById('class').value || '10А', // Значение по умолчанию
            admissionYear: parseInt(document.getElementById('admissionYear').value) || 2023,
            address: document.getElementById('address').value,
            parentName: document.getElementById('parentName').value,
            parentPhone: document.getElementById('parentPhone').value,
            parentWork: document.getElementById('parentWork').value,
            medicalInfo: document.getElementById('medicalInfo').value,
            additionalInfo: document.getElementById('additionalInfo').value,
            createdAt: new Date().toISOString()
        };

        studentsData.push(student);
        saveDataToStorage();
        loadStudentsData();
        updateStatistics();

        const modal = document.getElementById('addStudentModal');
        if (modal) {
            modal.style.display = 'none';
        }
        showNotification('Личное дело ученика успешно создано!');
    } catch (error) {
        console.error('Ошибка при сохранении ученика:', error);
        showNotification('Ошибка при сохранении ученика!', 'error');
    }
}

function openAddGradeModal() {
    const modal = document.getElementById('addGradeModal');
    const form = document.getElementById('addGradeForm');
    const studentSelect = document.getElementById('gradeStudent');
    if (!modal || !form || !studentSelect) {
        showNotification('Модальное окно не найдено', 'error');
        return;
    }
    
    studentSelect.innerHTML = '<option value="">Выберите ученика</option>';
    
    // Фильтруем только учащихся из текущего класса
    const classStudents = studentsData.filter(s => s.class === currentUser.class);
    
    if (classStudents.length === 0) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Нет учащихся в классе';
        studentSelect.appendChild(option);
    } else {
        classStudents.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = `${student.lastName} ${student.firstName} ${student.middleName || ''}`;
            studentSelect.appendChild(option);
        });
    }

    modal.style.display = 'flex';
    form.reset();
    const gradeDateInput = document.getElementById('gradeDate');
    if (gradeDateInput) {
        gradeDateInput.valueAsDate = new Date();
    }
}

function saveGrade() {
    const form = document.getElementById('addGradeForm');
    if (!form) return;
    
    if (!form.checkValidity()) {
        showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
        return;
    }

    try {
        const grade = {
            id: nextGradeId++,
            studentId: parseInt(document.getElementById('gradeStudent').value),
            subject: document.getElementById('gradeSubjectModal').value,
            value: parseInt(document.getElementById('gradeValue').value),
            date: document.getElementById('gradeDate').value,
            comment: document.getElementById('gradeComment').value,
            teacherId: currentUser.id,
            createdAt: new Date().toISOString()
        };

        gradesData.push(grade);
        saveGradesToStorage();
        loadGradesData();
        updateStatistics();

        const modal = document.getElementById('addGradeModal');
        if (modal) {
            modal.style.display = 'none';
        }
        showNotification('Оценка успешно добавлена!');
    } catch (error) {
        console.error('Ошибка при сохранении оценки:', error);
        showNotification('Ошибка при сохранении оценки!', 'error');
    }
}

function loadStudentsData() {
    const tbody = document.getElementById('studentsTableBody');
    const countElement = document.getElementById('studentsCount');
    
    // Обновляем счетчик независимо от наличия таблицы
    if (countElement) {
        const classStudents = studentsData.filter(s => s.class === currentUser.class);
        countElement.textContent = `${classStudents.length} учащихся`;
    }
    
    // Если таблицы студентов нет на этой странице, выходим
    if (!tbody) return;
    
    tbody.innerHTML = '';

    const classStudents = studentsData.filter(s => s.class === currentUser.class);
    
    if (classStudents.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center;">Нет данных об учениках</td></tr>';
        return;
    }

    classStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.lastName} ${student.firstName} ${student.middleName || ''}</td>
            <td>${formatDate(student.birthDate)}</td>
            <td>${student.class}</td>
            <td>${student.address || '-'}</td>
            <td>${student.parentPhone || '-'}</td>
            <td>${student.parentName || '-'}</td>
            <td>${student.medicalInfo || '-'}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="editStudent(${student.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline btn-sm" onclick="deleteStudent(${student.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadGradesData() {
    const tbody = document.getElementById('gradesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    if (gradesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">Нет данных об оценках</td></tr>';
        return;
    }

    // Группировка оценок по ученикам
    const gradesByStudent = {};
    const classStudents = studentsData.filter(s => s.class === currentUser.class);
    
    if (classStudents.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">Нет учащихся в классе</td></tr>';
        return;
    }

    gradesData.forEach(grade => {
        if (!gradesByStudent[grade.studentId]) {
            gradesByStudent[grade.studentId] = {};
        }

        if (!gradesByStudent[grade.studentId][grade.subject]) {
            gradesByStudent[grade.studentId][grade.subject] = [];
        }

        gradesByStudent[grade.studentId][grade.subject].push(grade);
    });

    // Заполнение таблицы
    classStudents.forEach(student => {
        const row = document.createElement('tr');
        const studentGrades = gradesByStudent[student.id] || {};

        // Расчет средних баллов по предметам
        const mathAvg = calculateAverage(studentGrades.math);
        const physicsAvg = calculateAverage(studentGrades.physics);
        const informaticsAvg = calculateAverage(studentGrades.informatics);
        const russianAvg = calculateAverage(studentGrades.russian);
        const literatureAvg = calculateAverage(studentGrades.literature);

        // Общий средний балл
        const subjects = [mathAvg, physicsAvg, informaticsAvg, russianAvg, literatureAvg].filter(avg => avg > 0);
        const overallAvg = subjects.length > 0 ? 
            (subjects.reduce((a, b) => a + b, 0) / subjects.length).toFixed(2) : '-';

        row.innerHTML = `
            <td>${student.lastName} ${student.firstName}</td>
            <td>${mathAvg > 0 ? mathAvg.toFixed(2) : '-'}</td>
            <td>${physicsAvg > 0 ? physicsAvg.toFixed(2) : '-'}</td>
            <td>${informaticsAvg > 0 ? informaticsAvg.toFixed(2) : '-'}</td>
            <td>${russianAvg > 0 ? russianAvg.toFixed(2) : '-'}</td>
            <td>${literatureAvg > 0 ? literatureAvg.toFixed(2) : '-'}</td>
            <td>${overallAvg}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="viewStudentGrades(${student.id})">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateJournalTable(subject) {
    const tbody = document.getElementById('journalTableBody');
    if (!tbody || !subject) return;
    
    tbody.innerHTML = '';
    
    const classStudents = studentsData.filter(s => s.class === currentUser.class);
    
    if (classStudents.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Нет учащихся в классе</td></tr>';
        return;
    }

    classStudents.forEach(student => {
        const row = document.createElement('tr');
        const studentGrades = gradesData.filter(g => g.studentId === student.id && g.subject === subject);
        
        // Группируем оценки по месяцам (упрощенно)
        const monthlyAverages = {
            'Сентябрь': calculateAverage(studentGrades.filter(g => {
                const date = new Date(g.date);
                return date.getMonth() === 8; // Сентябрь - 8 месяц (0-11)
            })),
            'Октябрь': calculateAverage(studentGrades.filter(g => {
                const date = new Date(g.date);
                return date.getMonth() === 9;
            })),
            'Ноябрь': calculateAverage(studentGrades.filter(g => {
                const date = new Date(g.date);
                return date.getMonth() === 10;
            })),
            'Декабрь': calculateAverage(studentGrades.filter(g => {
                const date = new Date(g.date);
                return date.getMonth() === 11;
            }))
        };
        
        const overallAvg = calculateAverage(studentGrades);
        
        row.innerHTML = `
            <td>${student.lastName} ${student.firstName}</td>
            <td>${monthlyAverages['Сентябрь'] > 0 ? monthlyAverages['Сентябрь'].toFixed(2) : '-'}</td>
            <td>${monthlyAverages['Октябрь'] > 0 ? monthlyAverages['Октябрь'].toFixed(2) : '-'}</td>
            <td>${monthlyAverages['Ноябрь'] > 0 ? monthlyAverages['Ноябрь'].toFixed(2) : '-'}</td>
            <td>${monthlyAverages['Декабрь'] > 0 ? monthlyAverages['Декабрь'].toFixed(2) : '-'}</td>
            <td>${overallAvg > 0 ? overallAvg.toFixed(2) : '-'}</td>
        `;
        tbody.appendChild(row);
    });
}

function editStudent(id) {
    const student = studentsData.find(s => s.id === id);
    if (!student) {
        showNotification('Ученик не найден', 'error');
        return;
    }
    
    // Заполняем форму данными ученика
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('middleName').value = student.middleName || '';
    document.getElementById('birthDate').value = student.birthDate;
    document.getElementById('gender').value = student.gender;
    document.getElementById('class').value = student.class;
    document.getElementById('admissionYear').value = student.admissionYear;
    document.getElementById('address').value = student.address;
    document.getElementById('parentName').value = student.parentName;
    document.getElementById('parentPhone').value = student.parentPhone;
    document.getElementById('parentWork').value = student.parentWork || '';
    document.getElementById('medicalInfo').value = student.medicalInfo || '';
    document.getElementById('additionalInfo').value = student.additionalInfo || '';

    // Удаляем старые данные
    studentsData = studentsData.filter(s => s.id !== id);

    // Открываем модальное окно
    const modal = document.getElementById('addStudentModal');
    if (modal) {
        modal.style.display = 'flex';
    }
    
    // Обновляем кнопку сохранения
    const saveBtn = document.getElementById('saveStudentBtn');
    if (saveBtn) {
        saveBtn.textContent = 'Обновить личное дело';
        saveBtn.onclick = function(event) {
            event.preventDefault();
            updateStudent(id);
        };
    }
    
    showNotification('Редактирование личного дела ученика', 'info');
}

function updateStudent(id) {
    const form = document.getElementById('addStudentForm');
    if (!form) return;
    
    if (!form.checkValidity()) {
        showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
        return;
    }

    try {
        const student = {
            id: id,
            lastName: document.getElementById('lastName').value,
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.getElementById('gender').value,
            class: document.getElementById('class').value,
            admissionYear: parseInt(document.getElementById('admissionYear').value),
            address: document.getElementById('address').value,
            parentName: document.getElementById('parentName').value,
            parentPhone: document.getElementById('parentPhone').value,
            parentWork: document.getElementById('parentWork').value,
            medicalInfo: document.getElementById('medicalInfo').value,
            additionalInfo: document.getElementById('additionalInfo').value,
            createdAt: new Date().toISOString()
        };

        studentsData.push(student);
        saveDataToStorage();
        loadStudentsData();
        updateStatistics();

        const modal = document.getElementById('addStudentModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Восстанавливаем оригинальную кнопку
        const saveBtn = document.getElementById('saveStudentBtn');
        if (saveBtn) {
            saveBtn.textContent = 'Сохранить личное дело';
            saveBtn.onclick = function(event) {
                event.preventDefault();
                saveStudent();
            };
        }
        
        showNotification('Личное дело ученика успешно обновлено!');
    } catch (error) {
        console.error('Ошибка при обновлении ученика:', error);
        showNotification('Ошибка при обновлении ученика!', 'error');
    }
}

function deleteStudent(id) {
    if (!confirm('Вы уверены, что хотите удалить личное дело ученика?')) {
        return;
    }
    
    try {
        const studentName = studentsData.find(s => s.id === id)?.lastName || 'ученика';
        studentsData = studentsData.filter(s => s.id !== id);
        // Также удаляем все оценки этого ученика
        gradesData = gradesData.filter(g => g.studentId !== id);
        saveDataToStorage();
        saveGradesToStorage();
        loadStudentsData();
        loadGradesData();
        updateStatistics();
        showNotification(`Личное дело ученика ${studentName} удалено!`);
    } catch (error) {
        console.error('Ошибка при удалении ученика:', error);
        showNotification('Ошибка при удалении ученика!', 'error');
    }
}

function viewStudentGrades(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    const modal = document.getElementById('viewGradesModal');
    const modalBody = document.getElementById('viewGradesModalBody');

    if (!student) {
        showNotification('Ученик не найден', 'error');
        return;
    }

    const studentGrades = gradesData.filter(grade => grade.studentId === studentId);
    const gradesBySubject = {};

    Object.keys(SUBJECT_LABELS).forEach(subjectKey => {
        gradesBySubject[subjectKey] = [];
    });

    studentGrades.forEach(grade => {
        if (gradesBySubject[grade.subject]) {
            gradesBySubject[grade.subject].push(grade);
        }
    });

    const rowsHtml = Object.keys(SUBJECT_LABELS).map(subjectKey => {
        const gradesList = gradesBySubject[subjectKey] || [];
        const avg = calculateAverage(gradesList);
        const gradesText = gradesList.length > 0
            ? gradesList.map(grade => {
                const dateStr = formatDate(grade.date);
                return `${grade.value} (${dateStr}${grade.comment ? `: ${grade.comment}` : ''})`;
            }).join(', ')
            : 'Нет оценок';

        return `
            <tr>
                <td><strong>${SUBJECT_LABELS[subjectKey]}</strong></td>
                <td>${gradesText}</td>
                <td><strong>${avg > 0 ? avg.toFixed(2) : '-'}</strong></td>
            </tr>
        `;
    }).join('');

    const averages = Object.keys(SUBJECT_LABELS)
        .map(subjectKey => calculateAverage(gradesBySubject[subjectKey]))
        .filter(value => value > 0);
    const overallAvg = averages.length > 0
        ? (averages.reduce((acc, value) => acc + value, 0) / averages.length).toFixed(2)
        : '-';

    modalBody.innerHTML = `
        <div class="student-summary">
            <h4>${student.lastName} ${student.firstName} ${student.middleName || ''}</h4>
            <p>Класс: ${student.class}</p>
            <p>Средний балл: <strong>${overallAvg}</strong></p>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Предмет</th>
                        <th>Оценки</th>
                        <th>Средний балл</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;

    if (modal) {
        modal.style.display = 'flex';
    }
}

function updateStatistics() {
    const totalStudentsElement = document.getElementById('totalStudents');
    if (totalStudentsElement) {
        const classStudents = studentsData.filter(s => s.class === currentUser.class);
        totalStudentsElement.textContent = classStudents.length;
    }
}

function saveDataToStorage() {
    try {
        localStorage.setItem('studentsData', JSON.stringify(studentsData));
        localStorage.setItem('nextStudentId', nextStudentId.toString());
    } catch (error) {
        console.error('Ошибка при сохранении данных учеников:', error);
    }
}

function saveGradesToStorage() {
    try {
        localStorage.setItem('gradesData', JSON.stringify(gradesData));
        localStorage.setItem('nextGradeId', nextGradeId.toString());
    } catch (error) {
        console.error('Ошибка при сохранении данных оценок:', error);
    }
}

function formatDate(dateString) {
    if (!dateString) return '-';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '-';
        return date.toLocaleDateString('ru-RU');
    } catch (e) {
        return '-';
    }
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('systemNotification');
    const notificationText = document.getElementById('notificationText');
    if (!notification || !notificationText) return;

    notificationText.textContent = message;
    notification.className = 'system-notification';
    
    // Удаляем все классы типов
    notification.classList.remove('error', 'warning', 'info');
    
    if (type === 'error') {
        notification.classList.add('error');
    } else if (type === 'warning') {
        notification.classList.add('warning');
    } else if (type === 'info') {
        notification.classList.add('info');
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showMobileNotification(title, message) {
    const notification = document.getElementById('mobileNotification');
    if (!notification) return;
    
    const titleElement = notification.querySelector('strong');
    const messageElement = notification.querySelector('p');

    if (titleElement) titleElement.textContent = title;
    if (messageElement) messageElement.textContent = message;

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function filterStudentsTable(searchTerm) {
    const rows = document.querySelectorAll('#studentsTable tbody tr');
    if (!rows.length) return;
    
    const term = searchTerm.toLowerCase().trim();
    rows.forEach(row => {
        const studentName = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
        row.style.display = term === '' || studentName.includes(term) ? '' : 'none';
    });
}

function filterGradesTable(searchTerm) {
    const rows = document.querySelectorAll('#gradesTable tbody tr');
    if (!rows.length) return;
    
    const term = searchTerm.toLowerCase().trim();
    rows.forEach(row => {
        const studentName = row.querySelector('td:nth-child(1)')?.textContent.toLowerCase() || '';
        row.style.display = term === '' || studentName.includes(term) ? '' : 'none';
    });
}

function filterGradesBySubject(subject) {
    const rows = document.querySelectorAll('#gradesTable tbody tr');
    if (!rows.length) return;
    
    rows.forEach(row => {
        if (!subject) {
            row.style.display = '';
            return;
        }
        
        // Находим столбец с нужным предметом
        const subjectColumns = {
            'math': 2,
            'physics': 3,
            'informatics': 4,
            'russian': 5,
            'literature': 6
        };
        
        const columnIndex = subjectColumns[subject];
        if (columnIndex) {
            const gradeCell = row.querySelector(`td:nth-child(${columnIndex})`);
            if (gradeCell && gradeCell.textContent.trim() !== '-') {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

function applyFilters() {
    const classFilterSelect = document.getElementById('filterClass');
    const searchInput = document.getElementById('searchStudents');
    
    const classFilter = classFilterSelect ? classFilterSelect.value : '';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const rows = document.querySelectorAll('#studentsTable tbody tr');
    rows.forEach(row => {
        const studentClass = row.querySelector('td:nth-child(4)')?.textContent.trim() || '';
        const studentName = row.querySelector('td:nth-child(2)')?.textContent.toLowerCase() || '';
        
        let showRow = true;
        
        if (classFilter && studentClass !== classFilter) {
            showRow = false;
        }
        
        if (searchTerm && !studentName.includes(searchTerm)) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
    
    showNotification('Фильтры применены', 'info');
}

function initializeCharts() {
    // График успеваемости
    const performanceCanvas = document.getElementById('performanceChart');
    if (performanceCanvas) {
        try {
            new Chart(performanceCanvas.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                    datasets: [{
                        label: 'Средний балл',
                        data: [3.8, 4.0, 4.1, 4.2],
                        borderColor: '#6a0dad',
                        backgroundColor: 'rgba(106, 13, 173, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 3,
                            max: 5
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Ошибка при создании графика успеваемости:', error);
        }
    }

    // График оценок по предметам
    const gradesCanvas = document.getElementById('gradesChart');
    if (gradesCanvas) {
        try {
            const averages = calculateClassAverages();
            
            new Chart(gradesCanvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Математика', 'Физика', 'Информатика', 'Русский язык', 'Литература'],
                    datasets: [{
                        label: 'Средний балл',
                        data: [
                            averages.math || 0,
                            averages.physics || 0,
                            averages.informatics || 0,
                            averages.russian || 0,
                            averages.literature || 0
                        ],
                        backgroundColor: [
                            'rgba(106, 13, 173, 0.7)',
                            'rgba(52, 152, 219, 0.7)',
                            'rgba(46, 204, 113, 0.7)',
                            'rgba(243, 156, 18, 0.7)',
                            'rgba(231, 76, 60, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Ошибка при создании графика оценок:', error);
        }
    }

    // График посещаемости
    const attendanceCanvas = document.getElementById('attendanceChart');
    if (attendanceCanvas) {
        try {
            new Chart(attendanceCanvas.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Присутствовали', 'Пропуски по болезни', 'Пропуски без причины'],
                    datasets: [{
                        data: [85, 10, 5],
                        backgroundColor: [
                            'rgba(46, 204, 113, 0.7)',
                            'rgba(52, 152, 219, 0.7)',
                            'rgba(231, 76, 60, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        } catch (error) {
            console.error('Ошибка при создании графика посещаемости:', error);
        }
    }

    // График домашних заданий
    const homeworkCanvas = document.getElementById('homeworkChart');
    if (homeworkCanvas) {
        try {
            new Chart(homeworkCanvas.getContext('2d'), {
                type: 'pie',
                data: {
                    labels: ['Выполнено вовремя', 'Выполнено с опозданием', 'Не выполнено'],
                    datasets: [{
                        data: [65, 20, 15],
                        backgroundColor: [
                            'rgba(46, 204, 113, 0.7)',
                            'rgba(243, 156, 18, 0.7)',
                            'rgba(231, 76, 60, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        } catch (error) {
            console.error('Ошибка при создании графика домашних заданий:', error);
        }
    }
}

function calculateAverage(grades) {
    if (!grades || !Array.isArray(grades) || grades.length === 0) return 0;
    const validGrades = grades.filter(g => g && typeof g.value === 'number');
    if (validGrades.length === 0) return 0;
    const sum = validGrades.reduce((sum, grade) => sum + grade.value, 0);
    return sum / validGrades.length;
}

function calculateClassAverages() {
    const classStudents = studentsData.filter(s => s.class === currentUser.class);
    const studentIds = classStudents.map(s => s.id);
    const classGrades = gradesData.filter(g => studentIds.includes(g.studentId));
    
    const averages = {
        math: 0,
        physics: 0,
        informatics: 0,
        russian: 0,
        literature: 0
    };
    
    Object.keys(averages).forEach(subject => {
        const subjectGrades = classGrades.filter(g => g.subject === subject);
        averages[subject] = calculateAverage(subjectGrades);
    });
    
    return averages;
}

// Экспорт в Excel
function exportToExcel() {
    if (studentsData.length === 0) {
        showNotification('Нет данных для экспорта!', 'warning');
        return;
    }

    try {
        const excelData = studentsData.map(student => ({
            'ID': student.id,
            'Фамилия': student.lastName,
            'Имя': student.firstName,
            'Отчество': student.middleName || '',
            'Дата рождения': formatDate(student.birthDate),
            'Пол': student.gender,
            'Класс': student.class,
            'Год поступления': student.admissionYear,
            'Адрес проживания': student.address,
            'ФИО родителя': student.parentName,
            'Телефон родителя': student.parentPhone,
            'Место работы родителя': student.parentWork || '',
            'Медицинская информация': student.medicalInfo || '',
            'Дополнительная информация': student.additionalInfo || '',
            'Дата создания': formatDate(student.createdAt)
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Учащиеся');

        const fileName = `Учащиеся_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);

        showNotification(`Данные экспортированы в файл: ${fileName}`);
    } catch (error) {
        console.error('Ошибка при экспорте в Excel:', error);
        showNotification('Произошла ошибка при экспорте данных!', 'error');
    }
}

// Функции для домашних заданий
function openHomeworkModal() {
    showNotification('Функция создания задания в разработке', 'info');
}

function distributeHomework() {
    showNotification('Функция распределения заданий в разработке', 'info');
}

function checkHomework() {
    showNotification('Функция проверки заданий в разработке', 'info');
}

// Функции для сообщений
function openSendMessageModal() {
    showNotification('Функция отправки сообщений в разработке', 'info');
}

function sendMessage() {
    const input = document.querySelector('.chat-input input');
    if (!input || !input.value.trim()) return;
    
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.innerHTML = `
            <p>${input.value}</p>
            <small>${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
        `;
        chatMessages.appendChild(messageDiv);
        input.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Функции для отчетов
function openCreateReportModal() {
    showNotification('Функция создания отчетов в разработке', 'info');
}

function generatePerformanceReport() {
    showNotification('Отчет по успеваемости сгенерирован', 'success');
}

function generateAttendanceReport() {
    showNotification('Отчет по посещаемости сгенерирован', 'success');
}

function generateClassReport() {
    showNotification('Отчет по классу сгенерирован', 'success');
}

function printReports() {
    window.print();
    showNotification('Подготовка к печати...', 'info');
}

// Функции для календаря
function navigateCalendarMonth(direction) {
    showNotification(`Навигация по календарю: ${direction > 0 ? 'вперед' : 'назад'}`, 'info');
}

// Функции для расписания
function navigateScheduleWeek(direction) {
    showNotification(`Навигация по расписанию: ${direction > 0 ? 'вперед' : 'назад'}`, 'info');
}

// Инициализация тестовых данных
function initializeSampleData() {
    try {
        studentsData = [
            {
                id: 1,
                lastName: "Петров",
                firstName: "Алексей",
                middleName: "Сергеевич",
                birthDate: "2007-03-15",
                gender: "М",
                class: "10А",
                admissionYear: 2023,
                address: "г. Москва, ул. Ленина, д. 15, кв. 42",
                parentName: "Петрова Мария Ивановна",
                parentPhone: "+7 (123) 456-78-90",
                parentWork: "ООО 'Технологии'",
                medicalInfo: "Группа здоровья I, аллергия на арахис",
                additionalInfo: "Увлекается программированием, математикой",
                createdAt: "2023-09-01T10:00:00Z"
            },
            {
                id: 2,
                lastName: "Сидорова",
                firstName: "Мария",
                middleName: "Александровна",
                birthDate: "2007-08-22",
                gender: "Ж",
                class: "10А",
                admissionYear: 2023,
                address: "г. Москва, пр. Мира, д. 25, кв. 17",
                parentName: "Сидоров Александр Васильевич",
                parentPhone: "+7 (123) 456-78-91",
                parentWork: "ГБОУ Школа №123",
                medicalInfo: "Группа здоровья II, носит очки",
                additionalInfo: "Занимается музыкой, отличница",
                createdAt: "2023-09-01T10:15:00Z"
            },
            {
                id: 3,
                lastName: "Козлов",
                firstName: "Иван",
                middleName: "Дмитриевич",
                birthDate: "2007-05-10",
                gender: "М",
                class: "10А",
                admissionYear: 2023,
                address: "г. Москва, ул. Центральная, д. 8, кв. 24",
                parentName: "Козлова Ольга Петровна",
                parentPhone: "+7 (123) 456-78-92",
                parentWork: "Больница №5",
                medicalInfo: "Группа здоровья I",
                additionalInfo: "Занимается футболом",
                createdAt: "2023-09-01T10:30:00Z"
            }
        ];
        
        nextStudentId = 4;
        
        gradesData = [
            {
                id: 1,
                studentId: 1,
                subject: "math",
                value: 5,
                date: "2023-09-10",
                comment: "Контрольная работа по алгебре",
                teacherId: 1,
                createdAt: "2023-09-10T10:00:00Z"
            },
            {
                id: 2,
                studentId: 1,
                subject: "physics",
                value: 4,
                date: "2023-09-12",
                comment: "Лабораторная работа",
                teacherId: 1,
                createdAt: "2023-09-12T14:30:00Z"
            },
            {
                id: 3,
                studentId: 2,
                subject: "math",
                value: 5,
                date: "2023-09-10",
                comment: "Контрольная работа по алгебре",
                teacherId: 1,
                createdAt: "2023-09-10T10:00:00Z"
            },
            {
                id: 4,
                studentId: 2,
                subject: "informatics",
                value: 5,
                date: "2023-09-15",
                comment: "Практическая работа",
                teacherId: 1,
                createdAt: "2023-09-15T11:20:00Z"
            },
            {
                id: 5,
                studentId: 3,
                subject: "math",
                value: 3,
                date: "2023-09-10",
                comment: "Контрольная работа по алгебре",
                teacherId: 1,
                createdAt: "2023-09-10T10:00:00Z"
            }
        ];
        
        nextGradeId = 6;
        
        saveDataToStorage();
        saveGradesToStorage();
        loadStudentsData();
        loadGradesData();
        updateStatistics();
        
        showNotification('Тестовые данные загружены', 'info');
    } catch (error) {
        console.error('Ошибка при инициализации тестовых данных:', error);
        showNotification('Ошибка при загрузке тестовых данных', 'error');
    }
}

// Делаем функции глобальными для использования в HTML onclick
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.viewStudentGrades = viewStudentGrades;