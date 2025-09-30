
import { ChevronDown } from 'lucide-react';

function Select({ value, onChange, options = [], className = '', placeholder = 'Select an option', ...props }) {


    return (
        <div className={`relative w-full sm:w-80 md:w-96 group ${className}`}>
            <select
                value={value || ""}
                onChange={onChange}
                className={`appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-gray-600 dark:text-white bg-white text-text w-full transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-primary group-hover:shadow-md group-focus-within:border-primary font-medium ${!value ? 'text-gray-400 dark:text-gray-500' : 'text-text dark:text-white'}`}
                {...props}
            >
                <option value="" disabled hidden>{placeholder}</option>
                {/* <option value="" >None</option> */}
                {Object.values(options).map((opt, idx) => (
                    <option key={idx} value={opt} className="font-semibold">
                        {opt}
                    </option>
                ))}
                
            </select>
            {/* Lucide ChevronDown icon */}
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 transition-colors duration-150 group-hover:text-primary group-focus-within:text-primary">
                <ChevronDown size={20} />
            </span>
        </div>
    );
}
export default Select
