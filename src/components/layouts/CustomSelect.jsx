import React, { useState, useRef, useMemo, useEffect } from 'react';

const CustomSelect = ({ placeholder, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
    buttonRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current.focus();
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const maxHeight = useMemo(() => {
    const itemHeight = 40;
    const maxVisibleItems = 5;
    return itemHeight * maxVisibleItems;
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="text-gray-500 bg-gray-0 border border-gray-200 rounded-md px-4 py-2.5 text-sm flex items-center justify-between w-full focus:outline-none focus:border-gray-500"
      >
        {value ? value : placeholder}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-full max-h-40 overflow-y-auto z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg" style={{ maxHeight }}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={handleKeyDown}
              className={`text-sm border block w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none ${
                value === option.value ? 'bg-gray-100' : ''
              }`}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
