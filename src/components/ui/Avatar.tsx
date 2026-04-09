import clsx from "clsx";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
  size?: "sm" | "md" | "lg";
}

export const Avatar = ({
  src,
  alt,
  name,
  size = "md",
  className,
  ...props
}: AvatarProps) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-gradient-lavender text-white font-semibold",
        sizes[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full rounded-full object-cover"
          {...props}
        />
      ) : (
        initials
      )}
    </div>
  );
};
