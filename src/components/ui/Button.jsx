import { Loader2 } from "lucide-react";
function Button({
  children,
  type = "button",
  text,
  onClick,
  className = "",
  disabled = false,
  active = false,
  size = "md", // 'sm', 'md', 'lg'
  loading = false,
  ...props
}) {
  // Size classes
  let sizeClass = "";
  switch (size) {
    case "sm":
      sizeClass = "py-1 px-4 text-sm";
      break;
    case "lg":
      sizeClass = "py-3 px-16 text-lg";
      break;
    case "md":
    default:
      sizeClass = "py-2 px-8 text-base";
      break;
  }

  const activeClass = active
    ? "bg-primary dark:bg-primary-dark text-white"
    : "bg-background dark:bg-background-dark text-secondary dark:text-text-dark hover:bg-primary hover:dark:bg-primary-dark hover:text-white active:bg-primary active:dark:bg-primary-dark";

  const isDisabled = disabled || loading;
  const disabledClass = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={`${sizeClass} border border-primary dark:border-primary-dark rounded-full transition-all duration-300 ${disabledClass} ${activeClass} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block align-middle">
          <Loader2 className="animate-spin h-5 w-5 mx-auto" />
        </span>
      ) : (
        text || children
      )}
    </button>
  );
}

export default Button;
