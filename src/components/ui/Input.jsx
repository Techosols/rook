
function Input({
  type = 'text',
  className = '',
  placeholder = '',
  error,
  value,
  ...props
}) {

  function validateFields(e) {
    if (type === 'number') {
      const value = e.target.value;
      if (value < 0) {
        e.target.value = 0;
      }
    }
  }
  return (
    <div>
      <input
        value={value || ""}
        type={type}
        className={`appearance-none p-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white disabled:bg-gray-200 disabled:cursor-not-allowed dark:disabled:bg-gray-800 dark:disabled:text-gray-200 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        onBlur={validateFields}
        {...(type === 'number' ? { min: 0 } : {})}
        {...props}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input
