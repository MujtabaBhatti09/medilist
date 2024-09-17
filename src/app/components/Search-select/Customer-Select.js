import { arrayVerification } from '@/app/utils/config/globalFunctions';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const CustomerSearchSelect = forwardRef(({ customers, onSelect }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredCustomers(
      arrayVerification(customers) && customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, customers]);

  useImperativeHandle(ref, () => ({
    clearSearchTerm() {
      setSearchTerm('');
    },
    getSearchTerm() {
      return searchTerm;
    }
  }));

  const handleSelect = (customer) => {
    setSearchTerm(customer.customerName);
    onSelect(customer);
    setHighlightedIndex(-1);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex =>
        prevIndex < filteredCustomers.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSelect(filteredCustomers[highlightedIndex]);
      } else {
        handleSelect(null);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef} tabIndex="0" onKeyDown={handleKeyDown}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search customers..."
        className="shadow-md w-full p-4 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light"
      />
      {showDropdown && (
        <ul className="absolute w-full divide-y bg-gray-800 rounded mt-1 max-h-40 overflow-y-auto z-10">
          {arrayVerification(customers) && filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, index) => (
              <li
                key={index}
                onClick={() => handleSelect(customer)}
                className={`p-2 cursor-pointer ${highlightedIndex === index ? 'bg-custom-blue-light' : ''}`}
              >
                {customer.customerName}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No customers found</li>
          )}
        </ul>
      )}
    </div>
  );
});

export default CustomerSearchSelect;
