import type {
  AuditEntry,
  Group,
  Notification,
  Student,
  StudentDocument,
  User,
} from "../types";
import { safeParse, saveJSON } from "../utils/storage";

const STUDENTS_KEY = "school_students_v2";
const AUDIT_KEY = "school_audit_v2";
const USERS_KEY = "school_users_v2";
const GROUPS_KEY = "school_groups_v1";
const NOTIFICATIONS_KEY = "school_notifications_v1";

const defaultGroups: Group[] = [
  {
    id: "g1",
    name: "Команда 10А",
    className: "10А",
    mentor: "Петрова Надежда Ивановна",
    studentIds: ["s1", "s3"],
  },
  {
    id: "g2",
    name: "Команда 9Б",
    className: "9Б",
    mentor: "Сидоров Алексей Алексеевич",
    studentIds: ["s2"],
  },
];

const defaultDocuments: StudentDocument[] = [
  {
    id: "d1",
    name: "Паспорт",
    type: "passport",
    versions: [
      {
        id: "dv1",
        fileName: "passport_ivanov.pdf",
        uploadedAt: "2024-09-15T12:00:00.000Z",
        expiresAt: "2034-09-15",
        note: "Актуальный паспорт",
      },
    ],
  },
];

const defaultStudents: Student[] = [
  {
    id: "s1",
    fullName: "Иванов Иван Иванович",
    birthDate: "2008-05-15",
    snils: "123-456-789 00",
    passportSeries: "45 09",
    passportNumber: "123456",
    address: "г. Москва, ул. Ленина, д. 10",
    contactPhone: "+7 123 456 78 90",
    email: "ivanov@example.com",
    className: "10А",
    groupId: "g1",
    avatar: "",
    parentContacts: "+7 912 345 67 89",
    status: "active",
    enrollmentDate: "2015-09-01",
    grades: { math: 4, russian: 5, physics: 4 },
    academicRecords: [
      {
        semester: "2025-2026 (осень)",
        results: {
          math: { grade: 4 },
          russian: { grade: 5 },
          physics: { grade: 4 },
        },
        average: 4.3,
      },
    ],
    attendance: [
      { date: "2026-03-20", status: "present" },
      { date: "2026-03-21", status: "late" },
      { date: "2026-03-22", status: "absent" },
    ],
    medicalNotes: "Аллергия на орехи",
    specialNeeds: "ОВЗ по зрению",
    benefits: "льгота 30%",
    competencies: ["React", "Python", "Git"],
    portfolio: [
      {
        id: "p1",
        title: "Проект онлайн-школы",
        category: "project",
        description: "Разработка интерфейса личного кабинета ученика.",
        date: "2025-11-12",
        link: "https://github.com/ivanov/project-school",
        skills: ["React", "Typescript", "CSS"],
      },
      {
        id: "p2",
        title: "Сертификат по ИИ",
        category: "certificate",
        description: "Базовый курс по машинному обучению.",
        date: "2025-08-05",
        link: "https://certificate.example.com/ivanov",
        skills: ["Machine Learning", "Python"],
      },
    ],
    documents: defaultDocuments,
    history: [
      {
        id: "h1",
        date: "2026-04-01",
        type: "status",
        description: "Переведён в 10А.",
        actor: "Director",
      },
      {
        id: "h2",
        date: "2026-03-20",
        type: "achievement",
        description: "Сдал олимпиаду по физике с 2 местом.",
        actor: "Teacher",
      },
    ],
  },
  {
    id: "s2",
    fullName: "Петрова Ольга Сергеевна",
    birthDate: "2009-02-10",
    snils: "987-654-321 99",
    passportSeries: "45 10",
    passportNumber: "654321",
    address: "г. Москва, ул. Гагарина, д. 22",
    contactPhone: "+7 912 123 45 67",
    email: "petrova@example.com",
    className: "9Б",
    groupId: "g2",
    avatar: "",
    parentContacts: "+7 987 654 32 10",
    status: "active",
    enrollmentDate: "2016-09-01",
    grades: { math: 5, russian: 4, biology: 5 },
    academicRecords: [
      {
        semester: "2025-2026 (весна)",
        results: {
          math: { grade: 5 },
          russian: { grade: 4 },
          biology: { grade: 5 },
        },
        average: 4.7,
      },
    ],
    attendance: [{ date: "2026-03-22", status: "present" }],
    medicalNotes: "нет",
    specialNeeds: "нет",
    benefits: "нет",
    competencies: ["Biology", "Chemistry"],
    portfolio: [
      {
        id: "p3",
        title: "Участие в хакатоне",
        category: "hackathon",
        description: "Команда заняла 1 место в направлении экология.",
        date: "2026-01-28",
        link: "https://hackathon.example.com/team9b",
        skills: ["Teamwork", "Data Analysis"],
      },
    ],
    documents: [
      {
        id: "d2",
        name: "Свидетельство о рождении",
        type: "birthCertificate",
        versions: [
          {
            id: "dv2",
            fileName: "birth_certificate_olga.pdf",
            uploadedAt: "2024-10-10T10:00:00.000Z",
            note: "Оригинал",
          },
        ],
      },
    ],
    history: [
      {
        id: "h3",
        date: "2026-02-15",
        type: "achievement",
        description: "Присутствовала на экологическом форуме.",
        actor: "Teacher",
      },
    ],
  },
];

const defaultUsers: User[] = [
  { id: "u1", name: "Admin", email: "admin@example.com", role: "admin" },
  {
    id: "u2",
    name: "Director",
    email: "director@example.com",
    role: "director",
  },
  {
    id: "u3",
    name: "Tutor Olga",
    email: "tutor@example.com",
    role: "tutor",
    groupId: "g1",
  },
  {
    id: "u4",
    name: "Head Teacher",
    email: "headteacher@example.com",
    role: "headTeacher",
    className: "9Б",
  },
  { id: "u5", name: "Teacher", email: "teacher@example.com", role: "teacher" },
  {
    id: "u6",
    name: "Secretary",
    email: "secretary@example.com",
    role: "secretary",
  },
  {
    id: "u7",
    name: "Parent",
    email: "parent@example.com",
    role: "parent",
    studentId: "s1",
  },
  {
    id: "u8",
    name: "Student",
    email: "student@example.com",
    role: "student",
    studentId: "s1",
  },
];

const defaultNotifications: Notification[] = [
  {
    id: "n1",
    recipientRole: "parent",
    subject: "Напоминание о мед. справке",
    body: "Пожалуйста, загрузите обновлённую мед. справку до 25 мая.",
    createdAt: "2026-05-10T09:00:00.000Z",
    relatedStudentId: "s1",
    read: false,
  },
  {
    id: "n2",
    recipientRole: "teacher",
    subject: "Новая аттестация по физике",
    body: "Добавлена новая оценка по физике для 10А.",
    createdAt: "2026-05-11T12:20:00.000Z",
    read: true,
  },
  {
    id: "n3",
    recipientRole: "all",
    subject: "Системное обновление",
    body: "Плановое обновление системы состоится 18 мая в 23:00.",
    createdAt: "2026-05-12T15:35:00.000Z",
    read: false,
  },
];

export const getStudentsFromDb = (): Student[] =>
  safeParse<Student[]>(localStorage.getItem(STUDENTS_KEY), defaultStudents);

const setStudentsToDb = (students: Student[]) =>
  saveJSON(STUDENTS_KEY, students);

export const getGroupsFromDb = (): Group[] =>
  safeParse<Group[]>(localStorage.getItem(GROUPS_KEY), defaultGroups);

export const getNotificationsFromDb = (): Notification[] =>
  safeParse<Notification[]>(
    localStorage.getItem(NOTIFICATIONS_KEY),
    defaultNotifications,
  );

const setNotificationsToDb = (notifications: Notification[]) =>
  saveJSON(NOTIFICATIONS_KEY, notifications);

export const getAuditFromDb = (): AuditEntry[] =>
  safeParse<AuditEntry[]>(localStorage.getItem(AUDIT_KEY), []);

const setAuditToDb = (audit: AuditEntry[]) => saveJSON(AUDIT_KEY, audit);

export const getUsersFromDb = (): User[] =>
  safeParse<User[]>(localStorage.getItem(USERS_KEY), defaultUsers);

const addAuditEntry = (
  entry: Omit<AuditEntry, "id" | "createdAt">,
): AuditEntry => {
  const audit = getAuditFromDb();
  const newEntry: AuditEntry = {
    id: `a_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  setAuditToDb([newEntry, ...audit]);
  return newEntry;
};

export const api = {
  getStudents: async () => {
    await new Promise((r) => setTimeout(r, 120));
    return getStudentsFromDb();
  },
  getGroups: async () => {
    await new Promise((r) => setTimeout(r, 90));
    return getGroupsFromDb();
  },
  getNotifications: async () => {
    await new Promise((r) => setTimeout(r, 80));
    return getNotificationsFromDb();
  },
  markNotificationRead: async (notificationId: string) => {
    const notifications = getNotificationsFromDb().map((notification) =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification,
    );
    setNotificationsToDb(notifications);
    return notifications;
  },
  upsertStudent: async (student: Student, actor: string) => {
    const students = getStudentsFromDb();
    const existingIndex = students.findIndex((s) => s.id === student.id);
    if (existingIndex >= 0) {
      students[existingIndex] = student;
      addAuditEntry({
        actor,
        action: "updated student",
        targetType: "student",
        targetId: student.id,
        details: JSON.stringify({ student }),
      });
    } else {
      students.unshift(student);
      addAuditEntry({
        actor,
        action: "created student",
        targetType: "student",
        targetId: student.id,
        details: JSON.stringify({ student }),
      });
    }
    setStudentsToDb(students);
    return student;
  },
  deleteStudent: async (studentId: string, actor: string) => {
    const students = getStudentsFromDb().filter((s) => s.id !== studentId);
    setStudentsToDb(students);
    addAuditEntry({
      actor,
      action: "deleted student",
      targetType: "student",
      targetId: studentId,
      details: "",
    });
    return true;
  },
  promoteClass: async (classFrom: string, classTo: string, actor: string) => {
    const students = getStudentsFromDb().map((s) =>
      s.className === classFrom ? { ...s, className: classTo } : s,
    );
    setStudentsToDb(students);
    addAuditEntry({
      actor,
      action: "promoted class",
      targetType: "system",
      targetId: classFrom,
      details: `to ${classTo}`,
    });
    return students;
  },
  getAudit: async () => {
    await new Promise((r) => setTimeout(r, 80));
    return getAuditFromDb();
  },
  login: async (email: string) => {
    const users = getUsersFromDb();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
};
