import type { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "glass" | "flat";
  hover?: boolean;
  className?: string;
}

export const Card = ({
  className,
  children,
  variant = "default",
  hover = true,
  ...props
}: CardProps) => (
  <motion.div
    className={clsx(
      "rounded-2xl p-6",
      {
        default:
          "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md",
        glass: "glass shadow-lg",
        flat: "bg-lavender-50 dark:bg-gray-800",
      }[variant],
      hover && "hover:shadow-lg transition-shadow",
      className,
    )}
    whileHover={hover ? { y: -2 } : undefined}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    {...(props as any)}
  >
    {children}
  </motion.div>
);
