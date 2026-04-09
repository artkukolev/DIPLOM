import { useMemo } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useStudents } from "../hooks/useStudents";

export const DashboardPage: React.FC = () => {
  const { data, isLoading } = useStudents();

  const stats = useMemo(() => {
    const total = data?.length ?? 0;
    const byStatus =
      data?.reduce<Record<string, number>>((acc, student) => {
        acc[student.status] = (acc[student.status] || 0) + 1;
        return acc;
      }, {}) ?? {};
    const classes = new Set(data?.map((s) => s.className) ?? []);
    return { total, byStatus, classCount: classes.size };
  }, [data]);

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Добро пожаловать в SchoolPlus
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Управление личными делами учеников за 1-2 клика.
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
        <Card sx={{ p: 2, border: "1px solid rgba(30, 64, 175, .12)" }}>
          <Typography variant="subtitle1" mb={1} color="text.secondary">
            Всего учеников
          </Typography>
          <Typography variant="h2" color="primary">
            {stats.total}
          </Typography>
        </Card>
        <Card sx={{ p: 2, border: "1px solid rgba(21, 128, 61, .12)" }}>
          <Typography variant="subtitle1" mb={1} color="text.secondary">
            Классов
          </Typography>
          <Typography variant="h2" color="success.main">
            {stats.classCount}
          </Typography>
        </Card>
        <Card sx={{ p: 2, border: "1px solid rgba(237, 135, 45, .12)" }}>
          <Typography variant="subtitle1" mb={1} color="text.secondary">
            Активные
          </Typography>
          <Typography variant="h2" color="info.main">
            {stats.byStatus.active ?? 0}
          </Typography>
        </Card>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Быстрые действия
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
              onClick={() => window.location.assign("/students")}
            >
              Перейти в список
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => window.location.assign("/audit")}
            >
              История изменений
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Статусы по классам
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 1 }}>
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <Typography key={status} sx={{ fontWeight: 500 }}>
                {status}: {count}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
