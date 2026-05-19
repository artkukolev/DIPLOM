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
    <Box sx={{ color: "#e2e8f0" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="#f8fafc">
          Добро пожаловать в SchoolPlus
        </Typography>
        <Typography variant="body1" color="#cbd5e1">
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
        <Card
          sx={{
            p: 3,
            backgroundColor: "#111827",
            border: "1px solid rgba(148,163,184,0.16)",
          }}
        >
          <Typography variant="subtitle2" color="#94a3b8" gutterBottom>
            Всего учеников
          </Typography>
          <Typography variant="h2" color="#e0e7ff">
            {stats.total}
          </Typography>
        </Card>
        <Card
          sx={{
            p: 3,
            backgroundColor: "#111827",
            border: "1px solid rgba(148,163,184,0.16)",
          }}
        >
          <Typography variant="subtitle2" color="#94a3b8" gutterBottom>
            Классов / групп
          </Typography>
          <Typography variant="h2" color="#34d399">
            {groups?.length ?? 0}
          </Typography>
        </Card>
        <Card
          sx={{
            p: 3,
            backgroundColor: "#111827",
            border: "1px solid rgba(148,163,184,0.16)",
          }}
        >
          <Typography variant="subtitle2" color="#94a3b8" gutterBottom>
            Ученики с ОВЗ
          </Typography>
          <Typography variant="h2" color="#f59e0b">
            {stats.withNeeds}
          </Typography>
        </Card>
      </Box>

      <Card
        sx={{
          mb: 3,
          backgroundColor: "#111827",
          border: "1px solid rgba(148,163,184,0.16)",
        }}
      >
        <CardContent>
          <Typography variant="h6" mb={2} color="#f8fafc">
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

      <Card
        sx={{
          backgroundColor: "#111827",
          border: "1px solid rgba(148,163,184,0.16)",
        }}
      >
        <CardContent>
          <Typography variant="h6" mb={2} color="#f8fafc">
            Статусы по классам
          </Typography>
          <Box sx={{ display: "grid", gap: 1 }}>
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <Typography
                key={status}
                sx={{ fontWeight: 500, color: "#e2e8f0" }}
              >
                {status}: {count}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Card
        sx={{
          mt: 3,
          p: 3,
          backgroundColor: "#111827",
          border: "1px solid rgba(148,163,184,0.16)",
        }}
      >
        <Typography variant="h6" mb={2} color="#f8fafc">
          Сервисы уведомлений
        </Typography>
        <Typography color="#cbd5e1">
          Всего уведомлений: {notifications?.length ?? 0}. Перейдите в раздел
          уведомлений для обработки новых сообщений.
        </Typography>
      </Card>
    </Box>
  );
};
