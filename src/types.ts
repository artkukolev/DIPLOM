export type Role =
  | "admin"
  | "director"
  | "tutor"
  | "headTeacher"
  | "teacher"
  | "secretary"
  | "parent"
  | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  studentId?: string;
  className?: string;
  groupId?: string;
}

export interface StudentDocumentVersion {
  id: string;
  fileName: string;
  uploadedAt: string;
  expiresAt?: string;
  note?: string;
}

export interface StudentDocument {
  id: string;
  name: string;
  type: "passport" | "birthCertificate" | "medical" | "certificate" | "other";
  versions: StudentDocumentVersion[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category:
    | "project"
    | "certificate"
    | "internship"
    | "hackathon"
    | "competition"
    | "other";
  description: string;
  date: string;
  link?: string;
  skills: string[];
}

export interface AcademicRecord {
  semester: string;
  results: Record<string, { grade: number; comment?: string }>;
  average: number;
}

export interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "late" | "excused";
}

export interface StudentHistoryEntry {
  id: string;
  date: string;
  type:
    | "profile"
    | "document"
    | "note"
    | "status"
    | "attendance"
    | "achievement";
  description: string;
  actor: string;
}

export interface Notification {
  id: string;
  recipientRole: Role | "all";
  subject: string;
  body: string;
  createdAt: string;
  relatedStudentId?: string;
  read: boolean;
}

export interface Group {
  id: string;
  name: string;
  mentor: string;
  className: string;
  studentIds: string[];
}

export interface Student {
  id: string;
  fullName: string;
  birthDate: string;
  snils: string;
  passportSeries: string;
  passportNumber: string;
  address: string;
  contactPhone: string;
  email: string;
  className: string;
  groupId: string;
  avatar?: string;
  parentContacts: string;
  status: "active" | "transferred" | "expelled" | "archived";
  enrollmentDate: string;
  grades: Record<string, number>;
  academicRecords: AcademicRecord[];
  attendance: AttendanceRecord[];
  medicalNotes: string;
  specialNeeds: string;
  benefits: string;
  competencies: string[];
  portfolio: PortfolioItem[];
  documents: StudentDocument[];
  history: StudentHistoryEntry[];
}

export interface AuditEntry {
  id: string;
  createdAt: string;
  actor: string;
  action: string;
  targetType: "student" | "user" | "system";
  targetId: string;
  details: string;
}

export interface StudentFilter {
  query: string;
  className: string;
  groupId: string;
  status: Student["status"] | "all";
  specialNeeds?: "all" | "yes" | "no";
  benefits?: "all" | "yes" | "no";
  competency?: string;
}
