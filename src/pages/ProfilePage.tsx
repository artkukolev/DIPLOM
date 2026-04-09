import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { useStudents } from "../hooks/useStudents";

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { data: students } = useStudents();

  const student = user?.studentId
    ? students?.find((s) => s.id === user.studentId)
    : null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" mb={2}>
          Профиль
        </Typography>
        <Typography variant="h6">{user?.name}</Typography>
        <Typography>Роль: {user?.role}</Typography>
        <Typography>Email: {user?.email}</Typography>
        {student && (
          <Box mt={2}>
            <Typography variant="h6">Мои данные</Typography>
            <Typography>ФИО: {student.fullName}</Typography>
            <Typography>Класс: {student.className}</Typography>
            <Typography>Статус: {student.status}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
