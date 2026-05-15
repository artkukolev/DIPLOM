import { useMemo } from "react";
import {
  useNotifications,
  useMarkNotificationRead,
} from "../hooks/useStudents";
import { useAuthStore } from "../store/authStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export const NotificationsPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = useNotifications();
  const markRead = useMarkNotificationRead();

  const visibleNotifications = useMemo(() => {
    if (!data) return [];
    return data.filter((notification) => {
      if (notification.recipientRole === "all") return true;
      if (notification.recipientRole === user?.role) return true;
      if (user?.role === "parent" && notification.recipientRole === "parent")
        return true;
      return false;
    });
  }, [data, user?.role]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
          🔔 Уведомления
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Внутренние уведомления по вашей роли и задания для школьной команды.
        </p>
      </div>

      {isLoading ? (
        <div className="text-gray-600">Загрузка уведомлений...</div>
      ) : visibleNotifications.length ? (
        <div className="grid gap-4">
          {visibleNotifications.map((item) => (
            <Card key={item.id} className="p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={item.read ? "default" : "success"}>
                      {item.read ? "Прочитано" : "Новое"}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.subject}
                  </h2>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {item.body}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => markRead.mutate(item.id)}
                    disabled={item.read || markRead.status === "pending"}
                  >
                    {item.read ? "Отмечено" : "Отметить прочитанным"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center text-gray-600 dark:text-gray-400">
          У вас нет новых уведомлений.
        </Card>
      )}
    </div>
  );
};
