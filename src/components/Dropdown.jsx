import { useState } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ onData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("created_at");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue) => {
    setValue(newValue);
    onData(newValue);
    setIsOpen(false);
  };

  const displayValue = (value) => {
    switch (value) {
      case "created_at":
        return "Recent";
      case "title":
        return "Title";
      case "rating":
        return "Rating";
      default:
        return "Recent";
    }
  };

  return (
    <div className="relative inline-block pb-6 text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}>
          {displayValue(value)}
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg w-fit ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1">
          <div className="py-1" role="none">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSelect("created_at");
              }}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0">
              Recent
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSelect("title");
              }}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1">
              Title
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSelect("rating");
              }}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2">
              Rating
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  onData: PropTypes.func.isRequired,
};

export default Dropdown;
