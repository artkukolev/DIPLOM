import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => (
  <div className="w-full">
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {label}
      </label>
    )}
    <input
      className={clsx(
        "w-full px-4 py-2.5 rounded-lg border transition-smooth",
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
        "border-gray-300 dark:border-gray-600",
        "focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        error && "border-red-500 focus:ring-red-400",
        className,
      )}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);
