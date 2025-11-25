// Хранилище данных
let studentsData = JSON.parse(localStorage.getItem('studentsData')) || [];
let gradesData = JSON.parse(localStorage.getItem('gradesData')) || [];
let messagesData = JSON.parse(localStorage.getItem('messagesData')) || [];
let homeworkData = JSON.parse(localStorage.getItem('homeworkData')) || [];
let nextStudentId = parseInt(localStorage.getItem('nextStudentId')) || 1;
let nextGradeId = parseInt(localStorage.getItem('nextGradeId')) || 1;

// Система ролей и разрешений
const userRoles = {
    admin: { permissions: ['all'] },
    teacher: { 
        permissions: ['grades', 'attendance', 'messages', 'materials', 'homework'] 
    },
    parent: { 
        permissions: ['view_grades', 'view_attendance', 'messages'] 
    },
    student: { 
        permissions: ['view_own_grades', 'view_materials', 'submit_work'] 
    }
};

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

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных
    loadStudentsData();
    loadGradesData();
    updateStatistics();
    initializeCharts();

    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    // Переключение боковой панели
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');

    toggleSidebarBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        const icon = this.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-chevron-left');
            icon.classList.add('fa-chevron-right');
        } else {
            icon.classList.remove('fa-chevron-right');
            icon.classList.add('fa-chevron-left');
        }
    });

    // Мобильное меню
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Управление модальными окнами
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    // Открытие модальных окон
    document.getElementById('addStudentBtn').addEventListener('click', openAddStudentModal);
    document.getElementById('addStudentMainBtn').addEventListener('click', openAddStudentModal);
    document.getElementById('addGradeBtn').addEventListener('click', openAddGradeModal);

    // Экспорт в Excel
    document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);
    document.getElementById('exportToExcelBtn').addEventListener('click', exportToExcel);

    // Закрытие модальных окон
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Сохранение данных форм
    document.getElementById('saveStudentBtn').addEventListener('click', saveStudent);
    document.getElementById('saveGradeBtn').addEventListener('click', saveGrade);

    // Переключение вкладок
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Убираем активный класс у всех вкладок и контента
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Добавляем активный класс текущей вкладке и контенту
            this.classList.add('active');
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });

    // Переключение разделов
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');

            // Убираем активный класс у всех ссылок и секций
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Добавляем активный класс текущей ссылке и секции
            this.classList.add('active');
            document.getElementById(section + '-section').classList.add('active');

            // На мобильных устройствах скрываем меню после выбора
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
            }
        });
    });

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');

            // Убираем активный класс у всех ссылок
            sidebarLinks.forEach(l => l.classList.remove('active'));

            // Добавляем активный класс текущей ссылке
            this.classList.add('active');

            // Если это ссылка на раздел, переключаемся на него
            if (section) {
                navLinks.forEach(l => {
                    if (l.getAttribute('data-section') === section) {
                        l.click();
                    }
                });
            }
        });
    });

    // Поиск учеников
    const searchInput = document.getElementById('searchStudents');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('#studentsTable tbody tr');

        rows.forEach(row => {
            const studentName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            if (studentName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Применение фильтров
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);

    // Имитация получения уведомления
    setInterval(() => {
        if (Math.random() > 0.7) {
            showMobileNotification('Новое сообщение', 'У вас новое сообщение от ученика');
        }
    }, 30000);
});

// Функции для работы с данными

function openAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'flex';
    document.getElementById('addStudentForm').reset();
}

function saveStudent() {
    const form = document.getElementById('addStudentForm');
    if (!form.checkValidity()) {
        showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
        return;
    }

    const student = {
        id: nextStudentId++,
        lastName: document.getElementById('lastName').value,
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        birthDate: document.getElementById('birthDate').value,
        gender: document.getElementById('gender').value,
        class: document.getElementById('class').value,
        admissionYear: document.getElementById('admissionYear').value,
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

    document.getElementById('addStudentModal').style.display = 'none';
    showNotification('Личное дело ученика успешно создано!');
}

function openAddGradeModal() {
    // Заполнение списка учеников
    const studentSelect = document.getElementById('gradeStudent');
    studentSelect.innerHTML = '<option value="">Выберите ученика</option>';

    studentsData.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.lastName} ${student.firstName} ${student.middleName || ''}`;
        studentSelect.appendChild(option);
    });

    document.getElementById('addGradeModal').style.display = 'flex';
    document.getElementById('addGradeForm').reset();
}

function saveGrade() {
    const form = document.getElementById('addGradeForm');
    if (!form.checkValidity()) {
        showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
        return;
    }

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

    document.getElementById('addGradeModal').style.display = 'none';
    showNotification('Оценка успешно добавлена!');
}

function loadStudentsData() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';

    if (studentsData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center;">Нет данных об учениках</td></tr>';
        return;
    }

    studentsData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.lastName} ${student.firstName} ${student.middleName || ''}</td>
            <td>${formatDate(student.birthDate)}</td>
            <td>${student.class}</td>
            <td>${student.address}</td>
            <td>${student.parentPhone}</td>
            <td>${student.parentName}</td>
            <td>${student.medicalInfo || '-'}</td>
            <td>
                <button class="btn btn-outline" onclick="editStudent(${student.id})" style="padding: 0.25rem 0.5rem;">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-outline" onclick="deleteStudent(${student.id})" style="padding: 0.25rem 0.5rem;">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('studentsCount').textContent = `${studentsData.length} учащихся`;
}

function loadGradesData() {
    const tbody = document.getElementById('gradesTableBody');
    tbody.innerHTML = '';

    if (gradesData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">Нет данных об оценках</td></tr>';
        return;
    }

    // Группировка оценок по ученикам
    const gradesByStudent = {};

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
    studentsData.forEach(student => {
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
                <button class="btn btn-outline" onclick="viewStudentGrades(${student.id})" style="padding: 0.25rem 0.5rem;">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
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
        if (!gradesBySubject[grade.subject]) {
            gradesBySubject[grade.subject] = [];
        }
        gradesBySubject[grade.subject].push(grade);
    });

    const rowsHtml = Object.keys(SUBJECT_LABELS).map(subjectKey => {
        const gradesList = gradesBySubject[subjectKey] || [];
        const avg = calculateAverage(gradesList);
        const gradesText = gradesList.length
            ? gradesList.map(grade => `${grade.value} (${formatDate(grade.date)})`).join(', ')
            : 'Нет оценок';

        return `
            <tr>
                <td>${SUBJECT_LABELS[subjectKey]}</td>
                <td>${gradesText}</td>
                <td>${avg > 0 ? avg.toFixed(2) : '-'}</td>
            </tr>
        `;
    }).join('');

    const averages = Object.keys(SUBJECT_LABELS)
        .map(subjectKey => calculateAverage(gradesBySubject[subjectKey]))
        .filter(value => value > 0);
    const overallAvg = averages.length
        ? (averages.reduce((acc, value) => acc + value, 0) / averages.length).toFixed(2)
        : '-';

    modalBody.innerHTML = `
        <div class="student-summary">
            <h4>${student.lastName} ${student.firstName} ${student.middleName || ''}</h4>
            <p>Класс: ${student.class}</p>
            <p>Средний балл: <strong>${overallAvg}</strong></p>
        </div>
        <div class="table-container">
            <table>
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

    modal.style.display = 'flex';
}

function editStudent(id) {
    const student = studentsData.find(s => s.id === id);
    if (student) {
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
        document.getElementById('addStudentModal').style.display = 'flex';
        showNotification('Редактирование личного дела ученика');
    }
}

function deleteStudent(id) {
    if (confirm('Вы уверены, что хотите удалить личное дело ученика?')) {
        studentsData = studentsData.filter(s => s.id !== id);
        saveDataToStorage();
        loadStudentsData();
        updateStatistics();
        showNotification('Личное дело ученика удалено!');
    }
}

function updateStatistics() {
    document.getElementById('totalStudents').textContent = studentsData.length;
}

function saveDataToStorage() {
    localStorage.setItem('studentsData', JSON.stringify(studentsData));
    localStorage.setItem('nextStudentId', nextStudentId.toString());
}

function saveGradesToStorage() {
    localStorage.setItem('gradesData', JSON.stringify(gradesData));
    localStorage.setItem('nextGradeId', nextGradeId.toString());
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('systemNotification');
    const notificationText = document.getElementById('notificationText');

    notificationText.textContent = message;
    notification.className = 'system-notification';

    if (type === 'error') {
        notification.classList.add('error');
    } else if (type === 'warning') {
        notification.classList.add('warning');
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showMobileNotification(title, message) {
    const notification = document.getElementById('mobileNotification');
    const titleElement = notification.querySelector('strong');
    const messageElement = notification.querySelector('p');

    titleElement.textContent = title;
    messageElement.textContent = message;

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

function applyFilters() {
    const classFilter = document.getElementById('filterClass').value;
    const statusFilter = document.getElementById('filterStatus').value;
    const searchTerm = document.getElementById('searchStudents').value.toLowerCase();

    const rows = document.querySelectorAll('#studentsTable tbody tr');

    rows.forEach(row => {
        const studentClass = row.querySelector('td:nth-child(4)').textContent.trim();
        const studentName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

        let showRow = true;

        if (classFilter && studentClass !== classFilter) {
            showRow = false;
        }

        if (searchTerm && !studentName.includes(searchTerm)) {
            showRow = false;
        }

        // Здесь можно добавить логику для фильтра по статусу
        // если у вас есть данные об успеваемости

        row.style.display = showRow ? '' : 'none';
    });

    showNotification('Фильтры применены');
}

function initializeCharts() {
    // График успеваемости на главной
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(performanceCtx, {
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

    // График оценок в разделе успеваемости
    const gradesCtx = document.getElementById('gradesChart').getContext('2d');
    const gradesChart = new Chart(gradesCtx, {
        type: 'bar',
        data: {
            labels: ['Математика', 'Физика', 'Информатика', 'Русский язык', 'Литература'],
            datasets: [{
                label: 'Средний балл',
                data: [4.5, 4.2, 4.8, 3.9, 4.1],
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

    // График посещаемости
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    const attendanceChart = new Chart(attendanceCtx, {
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

    // График выполнения домашних заданий
    const homeworkCtx = document.getElementById('homeworkChart').getContext('2d');
    const homeworkChart = new Chart(homeworkCtx, {
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
}

function calculateAverage(grades) {
    if (!grades || grades.length === 0) return 0;
    return grades.reduce((sum, grade) => sum + grade.value, 0) / grades.length;
}

// Экспорт в Excel
function exportToExcel() {
    if (studentsData.length === 0) {
        showNotification('Нет данных для экспорта!', 'warning');
        return;
    }

    try {
        // Подготовка данных для Excel
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

        // Создание рабочей книги
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Учащиеся');

        // Настройка стилей колонок
        const colWidths = [
            { wch: 5 },  // ID
            { wch: 15 }, // Фамилия
            { wch: 15 }, // Имя
            { wch: 15 }, // Отчество
            { wch: 12 }, // Дата рождения
            { wch: 8 },  // Пол
            { wch: 8 },  // Класс
            { wch: 12 }, // Год поступления
            { wch: 30 }, // Адрес
            { wch: 20 }, // ФИО родителя
            { wch: 15 }, // Телефон родителя
            { wch: 20 }, // Место работы
            { wch: 25 }, // Мед. информация
            { wch: 25 }, // Доп. информация
            { wch: 12 }  // Дата создания
        ];
        ws['!cols'] = colWidths;

        // Сохранение файла
        const fileName = `Учащиеся_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);

        showNotification(`Данные экспортированы в файл: ${fileName}`);
    } catch (error) {
        console.error('Ошибка при экспорте в Excel:', error);
        showNotification('Произошла ошибка при экспорте данных!', 'error');
    }
}

// Добавление тестовых данных при первом запуске
if (studentsData.length === 0) {
    studentsData = [
        {
            id: 1,
            lastName: "Петров",
            firstName: "Алексей",
            middleName: "Сергеевич",
            birthDate: "2007-03-15",
            gender: "М",
            class: "10А",
            admissionYear: "2023",
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
            admissionYear: "2023",
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
            admissionYear: "2023",
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
    saveDataToStorage();
    loadStudentsData();
    updateStatistics();
}

// Добавление тестовых данных оценок
if (gradesData.length === 0) {
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
    saveGradesToStorage();
    loadGradesData();
}

