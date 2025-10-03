import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

function SearchableSelect({ 
  value, 
  onChange, 
  options = [], 
  className = '', 
  placeholder = 'Search and select an option',
  noOptionsText = 'No options found',
  maxDisplayOptions = 100,
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  useEffect(() => {
    // Convert options to array if it's an object (to match original Select component behavior)
    const optionsArray = Array.isArray(options) ? options : Object.values(options);
    
    if (!searchTerm.trim()) {
      setFilteredOptions(optionsArray.slice(0, maxDisplayOptions));
    } else {
      const filtered = optionsArray.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, maxDisplayOptions);
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options, maxDisplayOptions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleSelect = (selectedValue) => {
    onChange({ target: { value: selectedValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    return value;
  };

  return (
    <div className={`relative w-full sm:w-80 md:w-96 group ${className}`} ref={dropdownRef}>
      {/* Main trigger button */}
      <div
        className={`appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-background-dark dark:border-gray-600 dark:text-white bg-white text-text w-full transition-colors duration-150 cursor-pointer group-hover:border-primary group-hover:shadow-md font-medium ${!value ? 'text-gray-400 dark:text-gray-500' : 'text-text dark:text-white'}`}
        onClick={handleToggle}
        {...props}
      >
        <span className="block truncate">{getDisplayValue()}</span>
      </div>

      {/* Dropdown chevron */}
      <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 transition-colors duration-150 group-hover:text-primary">
        <ChevronDown size={20} className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </span>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:text-white"
                placeholder="Search occupations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              <>
                
                {/* Filtered options */}
                {filteredOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
                      value === option 
                        ? 'bg-primary text-white hover:bg-primary-dark' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                {noOptionsText}
              </div>
            )}
          </div>

          {/* Show count if many options */}
          {Object.values(options).length > maxDisplayOptions && (
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
              Showing {filteredOptions.length} of {Object.values(options).length} options
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;