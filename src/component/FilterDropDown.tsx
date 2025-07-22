// FilterDropdown.tsx
import { useState } from "react";
import { FaFilter, FaUpload } from "react-icons/fa";

interface Props {
  filterType: string;
  setFilterType: (type: string) => void;
}

const FilterDropdown = ({ filterType, setFilterType }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setFilterType(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-100"
      >
        <FaFilter />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-md z-50 border">
          {["All", "Images", "Videos", "Documents", "Spreadsheets"].map(
            (option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 text-gray-900${
                  filterType === option ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {option}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
