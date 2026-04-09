import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useStudents } from "../hooks/useStudents";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Avatar } from "../components/ui/Avatar";
import { Badge } from "../components/ui/Badge";

export const ProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { data: students } = useStudents();

  const student = user?.studentId
    ? students?.find((s) => s.id === user.studentId)
    : null;

  const roleEmoji = {
    director: "👔",
    admin: "⚙️",
    secretary: "📋",
    teacher: "📚",
    parent: "👨‍👩‍👧",
    student: "👨‍🎓",
  } as Record<string, string>;

  const roleLabels = {
    director: "Директор",
    admin: "Администратор",
    secretary: "Секретарь",
    teacher: "Учитель",
    parent: "Родитель",
    student: "Ученик",
  } as Record<string, string>;

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
          👤 Профиль
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Управление вашей учётной записью
        </p>
      </motion.div>

      {/* Main Profile Card */}
      <motion.div variants={itemVariants}>
        <Card variant="default">
          <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <Avatar
                name={user?.name ?? "User"}
                size="lg"
                className="w-24 h-24"
              />
              <Badge variant="success" className="text-sm">
                {roleEmoji[user?.role ?? "student"]}{" "}
                {roleLabels[user?.role ?? "student"]}
              </Badge>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user?.email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="rounded-lg bg-lavender-50 dark:bg-gray-700 p-4">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Роль
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {roleLabels[user?.role ?? "student"]}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 dark:bg-gray-700 p-4">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Статус
                  </p>
                  <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    🟢 Активен
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={() => alert("Редактирование профиля — скоро!")}
                >
                  ✏️ Редактировать
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => alert("Параметры безопасности — скоро!")}
                >
                  🔒 Безопасность
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Student Data (if applicable) */}
      {student && (
        <motion.div variants={itemVariants}>
          <Card variant="glass">
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                📚 Мои данные (ученика)
              </h3>
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
                    Класс
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {student.className}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Статус
                  </p>
                  <Badge
                    variant={
                      student.status === "active"
                        ? "success"
                        : student.status === "transferred"
                          ? "warning"
                          : "error"
                    }
                    className="mt-2"
                  >
                    {student.status === "active"
                      ? "Активный"
                      : student.status === "transferred"
                        ? "Переведён"
                        : "Отчислен"}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    Дата поступления
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                    {student.enrollmentDate}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card variant="default">
          <div className="p-6">
            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              ⚡ Быстрые действия
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Смена пароля — скоро!")}
                className="p-4 rounded-xl bg-gradient-to-br from-lavender-100 to-purple-100 dark:from-lavender-900/30 dark:to-purple-900/30 hover:shadow-lg transition-all border border-lavender-200 dark:border-lavender-800"
              >
                <p className="text-2xl mb-2">🔑</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Изменить пароль
                </p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert("Отправка таблицы — скоро!")}
                className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 hover:shadow-lg transition-all border border-blue-200 dark:border-blue-800"
              >
                <p className="text-2xl mb-2">📊</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Экспорт отчёта
                </p>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="p-4 rounded-xl bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 hover:shadow-lg transition-all border border-red-200 dark:border-red-800"
              >
                <p className="text-2xl mb-2">🚪</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Выход
                </p>
              </motion.button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
