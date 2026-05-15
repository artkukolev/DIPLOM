import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api/mockDb";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useTheme } from "../context/ThemeContext";

const DEMO_ROLES = [
  { email: "admin@example.com", label: "Администратор", icon: "⚙️" },
  { email: "director@example.com", label: "Директор", icon: "👔" },
  { email: "tutor@example.com", label: "Тьютор", icon: "🧑‍🏫" },
  {
    email: "headteacher@example.com",
    label: "Классный руководитель",
    icon: "🏫",
  },
  { email: "teacher@example.com", label: "Преподаватель", icon: "📚" },
  { email: "secretary@example.com", label: "Секретарь", icon: "📋" },
  { email: "parent@example.com", label: "Родитель", icon: "👨‍👩‍👧" },
  { email: "student@example.com", label: "Ученик", icon: "👨‍🎓" },
];

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"roles" | "login">("roles");
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const { isDark } = useTheme();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await api.login(email);
      login(user);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setLoading(true);
    setError("");
    try {
      const user = await api.login(demoEmail);
      login(user);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Ошибка входа");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 ${
        isDark
          ? "bg-gradient-to-br from-gray-950 via-gray-900 to-lavender-900"
          : "bg-gradient-to-br from-lavender-50 via-white to-lavender-100"
      }`}
    >
      {/* Decoration blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lavender-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lavender-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            Школьный архив
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Система управления личными делами учащихся
          </p>
        </motion.div>

        {step === "roles" ? (
          <>
            {/* Role Selection */}
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Выберите роль для демонстрации
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {DEMO_ROLES.map((role, idx) => (
                  <motion.button
                    key={role.email}
                    className="group relative"
                    onClick={() => handleDemoLogin(role.email)}
                    disabled={loading}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card
                      className="h-full text-center cursor-pointer group-hover:shadow-xl group-disabled:opacity-50 group-disabled:cursor-not-allowed"
                      variant="flat"
                      hover={false}
                    >
                      <div className="text-4xl mb-3">{role.icon}</div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-lavender-600 dark:group-hover:text-lavender-300 transition-colors">
                        {role.label}
                      </p>
                    </Card>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Or Manual Login */}
            <motion.div className="text-center mt-8" variants={itemVariants}>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                или
              </p>
              <Button
                onClick={() => setStep("login")}
                variant="secondary"
                size="md"
                className="w-full"
              >
                Вход с email
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            {/* Manual Login Form */}
            <motion.div
              key="login-form"
              variants={itemVariants}
              className="glass shadow-2xl border-0"
            >
              <Card variant="glass" className="backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                    Вход
                  </h2>

                  <Input
                    type="email"
                    label="Email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error ? "Ошибка входа" : undefined}
                    autoFocus
                    required
                  />

                  {error && (
                    <motion.p
                      className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={loading}
                    disabled={loading}
                  >
                    {loading ? "Загрузка..." : "Войти"}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      setStep("roles");
                      setEmail("");
                      setError("");
                    }}
                    variant="ghost"
                    size="md"
                    className="w-full"
                    disabled={loading}
                  >
                    Назад к ролям
                  </Button>
                </form>
              </Card>
            </motion.div>
          </>
        )}

        {/* Footer */}
        <motion.div
          className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400"
          variants={itemVariants}
        >
          <p>Дипломный проект — Система управления школьными архивами</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
