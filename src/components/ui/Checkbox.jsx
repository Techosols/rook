import React from 'react'

function Checkbox({ name, checked, onChange, label, className = '', ...props }) {
  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded accent-primary form-checkbox text-primary focus:ring-primary border-gray-300 dark:bg-background-dark dark:border-gray-600 p-1 peer"
        {...props}
      />
      <span className="text-text dark:text-text-dark peer-checked:text-primary peer-checked:animate-pulse">{label}</span>
    </label>
  );
}

export default Checkbox;
