import { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  useStudents,
  useDeleteStudent,
  usePromoteClass,
} from "../hooks/useStudents";
import type { StudentFilter } from "../types";

const defaultFilter: StudentFilter = {
  query: "",
  className: "all",
  status: "all",
};

const exportExcel = (data: any[]) => {
  const header = Object.keys(data[0] || {}).join("\t");
  const rows = data.map((item) => Object.values(item).join("\t")).join("\n");
  const blob = new Blob([header + "\n" + rows], {
    type: "application/vnd.ms-excel",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "students.xls";
  link.click();
  URL.revokeObjectURL(url);
};

export const StudentsPage: React.FC = () => {
  const { data, isLoading } = useStudents();
  const user = useAuthStore((s) => s.user);
  const deleteMutation = useDeleteStudent();
  const promoteMutation = usePromoteClass();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<StudentFilter>(() => {
    const raw = localStorage.getItem("savedStudentFilter");
    return raw ? JSON.parse(raw) : defaultFilter;
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((student) => {
      const byQuery = filter.query
        ? student.fullName.toLowerCase().includes(filter.query.toLowerCase()) ||
          student.parentContacts.includes(filter.query)
        : true;
      const byClass =
        filter.className === "all" || student.className === filter.className;
      const byStatus =
        filter.status === "all" || student.status === filter.status;
      return byQuery && byClass && byStatus;
    });
  }, [data, filter]);

  const uniqueClasses = useMemo(
    () => Array.from(new Set(data?.map((s) => s.className) ?? [])),
    [data],
  );

  const saveFilter = (newFilter: StudentFilter) => {
    setFilter(newFilter);
    localStorage.setItem("savedStudentFilter", JSON.stringify(newFilter));
  };

  const statusLabels = {
    active: "активный",
    transferred: "переведён",
    expelled: "отчислен",
    archived: "архив",
    all: "все",
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h2">
          Учащиеся
        </Typography>
        <Button variant="contained" component={RouterLink} to="/students/new">
          + Добавить
        </Button>
        <Button
          variant="outlined"
          onClick={() => exportExcel(filtered)}
          disabled={!filtered.length}
        >
          ⬇ Экспорт Excel
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 180px 180px",
          gap: 16,
          mb: 2,
        }}
      >
        <TextField
          label="Поиск ФИО / контакт"
          value={filter.query}
          onChange={(e) => saveFilter({ ...filter, query: e.target.value })}
        />
        <FormControl>
          <InputLabel>Класс</InputLabel>
          <Select
            value={filter.className}
            label="Класс"
            onChange={(e) =>
              saveFilter({ ...filter, className: e.target.value })
            }
          >
            <MenuItem value="all">все</MenuItem>
            {uniqueClasses.map((className) => (
              <MenuItem key={className} value={className}>
                {className}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Статус</InputLabel>
          <Select
            value={filter.status}
            label="Статус"
            onChange={(e) =>
              saveFilter({
                ...filter,
                status: e.target.value as StudentFilter["status"] | "all",
              })
            }
          >
            {Object.entries(statusLabels).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() =>
            promoteMutation.mutate({
              from: "9А",
              to: "10А",
              actor: user?.name ?? "system",
            })
          }
        >
          Перевести 9А → 10А
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        role="region"
        aria-label="Список учащихся"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell>Класс</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Дата поступления</TableCell>
              <TableCell>Родитель</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.className}</TableCell>
                <TableCell>{statusLabels[student.status]}</TableCell>
                <TableCell>{student.enrollmentDate}</TableCell>
                <TableCell>{student.parentContacts}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => navigate(`/students/${student.id}`)}
                  >
                    Просмотр
                  </Button>
                  <Button
                    size="small"
                    onClick={() => navigate(`/students/${student.id}/edit`)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      deleteMutation.mutate({
                        studentId: student.id,
                        actor: user?.name ?? "system",
                      })
                    }
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {!filtered.length && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Ничего не найдено
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
