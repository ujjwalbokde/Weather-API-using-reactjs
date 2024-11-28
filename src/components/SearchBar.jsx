import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ city, setCity, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city name..."
        className="w-full px-4 py-2 pl-10 pr-12 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
      />
      <Search
        className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
      />
      <button
        onClick={onSearch}
        className="absolute right-2 top-1.5 px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;