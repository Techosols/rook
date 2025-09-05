
function Radio({ name, value, checked, onChange, label, className = '', ...props }) {
  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio text-primary focus:ring-primary border-gray-300 dark:bg-background-dark dark:border-gray-600"
        {...props}
      />
      <span className="text-text dark:text-text-dark">{label}</span>
    </label>
  );
}

export default Radio;
