export type Role =
  | "admin"
  | "director"
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
}

export interface Student {
  id: string;
  fullName: string;
  birthDate: string;
  className: string;
  avatar?: string;
  parentContacts: string;
  status: "active" | "transferred" | "expelled" | "archived";
  enrollmentDate: string;
  grades: Record<string, number>;
  attendance: { date: string; status: "present" | "absent" | "late" }[];
  medicalNotes: string;
  benefits: string;
  documents: { name: string; url: string }[];
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
  status: Student["status"] | "all";
  enrollmentFrom?: string;
  enrollmentTo?: string;
}
