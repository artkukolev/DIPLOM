import type { AuditEntry, Student, User } from "../types";
import { safeParse, saveJSON } from "../utils/storage";

const STUDENTS_KEY = "school_students_v1";
const AUDIT_KEY = "school_audit_v1";
const USERS_KEY = "school_users_v1";

const defaultStudents: Student[] = [
  {
    id: "s1",
    fullName: "Иванов Иван Иванович",
    birthDate: "2008-05-15",
    className: "10А",
    avatar: "",
    parentContacts: "+7 123 456 78 90",
    status: "active",
    enrollmentDate: "2015-09-01",
    grades: { math: 4, russian: 5, physics: 4 },
    attendance: [
      { date: "2026-03-20", status: "present" },
      { date: "2026-03-21", status: "late" },
      { date: "2026-03-22", status: "absent" },
    ],
    medicalNotes: "Аллергия на орехи",
    benefits: "льгота 30%",
    documents: [{ name: "паспорт", url: "#" }],
  },
  {
    id: "s2",
    fullName: "Петрова Ольга Сергеевна",
    birthDate: "2009-02-10",
    className: "9Б",
    avatar: "",
    parentContacts: "+7 912 123 45 67",
    status: "active",
    enrollmentDate: "2016-09-01",
    grades: { math: 5, russian: 4, biology: 5 },
    attendance: [{ date: "2026-03-22", status: "present" }],
    medicalNotes: "нет",
    benefits: "нет",
    documents: [{ name: "свидетельство", url: "#" }],
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
  { id: "u3", name: "Teacher", email: "teacher@example.com", role: "teacher" },
  {
    id: "u4",
    name: "Secretary",
    email: "secretary@example.com",
    role: "secretary",
  },
  {
    id: "u5",
    name: "Parent",
    email: "parent@example.com",
    role: "parent",
    studentId: "s1",
  },
  {
    id: "u6",
    name: "Student",
    email: "student@example.com",
    role: "student",
    studentId: "s1",
  },
];

export const getStudentsFromDb = (): Student[] =>
  safeParse<Student[]>(localStorage.getItem(STUDENTS_KEY), defaultStudents);

const setStudentsToDb = (students: Student[]) =>
  saveJSON(STUDENTS_KEY, students);

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
      students.push(student);
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
    const students = getStudentsFromDb().map((s) => {
      if (s.className === classFrom) {
        return { ...s, className: classTo };
      }
      return s;
    });
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
