export type UserRole = 'teacher' | 'admin' | 'student' | 'parent';

export type User = {
  id: number;
  name: string;
  role: UserRole;
  class: string;
};

export type Gender = 'М' | 'Ж';

export type Student = {
  id: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string; // YYYY-MM-DD
  gender: Gender;
  class: string;
  admissionYear: number;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  parentWork?: string;
  medicalInfo?: string;
  additionalInfo?: string;
  createdAt: string; // ISO
};

export type SubjectKey = 'math' | 'physics' | 'informatics' | 'russian' | 'literature';

export const SUBJECT_LABELS: Record<SubjectKey, string> = {
  math: 'Математика',
  physics: 'Физика',
  informatics: 'Информатика',
  russian: 'Русский язык',
  literature: 'Литература',
};

export type Grade = {
  id: number;
  studentId: number;
  subject: SubjectKey;
  value: 2 | 3 | 4 | 5;
  date: string; // YYYY-MM-DD
  comment?: string;
  teacherId: number;
  createdAt: string; // ISO
};

export type NoticeType = 'success' | 'error' | 'warning' | 'info';

