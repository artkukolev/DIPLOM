import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStudents } from "../hooks/useStudents";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";

export const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useStudents();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "info" | "notes" | "documents" | "parents" | "history"
  >("info");

  const student = useMemo(() => data?.find((s) => s.id === id), [data, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-500"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-lg text-gray-500 dark:text-gray-400">
          😞 Мы не нашли этого ученика
        </p>
        <Button onClick={() => navigate("/students")} className="mt-4">
          ← Вернуться к списку
        </Button>
      </motion.div>
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

  const statusLabels = {
    active: "Активный",
    transferred: "Переведён",
    expelled: "Отчислен",
    archived: "Архив",
  } as Record<string, string>;

  const tabs = [
    { id: "info", label: "📋 Основные данные", icon: "📋" },
    { id: "notes", label: "📝 Личные записи", icon: "📝" },
    { id: "documents", label: "📄 Документы", icon: "📄" },
    { id: "parents", label: "👥 Родители", icon: "👥" },
    { id: "history", label: "📅 История", icon: "📅" },
  ] as Array<{ id: typeof activeTab; label: string; icon: string }>;

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
      >
        <div className="flex gap-4 items-center flex-1">
          <Avatar name={student.fullName} size="lg" />
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              {student.fullName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">ID: {student.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate("/students")}>
            ← Назад
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/students/${student.id}/edit`)}
          >
            ✏️ Редактировать
          </Button>
        </div>
      </motion.div>

      {/* Quick Info Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card variant="glass" className="p-4 text-center">
          <p className="text-2xl mb-2">📚</p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
            Класс
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {student.className}
          </p>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <p className="text-2xl mb-2">
            {student.status === "active"
              ? "🟢"
              : student.status === "transferred"
                ? "🟡"
                : "🔴"}
          </p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
            Статус
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {statusLabels[student.status]}
          </p>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <p className="text-2xl mb-2">🎂</p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
            Дата рождения
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {student.birthDate}
          </p>
        </Card>
        <Card variant="glass" className="p-4 text-center">
          <p className="text-2xl mb-2">📅</p>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">
            Поступление
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {student.enrollmentDate}
          </p>
        </Card>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div variants={itemVariants}>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-lavender-500 to-purple-500 text-white shadow-lg"
                  : "bg-lavender-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-lavender-200 dark:hover:bg-gray-600"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        variants={itemVariants}
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === "info" && (
          <Card variant="default">
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    ФИО
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {student.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Серия/номер свидетельства о рождении
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    ХХХX-123456
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Контакты родителей
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {student.parentContacts}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Медицинские заметки
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {student.medicalNotes}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Льготы
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {student.benefits}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "notes" && (
          <Card variant="default">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Личные записи
                </h3>
                <Button size="sm" variant="primary">
                  ➕ Добавить запись
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-lavender-50 dark:bg-gray-700 border-l-4 border-lavender-500">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Открытое совещание родителей
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    15 апреля 2026 — отличное поведение
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-gray-700 border-l-4 border-amber-500">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Рекомендация к олимпиаде
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    10 апреля 2026 — математика (учитель Иванов)
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "documents" && (
          <Card variant="default">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Документы
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-center gap-3">
                    <p className="text-2xl">📄</p>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Справка о посещаемости
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        5 МБ • PDF
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">
                    ⬇️ Скачать
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "parents" && (
          <Card variant="default">
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-lg border border-lavender-200 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white">
                  👨 Отец: Иван Петров
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  +7 (999) 123-45-67
                </p>
              </div>
              <div className="p-4 rounded-lg border border-lavender-200 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white">
                  👩 Мать: Мария Петрова
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  +7 (999) 123-45-68
                </p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === "history" && (
          <Card variant="default">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                История изменений
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  📅 <span className="font-medium">15 апреля 2026</span> —
                  Запись о поведении ({" "}
                  <span className="text-lavender-600 dark:text-lavender-400">
                    Иванов И.И.
                  </span>
                  )
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  📅 <span className="font-medium">10 апреля 2026</span> —
                  Рекомендация к олимпиаде (
                  <span className="text-lavender-600 dark:text-lavender-400">
                    Сидоров П.П.
                  </span>
                  )
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  📅 <span className="font-medium">01 апреля 2026</span> —
                  Зачисление в школу (
                  <span className="text-lavender-600 dark:text-lavender-400">
                    система
                  </span>
                  )
                </p>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
};
