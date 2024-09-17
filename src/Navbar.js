import React, { useState } from 'react';

const Navbar = ({ activeCategory, onCategoryClick, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#" className="text-2xl font-bold text-yellow-400">NewsPulse</a>
        <button
          className="text-white block lg:hidden"
          onClick={handleMenuToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`lg:flex lg:space-x-4 ${isOpen ? 'block' : 'hidden'} lg:static lg:flex-row flex flex-col items-center lg:bg-gray-800 lg:p-0 p-4 absolute top-16 left-0 w-full bg-gray-800 lg:w-auto`}
        >
          {['general', 'business', 'sports', 'technology', 'entertainment'].map((category) => (
            <button
              key={category}
              onClick={() => {
                onCategoryClick(category);
                setIsOpen(false); // Close menu after selecting category on mobile
              }}
              className={`relative px-4 py-2 hover:text-yellow-400 transition-colors text-white ${
                activeCategory === category ? 'text-yellow-400' : ''
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              {activeCategory === category && (
                <span className="absolute bottom-0 left-0 w-full border-b-2 border-red-500"></span>
              )}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(e.target.elements.query.value);
            e.target.reset();
          }}
          className="hidden lg:flex items-center space-x-2"
        >
          <input
            type="text"
            name="query"
            placeholder="Search news"
            className="p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-400 p-2 rounded-md hover:bg-blue-500 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
