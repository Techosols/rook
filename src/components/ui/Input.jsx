
function Input({
  type = 'text',
  className = '',
  placeholder = '',
  ...props
}) {
  return (
    <input
      type={type}
      className={`appearance-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white w-full sm:w-80 md:w-96 ${className}`}
      {...props}
      placeholder={placeholder}
    />
  );
}

export default Input
