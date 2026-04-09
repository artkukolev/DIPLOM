import clsx from "clsx";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}

export const Badge = ({
  className,
  children,
  variant = "default",
  ...props
}: BadgeProps) => (
  <div
    className={clsx(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      {
        default:
          "bg-lavender-100 text-lavender-700 dark:bg-lavender-900 dark:text-lavender-100",
        success:
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100",
        warning:
          "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100",
        error: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100",
      }[variant],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
