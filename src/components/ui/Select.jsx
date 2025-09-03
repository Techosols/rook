
function Select({ value, onChange, options = [], className = '', ...props }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`appearance-none p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-background-dark dark:border-gray-600 dark:text-white w-full sm:w-80 md:w-96 ${className}`}
            {...props}
        >
            {options.map((opt, idx) =>
                typeof opt === 'object' ? (
                    <option key={opt.value ?? idx} value={opt.value}>{opt.label}</option>
                ) : (
                    <option key={opt} value={opt}>{opt}</option>
                )
            )}
        </select>
    );
}
export default Select
