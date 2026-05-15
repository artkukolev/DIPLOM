import { useMemo } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useGroups, useNotifications, useStudents } from "../hooks/useStudents";

export const DashboardPage: React.FC = () => {
  const { data: students, isLoading } = useStudents();
  const { data: groups } = useGroups();
  const { data: notifications } = useNotifications();

  const stats = useMemo(() => {
    const total = students?.length ?? 0;
    const byStatus =
      students?.reduce<Record<string, number>>((acc, student) => {
        acc[student.status] = (acc[student.status] || 0) + 1;
        return acc;
      }, {}) ?? {};
    const classes = new Set(students?.map((s) => s.className) ?? []);
    const withNeeds =
      students?.filter((s) => s.specialNeeds !== "нет").length ?? 0;
    return { total, byStatus, classCount: classes.size, withNeeds };
  }, [students]);

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Добро пожаловать в SchoolPlus
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Управление личными делами учащихся в одном современном дашборде.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          mb: 3,
        }}
      >
        <Card sx={{ p: 3, border: "1px solid rgba(30, 64, 175, .12)" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Всего учеников
          </Typography>
          <Typography variant="h2" color="primary">
            {stats.total}
          </Typography>
        </Card>
        <Card sx={{ p: 3, border: "1px solid rgba(21, 128, 61, .12)" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Классов / групп
          </Typography>
          <Typography variant="h2" color="success.main">
            {groups?.length ?? 0}
          </Typography>
        </Card>
        <Card sx={{ p: 3, border: "1px solid rgba(237, 135, 45, .12)" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Ученики с ОВЗ
          </Typography>
          <Typography variant="h2" color="warning.main">
            {stats.withNeeds}
          </Typography>
        </Card>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Быстрые действия
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.assign("/students/new")}
            >
              Добавить ученика
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => window.location.assign("/notifications")}
            >
              Уведомления
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.location.assign("/reports")}
            >
              Отчёты
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Статусы по классам
          </Typography>
          <Box sx={{ display: "grid", gap: 1 }}>
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <Typography key={status} sx={{ fontWeight: 500 }}>
                {status}: {count}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" mb={2}>
          Сервисы уведомлений
        </Typography>
        <Typography color="text.secondary">
          Всего уведомлений: {notifications?.length ?? 0}. Перейдите в раздел
          уведомлений для обработки новых сообщений.
        </Typography>
      </Card>
    </Box>
  );
};
