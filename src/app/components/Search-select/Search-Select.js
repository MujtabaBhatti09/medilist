import { arrayVerification } from '../../config/globalFunctions';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const SearchSelect = forwardRef(({ options, onSelect, sale, createProduct, onNewProductChange, disableInput }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false)

  useEffect(() => {
    setFilteredOptions(
      arrayVerification(options) && options.filter(option =>
        option.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  useImperativeHandle(ref, () => ({
    clearSearchTerm() {
      setSearchTerm('');
    },
    clearSelect() {
      onSelect(null)
    },
    getSearchTerm() {
      return searchTerm;
    }
  }));

  const handleSelect = (option) => {
    if (!sale) {
      const productName = option ? option.productName : searchTerm;
      setSearchTerm(productName);
      onSelect(option || { productName });
    } else {
      if (!option) {
        setSearchTerm("")
      } else {
        setSearchTerm(option.productName)
        onSelect(option)
      }
    }
    setHighlightedIndex(-1);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex(prevIndex =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex(prevIndex =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSelect(filteredOptions[highlightedIndex]);
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
        disabled={disableInput}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
          // if (createProduct) {
          //   onNewProductChange({ newProductName: e.target.value })
          // }
        }}
        onFocus={() => setShowDropdown(true)}
        onMouseOver={() => disableInput && setSearchTerm("Select Customer Type First")}
        onMouseLeave={() => disableInput && setSearchTerm("")}
        placeholder="Search..."
        className={`shadow-md w-full p-4 dark:bg-gray-800 bg-custom-white dark:text-white text-black rounded-md focus:outline-none focus:ring-2 dark:focus:ring-custom-blue-dark focus:ring-custom-blue-light ${disableInput ? "cursor-not-allowed" : ""}`}
      />
      {showDropdown && (
        <ul className="absolute w-full divide-y bg-gray-800 rounded mt-1 max-h-40 overflow-y-auto z-10 dark:shadow-cxl-dark shadow-cxl-light">
          {arrayVerification(options) && filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`p-2 hover:bg-custom-blue-light cursor-pointer ${highlightedIndex === index ? 'bg-custom-blue-light' : ''}`}
              >
                {option.productName}
              </li>
            ))
          ) : !sale && (
            <li
              onClick={() => handleSelect(null)}
              className="p-2 cursor-pointer bg-custom-blue-light"
            >
              {searchTerm}
            </li>
          )}
        </ul>
      )}
    </div>
  );
});

export default SearchSelect;