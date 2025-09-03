import React from 'react'

function Checkbox({ name, checked, onChange, label, className = '', ...props }) {
  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="form-checkbox text-primary focus:ring-primary border-gray-300 dark:bg-background-dark dark:border-gray-600 p-1"
        {...props}
      />
      <span className="text-text dark:text-text-dark">{label}</span>
    </label>
  );
}

export default Checkbox;
