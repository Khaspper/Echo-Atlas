import React, { useState } from 'react';

type SearchBarProps = {
  placeholder?: string; // Optional placeholder text
  onSearch: (query: string) => void; // Callback to handle the search input
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (inputValue.trim()) {
      onSearch(inputValue); // Pass the input value to the parent
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded-lg w-80"
      />
      <button
        type="submit"
        className="button w-40 h-12 bg-blue-500 rounded-lg cursor-pointer select-none
          active:translate-y-2 active:[box-shadow:0_0px_0_0_#0267ba,0_0px_0_0_#1b70f841]
          active:border-b-[0px] transition-all duration-150 
          [box-shadow:0_10px_0_0_#0267ba,0_15px_0_0_#1b70f841] border-b-[1px] border-blue-500"
      >
        <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg">
          Search
        </span>
      </button>
    </form>
  );
};

export default SearchBar;
