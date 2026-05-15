import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/mockDb";
import type { Group, Notification, Student } from "../types";

const STUDENTS_KEY = ["students"];
const GROUPS_KEY = ["groups"];
const NOTIFICATIONS_KEY = ["notifications"];

export const useStudents = () =>
  useQuery<Student[]>({
    queryKey: STUDENTS_KEY,
    queryFn: api.getStudents,
  });

export const useGroups = () =>
  useQuery<Group[]>({
    queryKey: GROUPS_KEY,
    queryFn: api.getGroups,
  });

export const useNotifications = () =>
  useQuery<Notification[]>({
    queryKey: NOTIFICATIONS_KEY,
    queryFn: api.getNotifications,
  });

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      api.markNotificationRead(notificationId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY }),
  });
};

export const useUpsertStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ student, actor }: { student: Student; actor: string }) =>
      api.upsertStudent(student, actor),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: STUDENTS_KEY }),
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ studentId, actor }: { studentId: string; actor: string }) =>
      api.deleteStudent(studentId, actor),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: STUDENTS_KEY }),
  });
};

export const usePromoteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      from,
      to,
      actor,
    }: {
      from: string;
      to: string;
      actor: string;
    }) => api.promoteClass(from, to, actor),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: STUDENTS_KEY }),
  });
};
