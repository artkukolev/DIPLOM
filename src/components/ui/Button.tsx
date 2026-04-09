import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-lavender text-white hover:shadow-glow dark:hover:shadow-glow-lg focus:ring-lavender-400",
        secondary:
          "bg-lavender-100 text-lavender-700 hover:bg-lavender-200 dark:bg-lavender-900 dark:text-lavender-100 dark:hover:bg-lavender-800 focus:ring-lavender-400",
        ghost:
          "text-lavender-600 hover:bg-lavender-100 dark:text-lavender-300 dark:hover:bg-gray-800 focus:ring-lavender-400",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <motion.button
    className={clsx(buttonVariants({ variant, size }), className)}
    disabled={isLoading || disabled}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    {...(props as any)}
  >
    {isLoading ? "..." : children}
  </motion.button>
);
