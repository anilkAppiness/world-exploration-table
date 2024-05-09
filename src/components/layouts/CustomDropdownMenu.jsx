import React, { useState, useRef, useEffect } from 'react';
import { Settings2 } from "lucide-react";
import { Button } from '../ui/button';

const CustomDropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = () => {
    setIsOpen(false); 
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div onClick={handleToggleMenu}>
        <Button variant="outline" className="ml-auto px-4">
          Filter by<Settings2 className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          onMouseLeave={handleMouseLeave}
          className="absolute top-8 right-0 mt-2 w-48 bg-white rounded-md shadow z-10"
          style={{ minWidth: '10rem' }}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              onSelect: handleLanguageSelect 
            });
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdownMenu;
