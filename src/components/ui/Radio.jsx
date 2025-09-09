

function Radio({ name, value, checked, onChange, label, className = '', ...props }) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      <span className="relative flex items-center justify-center w-5 h-5">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-background-dark checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          {...props}
        />
        <span className="pointer-events-none absolute w-3 h-3 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"></span>
      </span>
      <span className="text-gray-700 dark:text-gray-200 text-base font-medium">{label}</span>
    </label>
  );
}

export default Radio;
