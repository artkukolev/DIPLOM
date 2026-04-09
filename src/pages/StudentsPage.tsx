import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  useStudents,
  useDeleteStudent,
  usePromoteClass,
} from "../hooks/useStudents";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
} from "../components/ui/Table";
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

  const statusVariants = {
    active: "success",
    transferred: "warning",
    expelled: "error",
    archived: "default",
  } as Record<string, any>;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-500"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
          📚 Управление учащимися
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Всего учащихся:{" "}
          <span className="font-semibold text-lavender-600 dark:text-lavender-400">
            {filtered.length}
          </span>
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-3 flex-wrap">
        <Button
          variant="primary"
          onClick={() => navigate("/students/new")}
          className="gap-2"
        >
          ➕ Добавить ученика
        </Button>
        <Button
          variant="secondary"
          onClick={() => exportExcel(filtered)}
          disabled={!filtered.length}
          className="gap-2"
        >
          ⬇️ Экспорт Excel
        </Button>
        {user?.role === "director" && (
          <Button
            variant="secondary"
            onClick={() =>
              promoteMutation.mutate({
                from: "9А",
                to: "10А",
                actor: user?.name ?? "system",
              })
            }
            className="gap-2"
          >
            📤 Перевести 9А → 10А
          </Button>
        )}
      </motion.div>

      {/* Filters Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Input
          label="🔍 Поиск"
          placeholder="ФИО или контакт родителя"
          value={filter.query}
          onChange={(e) => saveFilter({ ...filter, query: e.target.value })}
          className="w-full"
        />
        <Select
          label="📋 Класс"
          value={filter.className}
          onChange={(e) => saveFilter({ ...filter, className: e.target.value })}
        >
          <option value="all">Все классы</option>
          {uniqueClasses.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </Select>
        <Select
          label="🏷️ Статус"
          value={filter.status}
          onChange={(e) =>
            saveFilter({
              ...filter,
              status: e.target.value as StudentFilter["status"] | "all",
            })
          }
        >
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Select>
      </motion.div>

      {/* Table Card */}
      <motion.div variants={itemVariants} className="overflow-hidden">
        <Card variant="default">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <Table variant="striped">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-lavender-100 to-purple-100 dark:from-gray-800 dark:to-gray-700">
                    <TableHeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      ФИО
                    </TableHeadCell>
                    <TableHeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      Класс
                    </TableHeadCell>
                    <TableHeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      Статус
                    </TableHeadCell>
                    <TableHeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      Дата поступления
                    </TableHeadCell>
                    <TableHeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      Родитель
                    </TableHeadCell>
                    <TableHeadCell className="text-gray-700 dark:text-gray-300 font-semibold">
                      Действия
                    </TableHeadCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((student, idx) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-lavender-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {student.fullName}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {student.className}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={statusVariants[student.status] || "default"}
                        >
                          {statusLabels[student.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {student.enrollmentDate}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400 text-sm">
                        {student.parentContacts}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate(`/students/${student.id}`)}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-lavender-100 dark:bg-lavender-900 text-lavender-700 dark:text-lavender-200 hover:bg-lavender-200 dark:hover:bg-lavender-800 transition-colors"
                          >
                            Просмотр
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate(`/students/${student.id}/edit`)
                            }
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
                          >
                            Редакт.
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              deleteMutation.mutate({
                                studentId: student.id,
                                actor: user?.name ?? "system",
                              })
                            }
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                          >
                            Удалить
                          </motion.button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                😴 Ничего не найдено
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Попробуй изменить фильтры
              </p>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Stats Footer */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card variant="glass" className="text-center p-4">
          <p className="text-2xl font-bold text-lavender-600 dark:text-lavender-400">
            {filtered.length}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Найдено учащихся
          </p>
        </Card>
        <Card variant="glass" className="text-center p-4">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {filtered.filter((s) => s.status === "active").length}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Активных
          </p>
        </Card>
        <Card variant="glass" className="text-center p-4">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {filtered.filter((s) => s.status === "transferred").length}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Переведённых
          </p>
        </Card>
        <Card variant="glass" className="text-center p-4">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {filtered.filter((s) => s.status === "expelled").length}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Отчисленных
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};
