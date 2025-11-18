function Input({
  type = 'text',
  className = '',
  placeholder = '',
  error,
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

  function handleNumberInput(e) {
    let value = e.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    e.target.value = value;
    if (props.onInput) props.onInput(e);
  }
  return (
    <div className="w-full">
      <input
        type={type}
        className={`w-full appearance-none p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white disabled:bg-gray-200 disabled:cursor-not-allowed dark:disabled:bg-gray-800 dark:disabled:text-gray-200 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        onBlur={validateFields}
        {...(type === 'number' ? {
          min: 0,
          inputMode: 'decimal',
          pattern: '[0-9]*',
          onInput: handleNumberInput
        } : {})}
        {...props}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input
