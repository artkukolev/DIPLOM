import React, { useState } from "react";
import clsx from "clsx";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  variant?: "default" | "flat";
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, variant = "default", ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={clsx(
              "w-full px-4 py-3 rounded-xl border-2 transition-all",
              "bg-white dark:bg-gray-800",
              "text-gray-900 dark:text-gray-100",
              "appearance-none cursor-pointer",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              variant === "default" && [
                "border-lavender-200 dark:border-gray-700",
                isFocused &&
                  "border-lavender-500 dark:border-lavender-400 ring-2 ring-lavender-100 dark:ring-lavender-900",
                error && "border-red-500 dark:border-red-400",
              ],
              variant === "flat" && [
                "border-0 bg-lavender-100 dark:bg-gray-700",
                isFocused && "bg-lavender-200 dark:bg-gray-600",
              ],
              className,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-600 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        {error && (
          <span className="text-xs text-red-500 dark:text-red-400 mt-1 block">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
