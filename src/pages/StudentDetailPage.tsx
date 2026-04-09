import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useStudents } from "../hooks/useStudents";

export const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useStudents();
  const navigate = useNavigate();

  const student = useMemo(() => data?.find((s) => s.id === id), [data, id]);

  if (isLoading) return <CircularProgress />;
  if (!student) return <Typography>Ученик не найден</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" mb={2}>
          {student.fullName}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Typography>Класс: {student.className}</Typography>
          <Typography>Статус: {student.status}</Typography>
          <Typography>Дата рождения: {student.birthDate}</Typography>
          <Typography>Дата поступления: {student.enrollmentDate}</Typography>
          <Typography sx={{ gridColumn: "1 / -1" }}>
            Контакты родителей: {student.parentContacts}
          </Typography>
          <Typography sx={{ gridColumn: "1 / -1" }}>
            Медкарта: {student.medicalNotes}
          </Typography>
          <Typography sx={{ gridColumn: "1 / -1" }}>
            Льготы: {student.benefits}
          </Typography>
        </Box>
        <Box mt={2}>
          <Button variant="contained" onClick={() => navigate("/students")}>
            Назад
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={() => navigate(`/students/${student.id}/edit`)}
          >
            Изменить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
